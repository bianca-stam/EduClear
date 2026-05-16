import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TemasService } from '@core/services/temas.service';
import { ExamenesService } from '@core/services/examenes.service';
import { PageTitle } from '@/app/components/page-title';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import { DbPregunta } from '@core/models/db-models';
import {
  LucideAngularModule,
  ArrowLeft, Save, Loader, AlertCircle, CheckCircle, Plus, Pencil, Trash2, X
} from 'lucide-angular';

import { ConfirmModal } from '@app/components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-editar-examen',
  imports: [ReactiveFormsModule, LucideAngularModule, CommonModule, PageTitle, FlatpickrDirective, ConfirmModal],
  providers: [provideFlatpickrDefaults()],
  templateUrl: './editar-examen.html',
  styleUrl: './editar-examen.scss'
})
export class EditarExamen implements OnInit {

  // ── Iconos ───────────────────────────────────────────────────────────────
  arrowLeft     = ArrowLeft;
  save          = Save;
  loader        = Loader;
  alertCircle   = AlertCircle;
  checkCircle   = CheckCircle;
  plus          = Plus;
  pencil        = Pencil;
  trash         = Trash2;
  xIcon         = X;

  // ── Inyecciones ──────────────────────────────────────────────────────────
  private route           = inject(ActivatedRoute);
  private router          = inject(Router);
  private fb              = inject(FormBuilder);
  private temasService    = inject(TemasService);
  private examenesService = inject(ExamenesService);
  private location        = inject(Location);

  // ── Estado General ────────────────────────────────────────────────────────
  modoEdicion    = signal(false);
  examenId       = signal<number | null>(null);
  temaId         = signal<number | null>(null);

  isLoadingData  = signal(false);
  isGuardando    = signal(false);
  errorMsg       = signal<string | null>(null);
  exitoMsg       = signal<string | null>(null);

  // ── Estado Preguntas ──────────────────────────────────────────────────────
  preguntas      = signal<DbPregunta[]>([]);
  isLoadingPreguntas = signal(false);
  
  modoEdicionPregunta = signal(false);
  preguntaEnEdicionId = signal<number | null>(null);
  mostrarFormPregunta = signal(false);
  isGuardandoPregunta = signal(false);
  errorPreguntaMsg = signal<string | null>(null);

  // ── Formulario Examen ─────────────────────────────────────────────────────
  form: FormGroup = this.fb.group({
    titulo:         ['', [Validators.required, Validators.minLength(3)]],
    descripcion:    ['', [Validators.required, Validators.minLength(5)]],
    fecha_apertura: ['', [Validators.required]],
    fecha_cierre:   ['', [Validators.required]]
  });

  // ── Formulario Pregunta ───────────────────────────────────────────────────
  formPregunta: FormGroup = this.fb.group({
    texto_pregunta:     ['', [Validators.required]],
    opcion_a:           ['', [Validators.required]],
    opcion_b:           ['', [Validators.required]],
    opcion_c:           ['', [Validators.required]],
    opcion_d:           ['', [Validators.required]],
    respuesta_correcta: ['', [Validators.required]]
  });

  // ── Computed ──────────────────────────────────────────────────────────────
  tituloHeader = computed(() =>
    this.modoEdicion() ? 'Editar examen' : 'Nuevo examen'
  );

  campoInvalido(campo: string) {
    const c = this.form.get(campo);
    return c && c.invalid && (c.dirty || c.touched);
  }

  campoPreguntaInvalido(campo: string) {
    const c = this.formPregunta.get(campo);
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
      this.examenId.set(Number(id));
      this.cargarExamen(Number(id));
    }
  }

  // ── Carga de datos ────────────────────────────────────────────────────────
  private cargarExamen(id: number) {
    this.isLoadingData.set(true);
    this.temasService.getExamenById(id).subscribe({
      next: (examen) => {
        this.temaId.set(examen.tema_id);
        this.form.patchValue({
          titulo:         examen.titulo,
          descripcion:    examen.descripcion,
          fecha_apertura: examen.fecha_apertura ? new Date(examen.fecha_apertura) : '',
          fecha_cierre:   examen.fecha_cierre ? new Date(examen.fecha_cierre) : ''
        });
        this.isLoadingData.set(false);
        this.cargarPreguntas(id);
      },
      error: () => {
        this.errorMsg.set('No se pudo cargar el examen.');
        this.isLoadingData.set(false);
      }
    });
  }

  private cargarPreguntas(examenId: number) {
    this.isLoadingPreguntas.set(true);
    this.examenesService.getPreguntasByExamen(examenId).subscribe({
      next: (preguntas) => {
        this.preguntas.set(preguntas);
        this.isLoadingPreguntas.set(false);
      },
      error: () => {
        this.isLoadingPreguntas.set(false);
      }
    });
  }

  // ── Guardar Examen ────────────────────────────────────────────────────────
  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMsg.set(null);
    this.exitoMsg.set(null);
    this.isGuardando.set(true);

    const formVal = this.form.value;
    
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

    if (this.modoEdicion()) {
      this.temasService.editarExamen(this.examenId()!, payload).subscribe({
        next: () => {
          this.isGuardando.set(false);
          this.exitoMsg.set('Examen actualizado correctamente.');
          setTimeout(() => this.location.back(), 1500);
        },
        error: (err) => {
          console.error(err);
          this.isGuardando.set(false);
          this.errorMsg.set('Error al guardar el examen. Inténtalo de nuevo.');
        }
      });
    } else {
      if (!this.temaId()) {
        this.errorMsg.set('Falta el ID del tema. Vuelve atrás e inténtalo de nuevo.');
        this.isGuardando.set(false);
        return;
      }
      this.temasService.crearExamen(payload).subscribe({
        next: (examen) => {
          this.isGuardando.set(false);
          this.exitoMsg.set('Examen creado correctamente. Ahora puedes añadir preguntas.');
          // Redirect to edit mode to add questions
          this.router.navigate(['/edicion/examen', examen.id_examen], { replaceUrl: true });
        },
        error: (err) => {
          console.error(err);
          this.isGuardando.set(false);
          this.errorMsg.set('Error al crear el examen. Inténtalo de nuevo.');
        }
      });
    }
  }

  // ── Gestión de Preguntas ──────────────────────────────────────────────────
  
  abrirFormularioPregunta() {
    this.formPregunta.reset();
    this.modoEdicionPregunta.set(false);
    this.preguntaEnEdicionId.set(null);
    this.mostrarFormPregunta.set(true);
    this.errorPreguntaMsg.set(null);
  }

  cerrarFormularioPregunta() {
    this.mostrarFormPregunta.set(false);
  }

  editarPregunta(pregunta: DbPregunta) {
    this.modoEdicionPregunta.set(true);
    this.preguntaEnEdicionId.set(pregunta.id_pregunta);
    this.formPregunta.patchValue({
      texto_pregunta: pregunta.texto_pregunta,
      opcion_a: pregunta.opcion_a,
      opcion_b: pregunta.opcion_b,
      opcion_c: pregunta.opcion_c,
      opcion_d: pregunta.opcion_d,
      respuesta_correcta: pregunta.respuesta_correcta
    });
    this.mostrarFormPregunta.set(true);
    this.errorPreguntaMsg.set(null);
  }

  // ── Modal de Confirmación ────────────────────────────────────────────────
  mostrarModalConfirmacion = signal(false);
  itemAEliminarId = signal<number | null>(null);
  
  eliminarPregunta(id: number) {
    this.itemAEliminarId.set(id);
    this.mostrarModalConfirmacion.set(true);
  }

  cerrarConfirmacion() {
    this.mostrarModalConfirmacion.set(false);
    this.itemAEliminarId.set(null);
  }

  confirmarEliminacion() {
    const id = this.itemAEliminarId();
    if (!id) return;
    
    this.examenesService.eliminarPregunta(id).subscribe({
      next: () => {
        this.preguntas.update(list => list.filter(p => p.id_pregunta !== id));
        this.cerrarConfirmacion();
      },
      error: () => alert('Error al eliminar la pregunta.')
    });
  }

  guardarPregunta() {
    if (this.formPregunta.invalid) {
      this.formPregunta.markAllAsTouched();
      return;
    }

    this.isGuardandoPregunta.set(true);
    this.errorPreguntaMsg.set(null);

    const val = this.formPregunta.value;
    const payload = {
      examenId: this.examenId()!,
      textoPregunta: val.texto_pregunta.trim(),
      opcionA: val.opcion_a.trim(),
      opcionB: val.opcion_b.trim(),
      opcionC: val.opcion_c.trim(),
      opcionD: val.opcion_d.trim(),
      respuestaCorrecta: val.respuesta_correcta
    };

    if (this.modoEdicionPregunta()) {
      this.examenesService.editarPregunta(this.preguntaEnEdicionId()!, payload).subscribe({
        next: (pregunta) => {
          this.preguntas.update(list => list.map(p => p.id_pregunta === pregunta.id_pregunta ? pregunta : p));
          this.isGuardandoPregunta.set(false);
          this.cerrarFormularioPregunta();
        },
        error: () => {
          this.errorPreguntaMsg.set('Error al guardar la pregunta.');
          this.isGuardandoPregunta.set(false);
        }
      });
    } else {
      this.examenesService.crearPregunta(payload).subscribe({
        next: (pregunta) => {
          this.preguntas.update(list => [...list, pregunta]);
          this.isGuardandoPregunta.set(false);
          this.cerrarFormularioPregunta();
        },
        error: () => {
          this.errorPreguntaMsg.set('Error al crear la pregunta.');
          this.isGuardandoPregunta.set(false);
        }
      });
    }
  }

  volver() {
    this.location.back();
  }
}
