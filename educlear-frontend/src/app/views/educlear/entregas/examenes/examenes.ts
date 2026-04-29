import { Component, computed, inject, signal } from '@angular/core';
import { TemasService } from '@core/services/temas.service';
import { AlertCircle, ArrowRight, ClipboardPen, FileText, FileUp, Loader, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-examenes',
  imports: [LucideAngularModule],
  templateUrl: './examenes.html',
  styleUrl: './examenes.scss'
})
export class Examenes {

  private temaService = inject(TemasService);
  arrowRight = ArrowRight;
  clipboardPen = ClipboardPen;
  fileUp = FileUp;
  fileText = FileText;
  alertCircle = AlertCircle;
  loader = Loader;

  titulo = computed(() => this.temaService.examenSeleccionado()?.titulo);
  descripcion = computed(() => this.temaService.examenSeleccionado()?.descripcion);

  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

}
