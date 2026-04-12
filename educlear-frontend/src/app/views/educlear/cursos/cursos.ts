import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CursoConAlumnos, CursosService } from '@core/services/cursos.service';
import { LucideAngularModule, Search, AlertCircle, Loader } from "lucide-angular";
import { CommonModule } from '@angular/common';

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

  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  private cursosRaw = signal<CursoConAlumnos[]>([]);

  terminoBusqueda = signal<string>('');

  cursos = computed(() => {
    const busqueda = this.terminoBusqueda().toLowerCase();
    if (!busqueda) return this.cursosRaw();
    return this.cursosRaw().filter(curso =>
      curso.nombre.toLowerCase().startsWith(busqueda)
    );
  });

  ngOnInit() {
    this.cursosService.getCursosConAlumnos().subscribe({
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

  verCurso(curso: CursoConAlumnos) {
    this.cursosService.cursoSleccionado.set(curso);
    const nombreUrl = curso.nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-');
    this.router.navigate(['/inicio', nombreUrl]);
  }

  buscarCurso(busqueda: string) {
    this.terminoBusqueda.set(busqueda);
  }
}

