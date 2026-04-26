import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { DbTema } from '@core/models/db-models';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ArrowRight, LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-asignatura',
  imports: [NgbNavModule, LucideAngularModule, RouterOutlet],
  templateUrl: './asignatura.html',
  styleUrl: './asignatura.scss'
})
export class Asignatura implements OnInit{

  asignaturasService = inject(AsignaturasService);
  asignaturaSeleccionada = this.asignaturasService.asignaturaSeleccionada;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  arrowRight = ArrowRight;

  temas = signal<DbTema[]>([]);

  ngOnInit(): void {
    this.asignaturasService.getTemasByAsignatura(this.asignaturaSeleccionada()!.id_asignatura).subscribe((temas) => {
      this.temas.set(temas);
    });
  }

  isTemaSelected() {
    return this.route.firstChild !== null;
  }

  verTema(tema: DbTema) {
    const slug = tema.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
    this.router.navigate([slug], { relativeTo: this.route });
  }

}
