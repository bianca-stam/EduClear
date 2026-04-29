import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { DbCalificacionesAlumno, DbTema } from '@core/models/db-models';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { AuthService } from '@core/services/auth.service';
import { TemasService } from '@core/services/temas.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { ArrowRight, LucideAngularModule, AlertCircle, Loader } from "lucide-angular";

@Component({
  selector: 'app-asignatura',
  imports: [NgbNavModule, LucideAngularModule, RouterOutlet, DecimalPipe],
  templateUrl: './asignatura.html',
  styleUrl: './asignatura.scss'
})
export class Asignatura implements OnInit{

  asignaturasService = inject(AsignaturasService);
  authService = inject(AuthService);
  asignaturaSeleccionada = this.asignaturasService.asignaturaSeleccionada;
  temaService = inject(TemasService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  arrowRight = ArrowRight;
  alertCircle = AlertCircle;
  loader = Loader;

  temas = signal<DbTema[]>([]);
  promedios = signal<DbCalificacionesAlumno[]>([]);

  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  ngOnInit(): void {
    const idAsignatura = this.asignaturaSeleccionada()!.id_asignatura;
    const idUsuario = this.authService.usuarioActual()!.id;

    forkJoin({
      temas: this.asignaturasService.getTemasByAsignatura(idAsignatura),
      promedios: this.asignaturasService.getPromedioCalificacionesPorAlumno(idUsuario, idAsignatura)
    }).subscribe({
      next: ({ temas, promedios }) => {
        this.temas.set(temas);
        this.promedios.set(promedios);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar datos de la asignatura:', err);
        this.errorMsg.set('No se pudieron cargar los datos de la asignatura.');
        this.isLoading.set(false);
      }
    });
  }

  isTemaSelected() {
    return this.route.firstChild !== null;
  }

  verTema(tema: DbTema) {
    const slug = tema.titulo.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, '-');
      
    this.temaService.temaSeleccionado.set(tema);
    this.router.navigate([slug], { relativeTo: this.route });
  }

  isCalificacionSelected() {
    return this.route.firstChild !== null;
  }


}
