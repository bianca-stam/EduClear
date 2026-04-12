import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { CursosService } from '@core/services/cursos.service';
import { LucideAngularModule, Search } from "lucide-angular";

@Component({
  selector: 'app-asignaturas',
  imports: [LucideAngularModule],
  templateUrl: './asignaturas.html',
  styleUrl: './asignaturas.scss'
})
export class Asignaturas {

  search = Search;

  asignaturasService = inject(AsignaturasService);
  cursoService = inject(CursosService);
  router = inject(Router);

  asignaturasRaw = signal<any[]>([
    {
      id: 1,
      nombre: "Matematicas",
      profesor: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      alumnos: 20,
    },
    {
      id: 2,
      nombre: "Ciencias",
      profesor: "Maria",
      alumnos: 25,
    },
    {
      id: 3,
      nombre: "Historia",
      profesor: "Pedro",
      alumnos: 30,
    },
  ]);

  verAsignatura(asignatura: any){

    this.asignaturasService.asignaturaSeleccionada.set(asignatura);
    
    const nombreUrl = asignatura.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
    
    this.router.navigate(['/inicio', this.cursoService.cursoSleccionado()?.nombre, nombreUrl]);
    
  }

  terminoBusqueda = signal<string>('');

  asignaturas = computed(() => {
    const busqueda = this.terminoBusqueda().toLowerCase();
    if (!busqueda) return this.asignaturasRaw();
    return this.asignaturasRaw().filter(asignatura => asignatura.nombre.toLowerCase().startsWith(busqueda));
  });

  buscarAsignatura(busqueda: string){
    this.terminoBusqueda.set(busqueda);
  }

}
