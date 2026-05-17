import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { TemasService } from '@core/services/temas.service';
import { UsuarioService } from '@core/services/usuario.service';
import { AuthService, UsuarioDTO } from '@core/services/auth.service';
import { DbAsignatura, DbTema } from '@core/models/db-models';
import { CursosService } from '@core/services/cursos.service';
import { PageTitle } from '@/app/components/page-title';
import { ChoiceSelectInputDirective } from '@core/directive/choices-select.directive';
import {
  LucideAngularModule,
  ArrowLeft, Save, Plus, Pencil, Trash2,
  Loader, AlertCircle, CheckCircle, BookOpen, Users, BookMarked
} from 'lucide-angular';

import { ConfirmModal } from '@app/components/confirm-modal/confirm-modal';
import { toSlug } from '@/app/utils/slug';

@Component({
  selector: 'app-editar-asignatura',
  imports: [ReactiveFormsModule, LucideAngularModule, CommonModule, PageTitle, ChoiceSelectInputDirective, ConfirmModal],
  templateUrl: './editar-asignatura.html',
  styleUrl: './editar-asignatura.scss'
})
export class EditarAsignatura implements OnInit {

  // ── Iconos ───────────────────────────────────────────────────────────────
  arrowLeft    = ArrowLeft;
  save         = Save;
  plus         = Plus;
  pencil       = Pencil;
  trash        = Trash2;
  loader       = Loader;
  alertCircle  = AlertCircle;
  checkCircle  = CheckCircle;
  bookOpen     = BookOpen;
  users        = Users;
  graduation   = BookMarked;

  // ── Inyecciones ──────────────────────────────────────────────────────────
  private route              = inject(ActivatedRoute);
  private router             = inject(Router);
  private fb                 = inject(FormBuilder);
  private asignaturasService = inject(AsignaturasService);
  private temasService       = inject(TemasService);
  private usuarioService     = inject(UsuarioService);
  private authService        = inject(AuthService);
  private cursosService      = inject(CursosService);
  private location           = inject(Location);

  // ── Estado ───────────────────────────────────────────────────────────────
  modoEdicion         = signal(false);
  asignaturaId        = signal<number | null>(null);
  cursoId             = signal<number | null>(null);

  isLoadingData       = signal(false);
  isGuardando         = signal(false);
  errorMsg            = signal<string | null>(null);
  exitoMsg            = signal<string | null>(null);

  profesores          = signal<UsuarioDTO[]>([]);
  temas               = signal<DbTema[]>([]);
  isLoadingTemas      = signal(false);
  eliminandoTemaId    = signal<number | null>(null);

  // Opciones para choicesSelect
  opcionesProfesor = computed(() => {
    return {
      searchEnabled: true,
      itemSelectText: '',
      choices: [
        { value: '', label: '— Selecciona un profesor —', disabled: true, selected: !this.form?.value?.profesorId },
        ...this.profesores().map(p => ({
          value: p.id.toString(),
          label: p.username,
          selected: Number(this.form?.value?.profesorId) === p.id
        }))
      ]
    };
  });

  // ── Formulario ────────────────────────────────────────────────────────────
  form: FormGroup = this.fb.group({
    nombre:     ['', [Validators.required, Validators.minLength(3)]],
    profesorId: [null, Validators.required]
  });

  // ── Computed ──────────────────────────────────────────────────────────────
  tituloHeader = computed(() =>
    this.modoEdicion() ? 'Editar asignatura' : 'Nueva asignatura'
  );

  campoNombreInvalido = computed(() => {
    const c = this.form.get('nombre');
    return c && c.invalid && (c.dirty || c.touched);
  });

  campoProfesorInvalido = computed(() => {
    const c = this.form.get('profesorId');
    return c && c.invalid && (c.dirty || c.touched);
  });

  // ── Lifecycle ────────────────────────────────────────────────────────────
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const cursoIdParam = this.route.snapshot.queryParamMap.get('cursoId');

    if (cursoIdParam) {
      this.cursoId.set(Number(cursoIdParam));
    }

    // Carga la lista de profesores siempre
    this.usuarioService.getProfesores().subscribe({
      next: (profs) => this.profesores.set(profs),
      error: () => { /* no bloquea si falla */ }
    });

    if (id) {
      // Modo edición
      this.modoEdicion.set(true);
      this.asignaturaId.set(Number(id));
      this.cargarAsignatura(Number(id));
    }
  }

  // ── Carga de datos ────────────────────────────────────────────────────────

  private cargarAsignatura(id: number) {
    this.isLoadingData.set(true);
    this.asignaturasService.getAsignaturaById(id).subscribe({
      next: (asig) => {
        // Validación de permisos para profesores
        const usuario = this.authService.usuarioActual();
        if (usuario?.rol === 'profesor' && asig.profesor_id !== usuario.id) {
          this.router.navigate(['/cursos']);
          return;
        }
        this.cursoId.set(asig.curso_id);
        this.form.patchValue({
          nombre:     asig.nombre,
          profesorId: asig.profesor_id
        });
        this.isLoadingData.set(false);
        this.cargarTemas(id);
      },
      error: () => {
        this.errorMsg.set('No se pudo cargar la asignatura.');
        this.isLoadingData.set(false);
      }
    });
  }

  private cargarTemas(asignaturaId: number) {
    this.isLoadingTemas.set(true);
    this.asignaturasService.getTemasByAsignatura(asignaturaId).subscribe({
      next: (data) => {
        this.temas.set(data);
        this.isLoadingTemas.set(false);
      },
      error: () => this.isLoadingTemas.set(false)
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

    const { nombre, profesorId } = this.form.value;

    const navegarAAsignatura = (asig: DbAsignatura) => {
      this.asignaturasService.asignaturaSeleccionada.set(asig);
      const asigUrl = toSlug(asig.nombre);
      
      const cursoEnState = this.cursosService.cursoSeleccionado();
      if (cursoEnState && cursoEnState.id_curso === asig.curso_id) {
          const cursoUrl = toSlug(cursoEnState.nombre);
          this.router.navigate(['/cursos', cursoUrl, asigUrl]);
      } else {
          this.cursosService.getCursoById(asig.curso_id).subscribe(c => {
              this.cursosService.cursoSeleccionado.set(c);
              const cursoUrl = toSlug(c.nombre);
              this.router.navigate(['/cursos', cursoUrl, asigUrl]);
          });
      }
    };

    if (this.modoEdicion()) {
      // PUT
      this.asignaturasService.editarAsignatura(this.asignaturaId()!, {
        nombre: nombre.trim(),
        profesorId: Number(profesorId)
      }).subscribe({
        next: (asig) => {
          this.isGuardando.set(false);
          navegarAAsignatura(asig);
        },
        error: (err) => {
          console.error(err);
          this.isGuardando.set(false);
          this.errorMsg.set('Error al guardar la asignatura. Inténtalo de nuevo.');
        }
      });
    } else {
      // POST — necesitamos cursoId
      if (!this.cursoId()) {
        this.errorMsg.set('Falta el ID del curso. Vuelve atrás e inténtalo de nuevo.');
        this.isGuardando.set(false);
        return;
      }
      this.asignaturasService.crearAsignatura({
        nombre: nombre.trim(),
        cursoId: this.cursoId()!,
        profesorId: Number(profesorId)
      }).subscribe({
        next: (asig) => {
          this.isGuardando.set(false);
          navegarAAsignatura(asig);
        },
        error: (err) => {
          console.error(err);
          this.isGuardando.set(false);
          this.errorMsg.set('Error al crear la asignatura. Inténtalo de nuevo.');
        }
      });
    }
  }

  // ── Navegación temas ──────────────────────────────────────────────────────

  nuevoTema() {
    this.router.navigate(['/edicion/tema/nuevo'], {
      queryParams: { asignaturaId: this.asignaturaId() }
    });
  }

  editarTema(tema: DbTema) {
    this.router.navigate(['/edicion/tema', tema.id_tema]);
  }

  // ── Modal de Confirmación ────────────────────────────────────────────────
  mostrarModalConfirmacion = signal(false);
  itemAEliminar = signal<DbTema | null>(null);

  eliminarTema(tema: DbTema) {
    this.itemAEliminar.set(tema);
    this.mostrarModalConfirmacion.set(true);
  }

  cerrarConfirmacion() {
    this.mostrarModalConfirmacion.set(false);
    this.itemAEliminar.set(null);
  }

  confirmarEliminacion() {
    const tema = this.itemAEliminar();
    if (!tema) return;

    this.eliminandoTemaId.set(tema.id_tema);
    this.temasService.eliminarTema(tema.id_tema).subscribe({
      next: () => {
        this.temas.update(list => list.filter(t => t.id_tema !== tema.id_tema));
        this.eliminandoTemaId.set(null);
        this.cerrarConfirmacion();
      },
      error: () => {
        alert('No se pudo eliminar el tema.');
        this.eliminandoTemaId.set(null);
        this.cerrarConfirmacion();
      }
    });
  }

  volver() {
    this.location.back();
  }
}
