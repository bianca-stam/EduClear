import { Component, computed, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { TemasService } from '@core/services/temas.service';
import { ExamenesService } from '@core/services/examenes.service';
import { AuthService } from '@core/services/auth.service';
import { DbIntentoExamen, DbPregunta, OpcionRespuesta } from '@core/models/db-models';
import { firstValueFrom } from 'rxjs';
import { AlertCircle, ArrowRight, ClipboardPen, FileText, FileUp, Loader, LucideAngularModule, ChevronLeft, ChevronRight, Check } from 'lucide-angular';

@Component({
  selector: 'app-examenes',
  imports: [LucideAngularModule],
  templateUrl: './examenes.html',
  styleUrl: './examenes.scss'
})
export class Examenes implements OnInit, OnDestroy {

  private temaService = inject(TemasService);
  private examenesService = inject(ExamenesService);
  private authService = inject(AuthService);
  
  arrowRight = ArrowRight;
  clipboardPen = ClipboardPen;
  fileUp = FileUp;
  fileText = FileText;
  alertCircle = AlertCircle;
  loader = Loader;
  chevronLeft = ChevronLeft;
  chevronRight = ChevronRight;
  check = Check;

  examen = computed(() => this.temaService.examenSeleccionado());
  titulo = computed(() => this.examen()?.titulo);
  descripcion = computed(() => this.examen()?.descripcion);

  isLoading = signal(false);
  errorMsg = signal<string | null>(null);

  formatDate(dateStr: string | undefined): string {
    if (!dateStr) return 'No definida';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  fechaAperturaFormat = computed(() => this.formatDate(this.examen()?.fecha_apertura));
  fechaCierreFormat = computed(() => this.formatDate(this.examen()?.fecha_cierre));

  intento = signal<DbIntentoExamen | undefined>(undefined);

  calificacionTexto = computed(() => {
    const i = this.intento();
    if (i && i.calificacion_final !== null && i.calificacion_final !== undefined) {
      return i.calificacion_final.toString();
    }
    return 'No Calificado';
  });

  calificacionValor = computed(() => {
    const i = this.intento();
    return (i && i.calificacion_final !== null && i.calificacion_final !== undefined) ? Number(i.calificacion_final) : null;
  });

  estaVencida = computed(() => {
    const fechaCierreStr = this.examen()?.fecha_cierre;
    if (!fechaCierreStr) return false;
    const fechaCierre = new Date(fechaCierreStr).getTime();
    const ahora = new Date().getTime();
    return (fechaCierre - ahora) <= 0;
  });

  // Estado del Examen en curso
  modoExamen = signal(false);
  preguntas = signal<DbPregunta[]>([]);
  respuestas = signal<Map<number, string>>(new Map());
  preguntaActualIndex = signal(0);
  tiempoRestanteExamen = signal<string>('00:00:00');
  
  private timerInterval: any;
  isSubmitting = signal(false);
  mostrarConfirmacion = signal(false);

  ngOnInit() {
    this.cargarIntentoPrevio();
  }

  ngOnDestroy() {
    this.detenerTemporizador();
  }

  cargarIntentoPrevio() {
    const examenId = this.examen()?.id_examen;
    const usuarioId = this.authService.usuarioActual()?.id;

    if (examenId && usuarioId) {
      this.isLoading.set(true);
      this.examenesService.getIntento(examenId, usuarioId).subscribe({
        next: (intento) => {
          this.intento.set(intento);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error loading intento:', err);
          this.errorMsg.set('Error al cargar la información del intento');
          this.isLoading.set(false);
        }
      });
    }
  }

  async empezarIntento() {
    const examenId = this.examen()?.id_examen;
    if (!examenId) return;

    this.isLoading.set(true);
    try {
      const pregs = await firstValueFrom(this.examenesService.getPreguntasByExamen(examenId));
      this.preguntas.set(pregs);
      this.respuestas.set(new Map());
      this.preguntaActualIndex.set(0);
      this.modoExamen.set(true);
      this.iniciarTemporizador();
    } catch (err) {
      console.error('Error cargando preguntas', err);
      alert('Error al iniciar el examen');
    } finally {
      this.isLoading.set(false);
    }
  }

  iniciarTemporizador() {
    this.actualizarReloj(); // Llama inmediatamente
    this.timerInterval = setInterval(() => {
      this.actualizarReloj();
    }, 1000);
  }

  detenerTemporizador() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  actualizarReloj() {
    const fechaCierreStr = this.examen()?.fecha_cierre;
    if (!fechaCierreStr) {
      this.tiempoRestanteExamen.set('Sin límite');
      return;
    }

    const fechaCierre = new Date(fechaCierreStr).getTime();
    const ahora = new Date().getTime();
    const diferenciaMs = fechaCierre - ahora;

    if (diferenciaMs <= 0) {
      this.tiempoRestanteExamen.set('00:00:00');
      this.detenerTemporizador();
      alert('El tiempo ha terminado. El examen se enviará automáticamente.');
      this.terminarIntento();
      return;
    }

    const horas = Math.floor(diferenciaMs / (1000 * 60 * 60));
    const minutos = Math.floor((diferenciaMs % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenciaMs % (1000 * 60)) / 1000);

    const format = (n: number) => n.toString().padStart(2, '0');
    this.tiempoRestanteExamen.set(`${format(horas)}:${format(minutos)}:${format(segundos)}`);
  }

  // Navegación
  preguntaActual = computed(() => {
    return this.preguntas()[this.preguntaActualIndex()];
  });

  seleccionarOpcion(opcion: string) {
    const pregs = this.preguntas();
    const idx = this.preguntaActualIndex();
    if (idx >= 0 && idx < pregs.length) {
      const q = pregs[idx];
      const nuevasResp = new Map(this.respuestas());
      if (nuevasResp.get(q.id_pregunta) === opcion) {
        nuevasResp.delete(q.id_pregunta);
      } else {
        nuevasResp.set(q.id_pregunta, opcion);
      }
      this.respuestas.set(nuevasResp);
    }
  }

  siguientePregunta() {
    if (this.preguntaActualIndex() < this.preguntas().length - 1) {
      this.preguntaActualIndex.update(i => i + 1);
    }
  }

  preguntaAnterior() {
    if (this.preguntaActualIndex() > 0) {
      this.preguntaActualIndex.update(i => i - 1);
    }
  }

  irAPregunta(index: number) {
    if (index >= 0 && index < this.preguntas().length) {
      this.preguntaActualIndex.set(index);
    }
  }

  abrirConfirmacion() {
    this.mostrarConfirmacion.set(true);
  }

  cerrarConfirmacion() {
    this.mostrarConfirmacion.set(false);
  }

  async terminarIntento() {
    const examenId = this.examen()?.id_examen;
    const usuarioId = this.authService.usuarioActual()?.id;
    if (!examenId || !usuarioId) return;

    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.mostrarConfirmacion.set(false);
    this.detenerTemporizador();

    try {
      // 1. Calcular calificación
      const pregs = this.preguntas();
      const resp = this.respuestas();
      let correctas = 0;

      pregs.forEach(p => {
        const marcada = resp.get(p.id_pregunta);
        if (marcada === p.respuesta_correcta) {
          correctas++;
        }
      });

      const calificacionFinal = pregs.length > 0 ? (correctas / pregs.length) * 10 : 0;
      const ahoraIso = new Date().toISOString().slice(0, 19); // Remove Z and ms to avoid parsing issues if any

      // 2. Crear Intento
      const nuevoIntentoReq = {
        examenId: examenId,
        alumnoId: usuarioId,
        fechaInicio: ahoraIso, // Para simplificar, fecha de inicio y envío son el mismo instante al finalizar
        fechaEnvio: ahoraIso,
        calificacionFinal: calificacionFinal,
        estado: 'calificado'
      };

      const intentoDb = await firstValueFrom(this.examenesService.crearIntento(nuevoIntentoReq));

      // 3. Crear Respuestas (opcional esperar todas, o disparar concurrentemente)
      const promesasRespuestas = [];
      for (const p of pregs) {
        const marcada = resp.get(p.id_pregunta);
        if (marcada) {
          promesasRespuestas.push(firstValueFrom(this.examenesService.crearRespuesta({
            intentoId: intentoDb.id, // O intentoDb.id_intento dependiendo de lo que devuelva el backend
            preguntaId: p.id_pregunta,
            opcionSeleccionada: marcada
          })));
        }
      }

      await Promise.all(promesasRespuestas);

      // 4. Salir de modo examen y recargar intento
      this.modoExamen.set(false);
      this.cargarIntentoPrevio();

    } catch (err) {
      console.error('Error terminando intento', err);
      alert('Hubo un error al guardar tu examen. Por favor revisa tu conexión.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

}
