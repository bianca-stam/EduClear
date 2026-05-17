import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TemasService } from '@core/services/temas.service';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { CursosService } from '@core/services/cursos.service';
import { DbTarea } from '@core/models/db-models';
import { PageTitle } from '@/app/components/page-title';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import {
  LucideAngularModule,
  ArrowLeft, Save, Loader, AlertCircle, CheckCircle
} from 'lucide-angular';

@Component({
  selector: 'app-editar-tarea',
  imports: [ReactiveFormsModule, LucideAngularModule, CommonModule, PageTitle, FlatpickrDirective],
  providers: [provideFlatpickrDefaults()],
  templateUrl: './editar-tarea.html',
  styleUrl: './editar-tarea.scss'
})
export class EditarTarea implements OnInit {

  // ── Iconos ───────────────────────────────────────────────────────────────
  arrowLeft     = ArrowLeft;
  save          = Save;
  loader        = Loader;
  alertCircle   = AlertCircle;
  checkCircle   = CheckCircle;

  // ── Inyecciones ──────────────────────────────────────────────────────────
  private route        = inject(ActivatedRoute);
  private router       = inject(Router);
  private fb           = inject(FormBuilder);
  private temasService = inject(TemasService);
  private asignaturasService = inject(AsignaturasService);
  private cursosService = inject(CursosService);
  private location     = inject(Location);

  // ── Estado ───────────────────────────────────────────────────────────────
  modoEdicion    = signal(false);
  tareaId        = signal<number | null>(null);
  temaId         = signal<number | null>(null);

  isLoadingData  = signal(false);
  isGuardando    = signal(false);
  errorMsg       = signal<string | null>(null);
  exitoMsg       = signal<string | null>(null);

  // ── Formulario ────────────────────────────────────────────────────────────
  form: FormGroup = this.fb.group({
    titulo:         ['', [Validators.required, Validators.minLength(3)]],
    descripcion:    ['', [Validators.required]],
    fecha_apertura: ['', [Validators.required]],
    fecha_cierre:   ['', [Validators.required]]
  });

  // ── Computed ──────────────────────────────────────────────────────────────
  tituloHeader = computed(() =>
    this.modoEdicion() ? 'Editar tarea' : 'Nueva tarea'
  );

  campoInvalido(campo: string) {
    const c = this.form.get(campo);
    return c && c.invalid && (c.dirty || c.touched);
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const temaIdParam = this.route.snapshot.queryParamMap.get('temaId');

    if (temaIdParam) {
      this.temaId.set(Number(temaIdParam));
    }

    if (id) {
      this.modoEdicion.set(true);
      this.tareaId.set(Number(id));
      this.cargarTarea(Number(id));
    }
  }

  // ── Carga de datos ────────────────────────────────────────────────────────
  private cargarTarea(id: number) {
    this.isLoadingData.set(true);
    this.temasService.getTareaById(id).subscribe({
      next: (tarea) => {
        this.temaId.set(tarea.tema_id);
        this.form.patchValue({
          titulo:         tarea.titulo,
          descripcion:    tarea.descripcion,
          fecha_apertura: tarea.fecha_apertura ? new Date(tarea.fecha_apertura) : '',
          fecha_cierre:   tarea.fecha_cierre ? new Date(tarea.fecha_cierre) : ''
        });
        this.isLoadingData.set(false);
      },
      error: () => {
        this.errorMsg.set('No se pudo cargar la tarea.');
        this.isLoadingData.set(false);
      }
    });
  }

  // ── Guardar formulario ────────────────────────────────────────────────────
  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMsg.set(null);
    this.exitoMsg.set(null);
    this.isGuardando.set(true);

    const formVal = this.form.value;
    
    // Flatpickr might return array of Date, a Date, or a string. We ensure ISO string.
    const parseDate = (d: any) => {
      if (!d) return '';
      if (Array.isArray(d)) return d[0].toISOString();
      if (d instanceof Date) return d.toISOString();
      return new Date(d).toISOString();
    };

    const payload = {
      titulo:        formVal.titulo.trim(),
      descripcion:   formVal.descripcion.trim(),
      fechaApertura: parseDate(formVal.fecha_apertura),
      fechaCierre:   parseDate(formVal.fecha_cierre),
      temaId:        this.temaId()!
    };

    const navegarATarea = (tarea: DbTarea) => {
      this.temasService.tareaSeleccionada.set(tarea);
      const tareaUrl = tarea.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');
      
      const temaEnState = this.temasService.temaSeleccionado();
      if (temaEnState && temaEnState.id_tema === tarea.tema_id) {
          const temaUrl = temaEnState.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');
          const asigEnState = this.asignaturasService.asignaturaSeleccionada();
          if (asigEnState && asigEnState.id_asignatura === temaEnState.asignatura_id) {
              const asigUrl = asigEnState.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');
              const cursoEnState = this.cursosService.cursoSeleccionado();
              if (cursoEnState && cursoEnState.id_curso === asigEnState.curso_id) {
                  const cursoUrl = cursoEnState.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');
                  this.router.navigate(['/cursos', cursoUrl, asigUrl, temaUrl, 'tarea', tareaUrl]);
              } else {
                  this.cursosService.getCursoById(asigEnState.curso_id).subscribe(c => {
                      this.cursosService.cursoSeleccionado.set(c);
                      const cursoUrl = c.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');
                      this.router.navigate(['/cursos', cursoUrl, asigUrl, temaUrl, 'tarea', tareaUrl]);
                  });
              }
          } else {
              // Si no tenemos Asignatura en state, la recuperamos
              this.asignaturasService.getAsignaturaById(temaEnState.asignatura_id!).subscribe(a => {
                  this.asignaturasService.asignaturaSeleccionada.set(a);
                  const asigUrl = a.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');
                  const cursoEnState = this.cursosService.cursoSeleccionado();
                  if (cursoEnState && cursoEnState.id_curso === a.curso_id) {
                      const cursoUrl = cursoEnState.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');
                      this.router.navigate(['/cursos', cursoUrl, asigUrl, temaUrl, 'tarea', tareaUrl]);
                  } else {
                      this.cursosService.getCursoById(a.curso_id).subscribe(c => {
                          this.cursosService.cursoSeleccionado.set(c);
                          const cursoUrl = c.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');
                          this.router.navigate(['/cursos', cursoUrl, asigUrl, temaUrl, 'tarea', tareaUrl]);
                      });
                  }
              });
          }
      } else {
          // Si no tenemos Tema en state
          this.temasService.getTemaById(tarea.tema_id).subscribe(t => {
              this.temasService.temaSeleccionado.set(t);
              const temaUrl = t.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');
              this.asignaturasService.getAsignaturaById(t.asignatura_id!).subscribe(a => {
                  this.asignaturasService.asignaturaSeleccionada.set(a);
                  const asigUrl = a.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');
                  this.cursosService.getCursoById(a.curso_id).subscribe(c => {
                      this.cursosService.cursoSeleccionado.set(c);
                      const cursoUrl = c.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');
                      this.router.navigate(['/cursos', cursoUrl, asigUrl, temaUrl, 'tarea', tareaUrl]);
                  });
              });
          });
      }
    };

    if (this.modoEdicion()) {
      this.temasService.editarTarea(this.tareaId()!, payload).subscribe({
        next: (tarea) => {
          this.isGuardando.set(false);
          this.exitoMsg.set('Tarea actualizada correctamente.');
          setTimeout(() => navegarATarea(tarea), 1500);
        },
        error: (err) => {
          console.error(err);
          this.isGuardando.set(false);
          this.errorMsg.set('Error al guardar la tarea. Inténtalo de nuevo.');
        }
      });
    } else {
      if (!this.temaId()) {
        this.errorMsg.set('Falta el ID del tema. Vuelve atrás e inténtalo de nuevo.');
        this.isGuardando.set(false);
        return;
      }
      this.temasService.crearTarea(payload).subscribe({
        next: (tarea) => {
          this.isGuardando.set(false);
          this.exitoMsg.set('Tarea creada correctamente.');
          setTimeout(() => navegarATarea(tarea), 1500);
        },
        error: (err) => {
          console.error(err);
          this.isGuardando.set(false);
          this.errorMsg.set('Error al crear la tarea. Inténtalo de nuevo.');
        }
      });
    }
  }

  volver() {
    this.location.back();
  }
}
