import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CursoConAlumnos, CursosService } from '@core/services/cursos.service';
import { LucideAngularModule, Search, AlertCircle, Loader } from "lucide-angular";
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { DbCurso } from '@core/models/db-models';

@Component({
  selector: 'app-cursos',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss'
})
export class Cursos implements OnInit {
  search = Search;
  alertCircle = AlertCircle;
  loader = Loader;

  private router = inject(Router);
  private cursosService = inject(CursosService);
  private authService = inject(AuthService);

  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  private cursosRaw = signal<DbCurso[]>([]);

  terminoBusqueda = signal<string>('');

  cursos = computed(() => {
    const busqueda = this.terminoBusqueda().toLowerCase();
    if (!busqueda) return this.cursosRaw();
    return this.cursosRaw().filter(curso => {
      return curso.nombre.toLowerCase().includes(busqueda);
    });
  });

  ngOnInit() {
    // this.cursosService.getCursosDelAlumno().subscribe({
    //   next: (data) => {
    //     this.cursosRaw.set(data);
    //     this.isLoading.set(false);
    //   },
    //   error: (err) => {
    //     this.errorMsg.set('No se pudieron cargar los cursos. Verifica que el servidor esté activo.');
    //     this.isLoading.set(false);
    //     console.error('Error al cargar cursos:', err);
    //   }
    // });


    // using mock data
    this.cursosService.getCursosDelAlumno(this.authService.usuarioActual()!.id).subscribe({
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

  verCurso(curso: DbCurso) {
    this.cursosService.cursoSeleccionado.set(curso);
    const nombreUrl = curso.nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-');
    this.router.navigate(['/cursos', nombreUrl]);
  }

  buscarCurso(busqueda: string) {
    this.terminoBusqueda.set(busqueda);
  }
}

