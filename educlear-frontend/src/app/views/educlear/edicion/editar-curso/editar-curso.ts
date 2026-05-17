import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursosService } from '@core/services/cursos.service';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { AuthService } from '@core/services/auth.service';
import { DbAsignatura, DbCurso } from '@core/models/db-models';
import { PageTitle } from '@/app/components/page-title';
import {
  LucideAngularModule,
  ArrowLeft, Save, Plus, Pencil, Trash2,
  Loader, AlertCircle, CheckCircle, BookOpen, Users
} from 'lucide-angular';

import { ConfirmModal } from '@app/components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-editar-curso',
  imports: [ReactiveFormsModule, LucideAngularModule, PageTitle, ConfirmModal],
  templateUrl: './editar-curso.html',
  styleUrl: './editar-curso.scss'
})
export class EditarCurso implements OnInit {

  // ── Iconos ───────────────────────────────────────────────────────────────
  arrowLeft = ArrowLeft;
  save = Save;
  plus = Plus;
  pencil = Pencil;
  trash = Trash2;
  loader = Loader;
  alertCircle = AlertCircle;
  checkCircle = CheckCircle;
  bookOpen = BookOpen;
  users = Users;

  // ── Inyecciones ──────────────────────────────────────────────────────────
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private cursosService = inject(CursosService);
  private asignaturasService = inject(AsignaturasService);
  private authService = inject(AuthService);
  private location = inject(Location);

  // ── Estado ───────────────────────────────────────────────────────────────
  modoEdicion = signal(false);
  cursoId = signal<number | null>(null);
  isLoadingCurso = signal(false);
  isGuardando = signal(false);
  errorMsg = signal<string | null>(null);
  exitoMsg = signal<string | null>(null);

  // Asignaturas del curso (solo en modo edición)
  asignaturas = signal<DbAsignatura[]>([]);
  isLoadingAsignaturas = signal(false);
  eliminandoAsignaturaId = signal<number | null>(null);

  // ── Formulario ────────────────────────────────────────────────────────────
  form: FormGroup = this.fb.group({
    nombre:     ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['']
  });

  // ── Computed ──────────────────────────────────────────────────────────────
  tituloHeader = computed(() =>
    this.modoEdicion() ? 'Editar curso' : 'Nuevo curso'
  );

  campoNombreInvalido = computed(() => {
    const c = this.form.get('nombre');
    return c && c.invalid && (c.dirty || c.touched);
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.modoEdicion.set(true);
      this.cursoId.set(Number(id));
      this.cargarCurso(Number(id));
      this.cargarAsignaturas(Number(id));
    }
  }

  // ── Carga de datos ────────────────────────────────────────────────────────

  private cargarCurso(id: number) {
    this.isLoadingCurso.set(true);
    this.cursosService.getCursoById(id).subscribe({
      next: (curso) => {
        this.form.patchValue({
          nombre: curso.nombre,
          descripcion: curso.descripcion
        });
        this.isLoadingCurso.set(false);
      },
      error: () => {
        this.errorMsg.set('No se pudo cargar el curso.');
        this.isLoadingCurso.set(false);
      }
    });
  }

  private cargarAsignaturas(cursoId: number) {
    this.isLoadingAsignaturas.set(true);
    this.asignaturasService.getAsignaturasByCurso(cursoId).subscribe({
      next: (data) => {
        this.asignaturas.set(data);
        this.isLoadingAsignaturas.set(false);
      },
      error: () => {
        this.isLoadingAsignaturas.set(false);
      }
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

    const payload = {
      nombre: this.form.value.nombre.trim(),
      descripcion: this.form.value.descripcion?.trim() ?? ''
    };

    const op$ = this.modoEdicion()
      ? this.cursosService.editarCurso(this.cursoId()!, payload)
      : this.cursosService.crearCurso(payload);

    op$.subscribe({
      next: (curso) => {
        this.isGuardando.set(false);
        const nombreUrl = curso.nombre
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, '-');
        
        this.cursosService.cursoSeleccionado.set(curso);
        this.router.navigate(['/cursos', nombreUrl]);
      },
      error: (err) => {
        console.error(err);
        this.isGuardando.set(false);
        this.errorMsg.set('Error al guardar el curso. Inténtalo de nuevo.');
      }
    });
  }

  // ── Navegación asignaturas ────────────────────────────────────────────────

  nuevaAsignatura() {
    this.router.navigate(['/edicion/asignatura/nueva'], {
      queryParams: { cursoId: this.cursoId() }
    });
  }

  editarAsignatura(asignatura: DbAsignatura) {
    this.router.navigate(['/edicion/asignatura', asignatura.id_asignatura]);
  }

  // ── Modal de Confirmación ────────────────────────────────────────────────
  mostrarModalConfirmacion = signal(false);
  itemAEliminar = signal<DbAsignatura | null>(null);

  eliminarAsignatura(asignatura: DbAsignatura) {
    this.itemAEliminar.set(asignatura);
    this.mostrarModalConfirmacion.set(true);
  }

  cerrarConfirmacion() {
    this.mostrarModalConfirmacion.set(false);
    this.itemAEliminar.set(null);
  }

  confirmarEliminacion() {
    const asignatura = this.itemAEliminar();
    if (!asignatura) return;

    this.eliminandoAsignaturaId.set(asignatura.id_asignatura);
    this.asignaturasService.eliminarAsignatura(asignatura.id_asignatura).subscribe({
      next: () => {
        this.asignaturas.update(list =>
          list.filter(a => a.id_asignatura !== asignatura.id_asignatura)
        );
        this.eliminandoAsignaturaId.set(null);
        this.cerrarConfirmacion();
      },
      error: () => {
        alert('No se pudo eliminar la asignatura.');
        this.eliminandoAsignaturaId.set(null);
        this.cerrarConfirmacion();
      }
    });
  }

  volver() {
    this.location.back();
  }

  // ── Permiso de edición de asignatura ─────────────────────────────────────
  puedeEditarAsignatura(asignatura: DbAsignatura): boolean {
    const usuario = this.authService.usuarioActual();
    if (!usuario) return false;
    if (usuario.rol === 'admin') return true;
    return usuario.rol === 'profesor' && asignatura.profesor_id === usuario.id;
  }
}
