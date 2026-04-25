import { Component, inject, OnInit, signal } from '@angular/core';
import { DbTema } from '@core/models/db-models';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ArrowRight, LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-asignatura',
  imports: [NgbNavModule, LucideAngularModule],
  templateUrl: './asignatura.html',
  styleUrl: './asignatura.scss'
})
export class Asignatura implements OnInit{

  asignaturasService = inject(AsignaturasService);
  asignaturaSeleccionada = this.asignaturasService.asignaturaSeleccionada;
  arrowRight = ArrowRight;

  temas = signal<DbTema[]>([]);

  ngOnInit(): void {
    this.asignaturasService.getTemasByAsignatura(this.asignaturaSeleccionada()!.id_asignatura).subscribe((temas) => {
      this.temas.set(temas);
    });
  }

  verTema(tema: any) {
    
  }



}
