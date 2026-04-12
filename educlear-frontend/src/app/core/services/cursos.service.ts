import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { UsuarioDTO } from './auth.service';

export interface CursoDTO {
  id: number;
  nombre: string;
}

export interface CursoConAlumnos extends CursoDTO {
  alumnos: number;
  listaAlumnos: UsuarioDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private _http = inject(HttpClient);
  private readonly BASE_URL = `${environment.cursosUrl}/cursos`;

  cursoSleccionado = signal<CursoConAlumnos | null>(null);

  getAllCursos(): Observable<CursoDTO[]> {
    return this._http.get<CursoDTO[]>(this.BASE_URL);
  }

  getCursoById(id: number): Observable<CursoDTO> {
    return this._http.get<CursoDTO>(`${this.BASE_URL}/${id}`);
  }

  getCursosConAlumnos(): Observable<CursoConAlumnos[]> {
    return forkJoin({
      cursos: this._http.get<CursoDTO[]>(this.BASE_URL),
      usuarios: this._http.get<UsuarioDTO[]>(`${environment.usuariosUrl}/usuarios`)
    }).pipe(
      map(({ cursos, usuarios }) => {
        const alumnos = usuarios.filter(u => u.rol === 'ALUMNO');
        return cursos.map(curso => ({
          ...curso,
          alumnos: alumnos.filter(u => u.cursoId === curso.id).length,
          listaAlumnos: alumnos.filter(u => u.cursoId === curso.id)
        }));
      })
    );
  }
}

