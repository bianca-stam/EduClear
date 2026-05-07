import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitle } from '@/app/components/page-title';
import { AgrupacionPendiente, AreaPersonalService, ItemPendiente } from '@core/services/area-personal.service';
import { AuthService } from '@core/services/auth.service';
import { LucideAngularModule, ArrowRight, Loader, AlertCircle, ClipboardPen, FileUp } from 'lucide-angular';
import { Router } from '@angular/router';
import { CursosService } from '@core/services/cursos.service';
import { AsignaturasService } from '@core/services/asignaturas.service';
import { TemasService } from '@core/services/temas.service';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-area-personal',
  imports: [CommonModule, PageTitle, LucideAngularModule, FullCalendarModule, NgbPopoverModule],
  templateUrl: './area-personal.html',
  styleUrl: './area-personal.scss'
})
export class AreaPersonal implements OnInit {
  
  arrowRight = ArrowRight;
  loader = Loader;
  alertCircle = AlertCircle;
  clipboardPen = ClipboardPen;
  fileUp = FileUp;

  private areaPersonalService = inject(AreaPersonalService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cursosService = inject(CursosService);
  private asignaturasService = inject(AsignaturasService);
  private temasService = inject(TemasService);

  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  agrupaciones = signal<AgrupacionPendiente[]>([]);
  todosLosItems = signal<ItemPendiente[]>([]);

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    initialView: 'dayGridMonth',
    themeSystem: 'bootstrap',
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listMonth',
    },
    buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        list: 'Lista'
    },
    height: 600,
    editable: false,
    droppable: false,
    selectable: false,
    events: [],
    eventClick: this.handleEventClick.bind(this)
  };

  ngOnInit(): void {
    const userId = this.authService.usuarioActual()?.id;
    if (!userId) return;

    this.areaPersonalService.getDatosAreaPersonal(userId).subscribe({
      next: (data) => {
        this.agrupaciones.set(data);

        // Aplanar los items para el calendario
        const flatItems: ItemPendiente[] = [];
        data.forEach(agrupacion => flatItems.push(...agrupacion.items));
        this.todosLosItems.set(flatItems);

        // Mapear eventos al calendario
        const events = flatItems.map(item => {
          return {
            id: item.id.toString() + '-' + item.tipo,
            title: item.titulo,
            start: item.fecha_cierre,
            allDay: true,
            className: item.tipo === 'examen' ? 'evento-calendario-azul' : 'evento-calendario-naranja',
            extendedProps: { item }
          };
        });

        this.calendarOptions = { ...this.calendarOptions, events };
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorMsg.set('No se pudieron cargar los datos del área personal.');
        this.isLoading.set(false);
      }
    });
  }

  navegarA(item: ItemPendiente) {
    if (item.cursoRef) this.cursosService.cursoSeleccionado.set(item.cursoRef);
    if (item.asignaturaRef) this.asignaturasService.asignaturaSeleccionada.set(item.asignaturaRef);
    if (item.temaRef) this.temasService.temaSeleccionado.set(item.temaRef);
    if (item.tareaRef) this.temasService.tareaSeleccionada.set(item.tareaRef);
    if (item.examenRef) this.temasService.examenSeleccionado.set(item.examenRef);

    this.router.navigateByUrl(item.url);
  }

  handleEventClick(arg: any): void {
    const item: ItemPendiente = arg.event.extendedProps['item'];
    if (item) {
      this.navegarA(item);
    }
  }
}
