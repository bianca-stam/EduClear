import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DbArchivoContenido, DbEntregaTarea, DbExamen, DbTarea } from '@core/models/db-models';
import { TemasService } from '@core/services/temas.service';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { AuthService } from '@core/services/auth.service';
import { forkJoin } from 'rxjs';
import { ArrowRight, ClipboardPen, FileUp, FileText, LucideAngularModule, AlertCircle, Loader, Pencil, Trash2 } from "lucide-angular";
import { ConfirmModal } from '@app/components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-tema',
  imports: [LucideAngularModule, DatePipe, ConfirmModal],
  templateUrl: './tema.html',
  styleUrl: './tema.scss'
})
export class Tema implements OnInit {

  // ── Iconos ───────────────────────────────────────────────────────────────
  arrowRight = ArrowRight;
  clipboardPen = ClipboardPen;
  fileUp = FileUp;
  fileText = FileText;
  alertCircle = AlertCircle;
  loader = Loader;
  pencil = Pencil;
  trash = Trash2;

  // ── Inyecciones ──────────────────────────────────────────────────────────
  private readonly temaService = inject(TemasService);
  private readonly asignaturasService = inject(AsignaturasService);
  private readonly authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // ── Computed ──────────────────────────────────────────────────────────────
  titulo = computed(() => this.temaService.temaSeleccionado()?.titulo);
  descripcion = computed(() => this.temaService.temaSeleccionado()?.descripcion);

  // ── Estado ───────────────────────────────────────────────────────────────
  entregas = signal<DbTarea[]>([]);
  examenes = signal<DbExamen[]>([]);
  materiales = signal<DbArchivoContenido[]>([]);

  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  // ── Lifecycle ────────────────────────────────────────────────────────────
  ngOnInit(){
    const idTema = this.temaService.temaSeleccionado()!.id_tema;
    
    forkJoin({
      archivos: this.temaService.getArchivosByTema(idTema),
      examenes: this.temaService.getExamenesByTema(idTema),
      entregas: this.temaService.getTareasByTema(idTema)
    }).subscribe({
      next: ({ archivos, examenes, entregas }) => {
        this.materiales.set(archivos);
        this.examenes.set(examenes);
        this.entregas.set(entregas);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar datos del tema:', err);
        this.errorMsg.set('No se pudieron cargar los recursos del tema.');
        this.isLoading.set(false);
      }
    });
  }

  // ── Navegación ────────────────────────────────────────────────────────────
  verTarea(tarea: DbTarea) {
    const slug = tarea.titulo.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, '-');
    this.temaService.tareaSeleccionada.set(tarea);
    this.router.navigate(['tarea', slug], { relativeTo: this.route });
  }

  verExamen(examen: DbExamen) {
    const slug = examen.titulo.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, '-');
    this.temaService.examenSeleccionado.set(examen);
    this.router.navigate(['examen', slug], { relativeTo: this.route });
  }

  // ── Gestión de Archivos ──────────────────────────────────────────────────
  abrirMaterial(material: DbArchivoContenido): void {
    this.temaService.getArchivoById(material.id_contenido).subscribe((res) => {
      if (!res.archivoBlob) {
        console.error('El archivo no tiene contenido binario');
        return;
      }

      // Convertir Base64 a Blob
      const byteCharacters = atob(res.archivoBlob);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: res.tipoMime || 'application/octet-stream' });

      // Abrir el Blob
      const url = URL.createObjectURL(blob);
      const ventana = window.open(url, '_blank');

      if (ventana) {
        // Liberar URL después de un tiempo (load no siempre funciona con Blobs en todos los navegadores)
        setTimeout(() => URL.revokeObjectURL(url), 100);
      } else {
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = res.nombreArchivo || material.nombre_archivo;
        enlace.click();
        URL.revokeObjectURL(url);
      }
    });
  }

  puedeEditarTema(): boolean {
    const usuario = this.authService.usuarioActual();
    const asig = this.asignaturasService.asignaturaSeleccionada();
    if (!usuario || !asig) return false;
    if (usuario.rol === 'admin') return true;
    return usuario.rol === 'profesor' && asig.profesor_id === usuario.id;
  }

  // ── Gestión de Profesores/Admin ──────────────────────────────────────────
  editarTema() {
    const idTema = this.temaService.temaSeleccionado()?.id_tema;
    if (idTema) {
      this.router.navigate(['/edicion/tema', idTema]);
    }
  }

  editarExamen(event: Event, examen: DbExamen) {
    event.stopPropagation();
    this.router.navigate(['/edicion/examen', examen.id_examen]);
  }

  editarTarea(event: Event, tarea: DbTarea) {
    event.stopPropagation();
    this.router.navigate(['/edicion/tarea', tarea.id_tarea]);
  }

  editarMaterial(event: Event, material: DbArchivoContenido) {
    event.stopPropagation();
    // Material is edited on the tema page itself via FileUploader
    const idTema = this.temaService.temaSeleccionado()?.id_tema;
    if (idTema) {
      this.router.navigate(['/edicion/tema', idTema]);
    }
  }

  // ── Modal de Confirmación ────────────────────────────────────────────────
  
  mostrarModalConfirmacion = signal(false);
  itemAEliminar = signal<{ id: number, tipo: 'tarea' | 'examen' | 'archivo', nombre?: string } | null>(null);

  get modalMessage(): string {
    const tipo = this.itemAEliminar()?.tipo;
    if (tipo === 'archivo') return '¿Seguro que quieres eliminar el archivo';
    if (tipo === 'tarea') return '¿Seguro que quieres eliminar la tarea';
    if (tipo === 'examen') return '¿Seguro que quieres eliminar el examen';
    return '¿Estás seguro de que deseas eliminar este elemento';
  }

  abrirConfirmacionEliminar(event: Event, id: number, tipo: 'tarea' | 'examen' | 'archivo', nombre?: string) {
    event.stopPropagation();
    this.itemAEliminar.set({ id, tipo, nombre });
    this.mostrarModalConfirmacion.set(true);
  }

  cerrarConfirmacion() {
    this.mostrarModalConfirmacion.set(false);
    this.itemAEliminar.set(null);
  }

  confirmarEliminacion() {
    const item = this.itemAEliminar();
    if (!item) return;

    if (item.tipo === 'tarea') {
      this.temaService.eliminarTarea(item.id).subscribe({
        next: () => {
          this.entregas.update(list => list.filter(t => t.id_tarea !== item.id));
          this.cerrarConfirmacion();
        },
        error: () => {
          alert('No se pudo eliminar la tarea.');
          this.cerrarConfirmacion();
        }
      });
    } else if (item.tipo === 'examen') {
      this.temaService.eliminarExamen(item.id).subscribe({
        next: () => {
          this.examenes.update(list => list.filter(e => e.id_examen !== item.id));
          this.cerrarConfirmacion();
        },
        error: () => {
          alert('No se pudo eliminar el examen.');
          this.cerrarConfirmacion();
        }
      });
    } else if (item.tipo === 'archivo') {
      this.temaService.eliminarArchivo(item.id).subscribe({
        next: () => {
          this.materiales.update(list => list.filter(a => a.id_contenido !== item.id));
          this.cerrarConfirmacion();
        },
        error: () => {
          alert('No se pudo eliminar el archivo.');
          this.cerrarConfirmacion();
        }
      });
    }
  }
}
