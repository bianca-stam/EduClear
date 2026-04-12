import { Component, inject } from '@angular/core';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ArrowRight, LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-asignatura',
  imports: [NgbNavModule, LucideAngularModule],
  templateUrl: './asignatura.html',
  styleUrl: './asignatura.scss'
})
export class Asignatura {

  asignaturaSeleccionada = inject(AsignaturasService).asignaturaSeleccionada;
  arrowRight = ArrowRight;

  temas = [
    {
      nombre: 'Tema 1',
      descripcion: 'Descripcion 1'
    },
    {
      nombre: 'Tema 2',
      descripcion: 'Descripcion 2'
    },
    {
      nombre: 'Tema 3',
      descripcion: 'Descripcion 3'
    }
  ]

  verTema(tema: any) {
    this.asignaturaSeleccionada.set(tema);
  }



}
