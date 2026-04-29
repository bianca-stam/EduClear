import { Component, computed, inject, signal } from '@angular/core';
import { TemasService } from '@core/services/temas.service';
import { AlertCircle, ArrowRight, ClipboardPen, FileText, FileUp, Loader, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-tareas',
  imports: [LucideAngularModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.scss'
})
export class Tareas {

  private temaService = inject(TemasService);
  arrowRight = ArrowRight;
  clipboardPen = ClipboardPen;
  fileUp = FileUp;
  fileText = FileText;
  alertCircle = AlertCircle;
  loader = Loader;

  titulo = computed(() => this.temaService.tareaSeleccionada()?.titulo);
  descripcion = computed(() => this.temaService.tareaSeleccionada()?.descripcion);

  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  

}
