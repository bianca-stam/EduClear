import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DbAsignatura } from '@core/models/db-models';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { CursosService } from '@core/services/cursos.service';
import { UsuarioService } from '@core/services/usuario.service';
import { AuthService } from '@core/services/auth.service';
import { LucideAngularModule, Search, AlertCircle, Loader, Pencil, Trash2, Plus } from "lucide-angular";
import { forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export interface AsignaturaVista extends DbAsignatura {
  profesor: string;
  alumnos: number;
}

import { ConfirmModal } from '@app/components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-asignaturas',
  imports: [LucideAngularModule, ConfirmModal],
  templateUrl: './asignaturas.html',
  styleUrl: './asignaturas.scss'
})
export class Asignaturas implements OnInit {

  search = Search;
  alertCircle = AlertCircle;
  loader = Loader;
  pencil = Pencil;
  trash = Trash2;
  plus = Plus;

  private asignaturasService = inject(AsignaturasService);
  private cursoService = inject(CursosService);
  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(true);
  errorMsg = signal<string | null>(null);
  eliminandoId = signal<number | null>(null);

  asignaturasRaw = signal<AsignaturaVista[]>([]);
  terminoBusqueda = signal<string>('');

  asignaturas = computed(() => {
    const busqueda = this.terminoBusqueda().toLowerCase();
    if (!busqueda) return this.asignaturasRaw();
    return this.asignaturasRaw().filter(asignatura => asignatura.nombre.toLowerCase().includes(busqueda));
  });

  ngOnInit() {
    const cursoSeleccionado = this.cursoService.cursoSeleccionado();
    if (!cursoSeleccionado) return;

    this.asignaturasService.getAsignaturasByCurso(cursoSeleccionado.id_curso).pipe(
      switchMap(asignaturas => {
        if (asignaturas.length === 0) return of([]);

        const peticiones = asignaturas.map(asignatura => {
          return forkJoin({
            asignatura: of(asignatura),
            profesorReq: this.usuarioService.getUserById(asignatura.profesor_id).pipe(
              catchError(() => of({ username: 'Profesor no asignado' } as any))
            ),
            alumnosReq: this.asignaturasService.getAlumnosCount(asignatura.id_asignatura).pipe(
              catchError(() => of(0))
            )
          }).pipe(
            map(({ asignatura, profesorReq, alumnosReq }) => ({
              ...asignatura,
              profesor: profesorReq.username,
              alumnos: alumnosReq
            } as AsignaturaVista))
          );
        });
        return forkJoin(peticiones);
      })
    ).subscribe({
      next: (data) => {
        this.asignaturasRaw.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar asignaturas:', error);
        this.errorMsg.set('No se pudieron cargar las asignaturas. Verifica que el servidor esté activo.');
        this.isLoading.set(false);
      }
    });
  }

  verAsignatura(asignatura: any) {
    this.asignaturasService.asignaturaSeleccionada.set(asignatura);
    
    const nombreUrl = asignatura.nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, '-');
    
    const cursoNombre = this.cursoService.cursoSeleccionado()?.nombre || '';
    const cursoUrl = cursoNombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, '-');
    this.router.navigate(['/cursos', cursoUrl, nombreUrl]);
  }

  buscarAsignatura(busqueda: string) {
    this.terminoBusqueda.set(busqueda);
  }

  // ── Admin/Profesor ────────────────────────────────────────────────────────

  esAdminOProfesor(): boolean {
    const u = this.authService.usuarioActual();
    return u?.rol === 'admin' || u?.rol === 'profesor';
  }

  puedeEditarAsignatura(asig: AsignaturaVista): boolean {
    const u = this.authService.usuarioActual();
    if (!u) return false;
    if (u.rol === 'admin') return true;
    return u.rol === 'profesor' && asig.profesor_id === u.id;
  }

  nuevaAsignatura() {
    const cursoId = this.cursoService.cursoSeleccionado()?.id_curso;
    this.router.navigate(['/edicion/asignatura/nueva'], {
      queryParams: { cursoId }
    });
  }

  editarAsignatura(event: Event, asig: AsignaturaVista) {
    event.stopPropagation();
    this.router.navigate(['/edicion/asignatura', asig.id_asignatura]);
  }

  // ── Modal de Confirmación ────────────────────────────────────────────────
  mostrarModalConfirmacion = signal(false);
  itemAEliminar = signal<AsignaturaVista | null>(null);

  eliminarAsignatura(event: Event, asig: AsignaturaVista) {
    event.stopPropagation();
    this.itemAEliminar.set(asig);
    this.mostrarModalConfirmacion.set(true);
  }

  cerrarConfirmacion() {
    this.mostrarModalConfirmacion.set(false);
    this.itemAEliminar.set(null);
  }

  confirmarEliminacion() {
    const asig = this.itemAEliminar();
    if (!asig) return;

    this.eliminandoId.set(asig.id_asignatura);
    this.asignaturasService.eliminarAsignatura(asig.id_asignatura).subscribe({
      next: () => {
        this.asignaturasRaw.update(list => list.filter(a => a.id_asignatura !== asig.id_asignatura));
        this.eliminandoId.set(null);
        this.cerrarConfirmacion();
      },
      error: () => {
        alert('No se pudo eliminar la asignatura.');
        this.eliminandoId.set(null);
        this.cerrarConfirmacion();
      }
    });
  }

}
