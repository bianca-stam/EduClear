import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import { TemasService } from '@core/services/temas.service';
import { TareasService } from '@core/services/tareas.service';
import { AuthService } from '@core/services/auth.service';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { UsuarioService } from '@core/services/usuario.service';
import { DbEntregaTarea } from '@core/models/db-models';
import { AlertCircle, ArrowRight, ClipboardPen, FileText, FileUp, Loader, LucideAngularModule, ExternalLink } from 'lucide-angular';
import { FileUploader } from '@app/components/file-uploader';

@Component({
  selector: 'app-tareas',
  imports: [LucideAngularModule, FileUploader],
  templateUrl: './tareas.html',
  styleUrl: './tareas.scss'
})
export class Tareas implements OnInit {

  private temaService = inject(TemasService);
  private tareasService = inject(TareasService);
  private authService = inject(AuthService);
  private asignaturasService = inject(AsignaturasService);
  private usuarioService = inject(UsuarioService);
  
  arrowRight = ArrowRight;
  clipboardPen = ClipboardPen;
  fileUp = FileUp;
  fileText = FileText;
  alertCircle = AlertCircle;
  loader = Loader;
  externalLink = ExternalLink;

  tarea = computed(() => this.temaService.tareaSeleccionada());
  titulo = computed(() => this.tarea()?.titulo);
  descripcion = computed(() => this.tarea()?.descripcion);

  isLoading = signal(true);
  errorMsg = signal<string | null>(null);
  mostrarUploader = signal(false);
  isSubmitting = signal(false);

  entrega = signal<DbEntregaTarea | undefined>(undefined);
  archivoEntrega = signal<any | undefined>(undefined);

  esProfesor = computed(() => {
    const rol = this.authService.usuarioActual()?.rol;
    return rol === 'profesor' || rol === 'admin';
  });

  estadoAlumnos = signal<{ alumnoNombre: string; entregado: boolean; calificacion: number | null | string }[]>([]);

  toggleUploader() {
    this.mostrarUploader.set(!this.mostrarUploader());
  }

  async enviarEntrega(uploader: any) {
    const files = uploader.uploadedFiles;
    if (!files || files.length === 0) {
      return;
    }

    const tareaId = this.tarea()?.id_tarea;
    const usuarioId = this.authService.usuarioActual()?.id;

    if (!tareaId || !usuarioId) return;

    this.isSubmitting.set(true);

    try {
      let entregaActual = this.entrega();

      if (!entregaActual) {
        entregaActual = await firstValueFrom(
          this.tareasService.crearEntrega({
            tareaId: tareaId,
            alumnoId: usuarioId,
            estadoEntrega: 'enviado'
          })
        );
      } else {
        entregaActual = await firstValueFrom(
          this.tareasService.actualizarEntrega(entregaActual.id_entrega_tarea, {
            tareaId: tareaId,
            alumnoId: usuarioId,
            estadoEntrega: 'enviado'
          })
        );
      }

      this.entrega.set(entregaActual);

      const archivoActual = this.archivoEntrega();
      
      for (const file of files) {
        if (!file.dataURL) continue;
        
        const base64Data = file.dataURL.split(',')[1] || file.dataURL;
        
        if (archivoActual && archivoActual.id_archivo_tarea) {
          // Actualizamos el archivo existente
          await firstValueFrom(
            this.tareasService.actualizarArchivoEntrega(archivoActual.id_archivo_tarea, {
              entregaId: entregaActual.id_entrega_tarea,
              nombreArchivo: file.name,
              tipoMime: file.type,
              pesoBytes: file.size,
              archivoBlob: base64Data
            })
          );
        } else {
          // Creamos uno nuevo
          await firstValueFrom(
            this.tareasService.subirArchivoEntrega({
              entregaId: entregaActual.id_entrega_tarea,
              nombreArchivo: file.name,
              tipoMime: file.type,
              pesoBytes: file.size,
              archivoBlob: base64Data
            })
          );
        }
      }

      this.mostrarUploader.set(false);
      uploader.uploadedFiles = [];
      
      // Reload delivery data to show the new file
      this.cargarDatosEntrega();
      
    } catch (error) {
      console.error('Error enviando entrega:', error);
      alert('Hubo un error al enviar la entrega.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  ngOnInit() {
    this.cargarDatosEntrega();
  }

  cargarDatosEntrega() {
    const tareaId = this.tarea()?.id_tarea;
    const usuarioId = this.authService.usuarioActual()?.id;

    if (!tareaId || !usuarioId) {
      this.isLoading.set(false);
      return;
    }

    if (this.esProfesor()) {
      this.isLoading.set(true);
      this.tareasService.getEstadoAlumnosTarea(tareaId).subscribe({
        next: (estadoAlumnosBackend) => {
          const estado = estadoAlumnosBackend.map(e => ({
            alumnoNombre: e.alumnoNombre || 'Desconocido',
            entregado: e.estadoEntrega === 'enviado',
            calificacion: e.calificacion ?? null
          }));
          this.estadoAlumnos.set(estado);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.errorMsg.set('Error al cargar la información de los alumnos');
          this.isLoading.set(false);
        }
      });
    } else {
      this.isLoading.set(true);
      this.tareasService.getEntrega(tareaId, usuarioId).subscribe({
        next: (entrega) => {
          this.entrega.set(entrega);
          if (entrega) {
            this.tareasService.getArchivosEntrega(entrega.id_entrega_tarea).subscribe({
              next: (archivos) => {
                if (archivos && archivos.length > 0) {
                  this.archivoEntrega.set(archivos[0]);
                }
                this.isLoading.set(false);
              },
              error: (err) => {
                console.error('Error cargando archivos', err);
                this.isLoading.set(false);
              }
            });
          } else {
            this.isLoading.set(false);
          }
        },
        error: (err) => {
          console.error(err);
          this.errorMsg.set('Error al cargar la información de la entrega');
          this.isLoading.set(false);
        }
      });
    }
  }

  estadoTexto = computed(() => {
    if (this.archivoEntrega()) return 'Entregado';
    return 'No entregado';
  });

  calificacionTexto = computed(() => {
    const e = this.entrega();
    if (e && e.calificacion !== null && e.calificacion !== undefined) {
      return e.calificacion.toString();
    }
    return 'No Calificado';
  });

  calificacionValor = computed(() => {
    const e = this.entrega();
    return (e && e.calificacion !== null && e.calificacion !== undefined) ? Number(e.calificacion) : null;
  });

  estaCalificada = computed(() => {
    return this.calificacionValor() !== null;
  });

  textoBotonEntrega = computed(() => {
    if (this.mostrarUploader()) return 'Cancelar';
    if (this.archivoEntrega()) {
      return 'Editar entrega';
    }
    return 'Agregar entrega';
  });

  estaVencida = computed(() => {
    return this.tiempoRestante() === 'Expirado';
  });

  tiempoRestante = computed(() => {
    const t = this.tarea();
    if (!t?.fecha_cierre) return 'No definido';
    
    const fechaCierre = new Date(t.fecha_cierre);
    const ahora = new Date();
    
    const diferenciaMs = fechaCierre.getTime() - ahora.getTime();
    if (diferenciaMs <= 0) return 'Expirado';

    const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenciaMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (dias > 0) {
      return `${dias}d ${horas}h`;
    }
    return `${horas}h`;
  });

  formatDate(dateStr: string | undefined): string {
    if (!dateStr) return 'No definida';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  fechaAperturaFormat = computed(() => this.formatDate(this.tarea()?.fecha_apertura));
  fechaCierreFormat = computed(() => this.formatDate(this.tarea()?.fecha_cierre));

  abrirArchivo() {
    const archivo = this.archivoEntrega();
    if (archivo && archivo.archivo_blob) {
      const base64Data = archivo.archivo_blob;
      const mimeType = archivo.tipo_mime || 'application/octet-stream';
      
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    }
  }

}
