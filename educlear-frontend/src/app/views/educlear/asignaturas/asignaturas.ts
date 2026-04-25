import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DbAsignatura } from '@core/models/db-models';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { CursosService } from '@core/services/cursos.service';
import { UsuarioService } from '@core/services/usuario.service';
import { LucideAngularModule, Search } from "lucide-angular";
import { forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export interface AsignaturaVista extends DbAsignatura {
  profesor: string;
  alumnos: number;
}

@Component({
  selector: 'app-asignaturas',
  imports: [LucideAngularModule],
  templateUrl: './asignaturas.html',
  styleUrl: './asignaturas.scss'
})
export class Asignaturas implements OnInit {

  search = Search;

  private asignaturasService = inject(AsignaturasService);
  private cursoService = inject(CursosService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

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

    this.asignaturasService.getAsignaturasDelAlumno(cursoSeleccionado.id_curso).pipe(
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
      },
      error: (error) => {
        console.error('Error al cargar asignaturas:', error);
      }
    });
  }

  verAsignatura(asignatura: any) {
    this.asignaturasService.asignaturaSeleccionada.set(asignatura);
    
    const nombreUrl = asignatura.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
    
    const cursoNombre = this.cursoService.cursoSeleccionado()?.nombre || '';
    const cursoUrl = cursoNombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
    this.router.navigate(['/cursos', cursoUrl, nombreUrl]);
  }

  buscarAsignatura(busqueda: string) {
    this.terminoBusqueda.set(busqueda);
  }

}
