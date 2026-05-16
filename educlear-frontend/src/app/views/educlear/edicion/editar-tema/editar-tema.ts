import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { TemasService } from '@core/services/temas.service';
import { AuthService } from '@core/services/auth.service';
import { DbArchivoContenido, DbTema, DbTarea, DbExamen } from '@core/models/db-models';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { PageTitle } from '@/app/components/page-title';
import {
  LucideAngularModule,
  ArrowLeft, Save, Plus, Pencil, Trash2,
  Loader, AlertCircle, CheckCircle, BookOpen, FileText
} from 'lucide-angular';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FileUploader, UploadedFile } from '@app/components/file-uploader';
import { ConfirmModal } from '@app/components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-editar-tema',
  imports: [ReactiveFormsModule, LucideAngularModule, CommonModule, DatePipe, PageTitle, FileUploader, ConfirmModal],
  templateUrl: './editar-tema.html',
  styleUrl: './editar-tema.scss'
})
export class EditarTema implements OnInit {

  // ── Iconos ───────────────────────────────────────────────────────────────
  arrowLeft     = ArrowLeft;
  save          = Save;
  plus          = Plus;
  pencil        = Pencil;
  trash         = Trash2;
  loader        = Loader;
  alertCircle   = AlertCircle;
  checkCircle   = CheckCircle;
  bookOpen      = BookOpen;
  fileText      = FileText;

  // ── Inyecciones ──────────────────────────────────────────────────────────
  private route        = inject(ActivatedRoute);
  private router       = inject(Router);
  private fb           = inject(FormBuilder);
  private temasService       = inject(TemasService);
  private asignaturasService = inject(AsignaturasService);
  private authService        = inject(AuthService);
  private location           = inject(Location);

  // ── Estado ───────────────────────────────────────────────────────────────
  modoEdicion    = signal(false);
  temaId         = signal<number | null>(null);
  asignaturaId   = signal<number | null>(null);

  isLoadingData  = signal(false);
  isGuardando    = signal(false);
  errorMsg       = signal<string | null>(null);
  exitoMsg       = signal<string | null>(null);

  // Contenidos del tema (solo en modo edición)
  archivos       = signal<DbArchivoContenido[]>([]);
  tareas         = signal<DbTarea[]>([]);
  examenes       = signal<DbExamen[]>([]);
  isLoadingContenidos = signal(false);
  
  isSubmittingFiles = signal(false);

  archivosUpload = computed(() => {
    return this.archivos().map(a => ({
      id: a.id_contenido,
      name: a.nombre_archivo,
      size: a.peso_bytes,
      type: a.tipo_mime,
      dataURL: a.archivo_blob ? `data:${a.tipo_mime};base64,${a.archivo_blob}` : undefined,
      isExisting: true
    } as UploadedFile));
  });

  // ── Formulario ────────────────────────────────────────────────────────────
  form: FormGroup = this.fb.group({
    titulo:      ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(5)]]
  });

  // ── Computed ──────────────────────────────────────────────────────────────
  tituloHeader = computed(() =>
    this.modoEdicion() ? 'Editar tema' : 'Nuevo tema'
  );

  campoTituloInvalido = computed(() => {
    const c = this.form.get('titulo');
    return c && c.invalid && (c.dirty || c.touched);
  });

  campoDescripcionInvalido = computed(() => {
    const c = this.form.get('descripcion');
    return c && c.invalid && (c.dirty || c.touched);
  });

  // ── Lifecycle ────────────────────────────────────────────────────────────
  ngOnInit() {
    const id            = this.route.snapshot.paramMap.get('id');
    const asignaturaIdParam = this.route.snapshot.queryParamMap.get('asignaturaId');

    if (asignaturaIdParam) {
      this.asignaturaId.set(Number(asignaturaIdParam));
    }

    if (id) {
      this.modoEdicion.set(true);
      this.temaId.set(Number(id));
      this.cargarTema(Number(id));
    }
  }

  // ── Carga de datos ────────────────────────────────────────────────────────

  private cargarTema(id: number) {
    this.isLoadingData.set(true);
    this.temasService.getTemaById(id).pipe(
      switchMap(tema => {
        this.asignaturaId.set(tema.asignatura_id ?? null);
        this.form.patchValue({
          titulo:      tema.titulo,
          descripcion: tema.descripcion
        });
        
        // Cargar asignatura para validar permisos
        if (tema.asignatura_id) {
          return forkJoin({
            tema: of(tema),
            asignatura: this.asignaturasService.getAsignaturaById(tema.asignatura_id)
          });
        }
        return forkJoin({ tema: of(tema), asignatura: of(null) });
      })
    ).subscribe({
      next: ({ tema, asignatura }) => {
        if (asignatura) {
          const usuario = this.authService.usuarioActual();
          if (usuario?.rol === 'profesor' && asignatura.profesor_id !== usuario.id) {
             this.router.navigate(['/cursos']);
             return;
          }
        }
        
        this.isLoadingData.set(false);
        this.cargarContenidos(id);
      },
      error: () => {
        this.errorMsg.set('No se pudo cargar el tema.');
        this.isLoadingData.set(false);
      }
    });
  }

  private cargarContenidos(temaId: number) {
    this.isLoadingContenidos.set(true);
    forkJoin({
      archivos: this.temasService.getArchivosByTema(temaId),
      tareas: this.temasService.getTareasByTema(temaId),
      examenes: this.temasService.getExamenesByTema(temaId)
    }).subscribe({
      next: (res) => {
        this.archivos.set(res.archivos);
        this.tareas.set(res.tareas);
        this.examenes.set(res.examenes);
        this.isLoadingContenidos.set(false);
      },
      error: () => this.isLoadingContenidos.set(false)
    });
  }

  // ── Guardar formulario ────────────────────────────────────────────────────

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMsg.set(null);
    this.exitoMsg.set(null);
    this.isGuardando.set(true);

    const { titulo, descripcion } = this.form.value;

    if (this.modoEdicion()) {
      // PUT
      this.temasService.editarTema(this.temaId()!, {
        titulo:      titulo.trim(),
        descripcion: descripcion.trim()
      }).subscribe({
        next: () => {
          this.isGuardando.set(false);
          const asigId = this.asignaturaId();
          if (asigId) {
            this.temasService.temaSeleccionado.set({ id_tema: this.temaId()!, titulo: titulo.trim(), descripcion: descripcion.trim(), asignatura_id: asigId });
            this.location.back();
          } else {
             this.exitoMsg.set('Tema actualizado correctamente.');
             setTimeout(() => this.exitoMsg.set(null), 3000);
          }
        },
        error: (err) => {
          console.error(err);
          this.isGuardando.set(false);
          this.errorMsg.set('Error al guardar el tema. Inténtalo de nuevo.');
        }
      });
    } else {
      // POST — necesitamos asignaturaId
      if (!this.asignaturaId()) {
        this.errorMsg.set('Falta el ID de la asignatura. Vuelve atrás e inténtalo de nuevo.');
        this.isGuardando.set(false);
        return;
      }
      this.temasService.crearTema({
        titulo:       titulo.trim(),
        descripcion:  descripcion.trim(),
        asignaturaId: this.asignaturaId()!
      }).subscribe({
        next: (tema) => {
          this.isGuardando.set(false);
          // Ir al editor del nuevo tema
          this.router.navigate(['/edicion/tema', tema.id_tema]);
        },
        error: (err) => {
          console.error(err);
          this.isGuardando.set(false);
          this.errorMsg.set('Error al crear el tema. Inténtalo de nuevo.');
        }
      });
    }
  }

  // ── Navegación ────────────────────────────────────────────────────────────
  
  irANuevaTarea() {
    if (this.temaId()) {
      this.router.navigate(['/edicion/tarea/nueva'], { queryParams: { temaId: this.temaId() } });
    }
  }

  editarTarea(id: number) {
    this.router.navigate(['/edicion/tarea', id]);
  }

  irANuevoExamen() {
    if (this.temaId()) {
      this.router.navigate(['/edicion/examen/nuevo'], { queryParams: { temaId: this.temaId() } });
    }
  }

  editarExamen(id: number) {
    this.router.navigate(['/edicion/examen', id]);
  }

  eliminarTarea(id: number, nombre?: string) {
    this.abrirConfirmacionEliminar(id, 'tarea', nombre);
  }

  ejecutarEliminarTarea(id: number) {
    this.temasService.eliminarTarea(id).subscribe({
      next: () => {
        this.tareas.update(list => list.filter(t => t.id_tarea !== id));
        this.exitoMsg.set('Tarea eliminada correctamente.');
        setTimeout(() => this.exitoMsg.set(null), 3000);
      },
      error: () => {
        this.errorMsg.set('No se pudo eliminar la tarea.');
      }
    });
  }

  eliminarExamen(id: number, nombre?: string) {
    this.abrirConfirmacionEliminar(id, 'examen', nombre);
  }

  ejecutarEliminarExamen(id: number) {
    this.temasService.eliminarExamen(id).subscribe({
      next: () => {
        this.examenes.update(list => list.filter(e => e.id_examen !== id));
        this.exitoMsg.set('Examen eliminado correctamente.');
        setTimeout(() => this.exitoMsg.set(null), 3000);
      },
      error: () => {
        this.errorMsg.set('No se pudo eliminar el examen.');
      }
    });
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

  abrirConfirmacionEliminar(id: number, tipo: 'tarea' | 'examen' | 'archivo', nombre?: string) {
    this.itemAEliminar.set({ id, tipo, nombre });
    this.mostrarModalConfirmacion.set(true);
  }

  cerrarConfirmacion() {
    const item = this.itemAEliminar();
    if (item?.tipo === 'archivo' && this.temaId()) {
      this.cargarContenidos(this.temaId()!);
    }
    this.mostrarModalConfirmacion.set(false);
    this.itemAEliminar.set(null);
  }

  confirmarEliminacion() {
    const item = this.itemAEliminar();
    if (!item) return;

    if (item.tipo === 'tarea') {
      this.ejecutarEliminarTarea(item.id);
    } else if (item.tipo === 'examen') {
      this.ejecutarEliminarExamen(item.id);
    } else if (item.tipo === 'archivo') {
      this.ejecutarEliminarArchivo(item.id);
    }
    this.cerrarConfirmacion();
  }

  // ── Gestión Archivos ──────────────────────────────────────────────────────
  
  async onFileAdded(file: UploadedFile) {
    if (file.isExisting) return;

    const tId = this.temaId();
    if (!tId || !file.dataURL) return;

    this.isSubmittingFiles.set(true);
    this.errorMsg.set(null);
    const base64Data = file.dataURL.split(',')[1] || file.dataURL;

    try {
      await firstValueFrom(
        this.temasService.subirArchivo({
          temaId: tId,
          nombreArchivo: file.name,
          tipoMime: file.type || 'application/octet-stream',
          pesoBytes: file.size,
          archivoBlob: base64Data
        })
      );
      this.cargarContenidos(tId);
      this.exitoMsg.set('Archivo subido correctamente.');
      setTimeout(() => this.exitoMsg.set(null), 3000);
    } catch (error) {
      console.error('Error subiendo archivo:', error);
      this.errorMsg.set('Error al subir el archivo.');
      // Reload to remove the pending file from the UI
      this.cargarContenidos(tId);
    } finally {
      this.isSubmittingFiles.set(false);
    }
  }

  onFileRemoved(file: UploadedFile) {
    if (file.isExisting && file.id) {
        this.abrirConfirmacionEliminar(file.id, 'archivo', file.name);
    }
  }

  ejecutarEliminarArchivo(id: number) {
      this.temasService.eliminarArchivo(id).subscribe({
        next: () => {
           this.archivos.update(list => list.filter(a => a.id_contenido !== id));
           this.exitoMsg.set('Archivo eliminado correctamente.');
           setTimeout(() => this.exitoMsg.set(null), 3000);
        },
        error: () => {
           this.errorMsg.set("No se pudo eliminar el archivo.");
           this.cargarContenidos(this.temaId()!);
        }
      });
  }

  volver() {
    this.location.back();
  }
}
