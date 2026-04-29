import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DbArchivoContenido, DbEntregaTarea, DbExamen, DbTarea } from '@core/models/db-models';
import { TemasService } from '@core/services/temas.service';
import { forkJoin } from 'rxjs';
import { ArrowRight, ClipboardPen, FileUp, FileText, LucideAngularModule, AlertCircle, Loader } from "lucide-angular";

@Component({
  selector: 'app-tema',
  imports: [LucideAngularModule, DatePipe],
  templateUrl: './tema.html',
  styleUrl: './tema.scss'
})
export class Tema implements OnInit {

  arrowRight = ArrowRight;
  clipboardPen = ClipboardPen;
  fileUp = FileUp;
  fileText = FileText;
  alertCircle = AlertCircle;
  loader = Loader;

  private readonly temaService = inject(TemasService);

  titulo = computed(() => this.temaService.temaSeleccionado()?.titulo);
  descripcion = computed(() => this.temaService.temaSeleccionado()?.descripcion);

  entregas = signal<DbTarea[]>([]);
  examenes = signal<DbExamen[]>([]);
  materiales = signal<DbArchivoContenido[]>([]);

  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(){
    const idTema = this.temaService.temaSeleccionado()!.id_tema;
    
    forkJoin({
      archivos: this.temaService.getArchivosByTema(idTema),
      examenes: this.temaService.getExamenesByTema(idTema),
      entregas: this.temaService.getTareasByTema(idTema)
    }).subscribe({
      next: ({ archivos, examenes, entregas }) => {
        this.materiales.set(archivos);
        this.examenes.set(examenes);
        this.entregas.set(entregas);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar datos del tema:', err);
        this.errorMsg.set('No se pudieron cargar los recursos del tema.');
        this.isLoading.set(false);
      }
    });
  }

  verTarea(tarea: DbTarea) {
    const slug = tarea.titulo.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, '-');
    this.temaService.tareaSeleccionada.set(tarea);
    this.router.navigate(['tarea', slug], { relativeTo: this.route });
  }

  verExamen(examen: DbExamen) {
    const slug = examen.titulo.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, '-');
    this.temaService.examenSeleccionado.set(examen);
    this.router.navigate(['examen', slug], { relativeTo: this.route });
  }

  abrirMaterial(material: DbArchivoContenido): void {
    this.temaService.getArchivoById(material.id_contenido).subscribe((res) => {
      if (!res.archivoBlob) {
        console.error('El archivo no tiene contenido binario');
        return;
      }

      // Convertir Base64 a Blob
      const byteCharacters = atob(res.archivoBlob);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: res.tipoMime || 'application/octet-stream' });

      // Abrir el Blob
      const url = URL.createObjectURL(blob);
      const ventana = window.open(url, '_blank');

      if (ventana) {
        // Liberar URL después de un tiempo (load no siempre funciona con Blobs en todos los navegadores)
        setTimeout(() => URL.revokeObjectURL(url), 100);
      } else {
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = res.nombreArchivo || material.nombre_archivo;
        enlace.click();
        URL.revokeObjectURL(url);
      }
    });
  }

}
