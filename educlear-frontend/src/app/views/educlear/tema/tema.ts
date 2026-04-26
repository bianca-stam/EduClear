import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DbArchivoContenido, DbEntregaTarea, DbExamen, DbTarea } from '@core/models/db-models';
import { TemasService } from '@core/services/temas.service';
import { ArrowRight, ClipboardPen, FileUp, FileText, LucideAngularModule } from "lucide-angular";

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

  private readonly temaService = inject(TemasService);

  titulo = computed(() => this.temaService.temaSeleccionado()?.titulo);
  descripcion = computed(() => this.temaService.temaSeleccionado()?.descripcion);

  entregas = signal<DbTarea[]>([]);
  examenes = signal<DbExamen[]>([]);
  materiales = signal<DbArchivoContenido[]>([]);

  ngOnInit(){
    const idTema = this.temaService.temaSeleccionado()!.id_tema;
    this.temaService.getArchivosByTema(idTema).subscribe((archivos) => {
      this.materiales.set(archivos);
    });
    this.temaService.getExamenesByTema(idTema).subscribe((examenes) => {
      this.examenes.set(examenes);
    });
    this.temaService.getTareasByTema(idTema).subscribe((entregas) => {
      this.entregas.set(entregas);
    });
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
