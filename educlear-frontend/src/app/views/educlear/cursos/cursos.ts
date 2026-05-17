import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from '@core/services/cursos.service';
import { LucideAngularModule, Search, AlertCircle, Loader, LucidePencil, Plus, Trash2 } from "lucide-angular";
import { AuthService } from '@core/services/auth.service';
import { DbCurso } from '@core/models/db-models';

import { ConfirmModal } from '@app/components/confirm-modal/confirm-modal';
import { toSlug } from '@/app/utils/slug';

@Component({
  selector: 'app-cursos',
  imports: [LucideAngularModule, ConfirmModal],
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss'
})
export class Cursos implements OnInit {
  // ── Iconos ───────────────────────────────────────────────────────────────
  search = Search;
  alertCircle = AlertCircle;
  loader = Loader;
  pencil = LucidePencil;
  plus = Plus;
  trash = Trash2;

  // ── Inyecciones ──────────────────────────────────────────────────────────
  private router = inject(Router);
  private cursosService = inject(CursosService);
  private authService = inject(AuthService);

  // ── Estado ───────────────────────────────────────────────────────────────
  isLoading = signal(true);
  errorMsg = signal<string | null>(null);
  eliminandoId = signal<number | null>(null);
  private cursosRaw = signal<DbCurso[]>([]);
  terminoBusqueda = signal<string>('');

  // ── Computed ──────────────────────────────────────────────────────────────
  esAdminOProfesor = computed(() => {
    const rol = this.authService.usuarioActual()?.rol;
    return rol === 'admin' || rol === 'profesor';
  });

  cursos = computed(() => {
    const busqueda = this.terminoBusqueda().toLowerCase();
    if (!busqueda) return this.cursosRaw();
    return this.cursosRaw().filter(curso => {
      return curso.nombre.toLowerCase().includes(busqueda);
    });
  });

  // ── Lifecycle ────────────────────────────────────────────────────────────
  ngOnInit() {
    this.cargarCursos();
  }

  // ── Carga de datos ────────────────────────────────────────────────────────
  cargarCursos() {
    const usuario = this.authService.usuarioActual()!;
    let cursos$;

    switch (usuario.rol) {
      case 'profesor':
        cursos$ = this.cursosService.getCursosDelProfesor(usuario.id);
        break;
      case 'admin':
        cursos$ = this.cursosService.getAllCursos();
        break;
      default: // alumno
        cursos$ = this.cursosService.getCursosDelAlumno(usuario.id);
    }

    cursos$.subscribe({
      next: (data) => {
        this.cursosRaw.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMsg.set('No se pudieron cargar los cursos. Verifica que el servidor esté activo.');
        this.isLoading.set(false);
        console.error('Error al cargar cursos:', err);
      }
    });
  }

  // ── Navegación ────────────────────────────────────────────────────────────
  verCurso(curso: DbCurso) {
    this.cursosService.cursoSeleccionado.set(curso);
    const nombreUrl = toSlug(curso.nombre);
    this.router.navigate(['/cursos', nombreUrl]);
  }

  navegarACrear() {
    this.router.navigate(['/edicion/curso/nuevo']);
  }

  navegarAEditar(event: Event, curso: DbCurso) {
    event.stopPropagation();
    this.router.navigate(['/edicion/curso', curso.id_curso]);
  }

  // ── Modal de Confirmación ────────────────────────────────────────────────
  mostrarModalConfirmacion = signal(false);
  itemAEliminar = signal<DbCurso | null>(null);

  confirmarEliminar(event: Event, curso: DbCurso) {
    event.stopPropagation();
    this.itemAEliminar.set(curso);
    this.mostrarModalConfirmacion.set(true);
  }

  cerrarConfirmacion() {
    this.mostrarModalConfirmacion.set(false);
    this.itemAEliminar.set(null);
  }

  ejecutarEliminacion() {
    const curso = this.itemAEliminar();
    if (!curso) return;

    this.eliminandoId.set(curso.id_curso);
    this.cursosService.eliminarCurso(curso.id_curso).subscribe({
      next: () => {
        this.cursosRaw.update(list => list.filter(c => c.id_curso !== curso.id_curso));
        this.eliminandoId.set(null);
        this.cerrarConfirmacion();
      },
      error: (err) => {
        console.error('Error al eliminar curso:', err);
        this.eliminandoId.set(null);
        alert('No se pudo eliminar el curso. Inténtalo de nuevo.');
        this.cerrarConfirmacion();
      }
    });
  }

  // ── Búsqueda ──────────────────────────────────────────────────────────────
  buscarCurso(busqueda: string) {
    this.terminoBusqueda.set(busqueda);
  }
}
