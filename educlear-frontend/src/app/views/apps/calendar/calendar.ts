import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {FullCalendarComponent, FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions, EventApi, EventClickArg} from '@fullcalendar/core';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'
import {FormsModule} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgIcon} from '@ng-icons/core';
import {SimplebarAngularModule} from 'simplebar-angular';

@Component({
    selector: 'app-calendar',
    imports: [
        PageTitle,
        FullCalendarModule,
        FormsModule,

        NgIcon,
        SimplebarAngularModule
    ],
    templateUrl: './calendar.html',
    styles: ``
})
export class Calendar implements OnInit {
    @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
    @ViewChild('eventModal') eventModal!: TemplateRef<any>;

    currentEventTitle: string = '';
    currentEventVariant: string = '';
    currentEditingEvent: EventApi | null = null;
    modalRef!: NgbModalRef;
    selectedDate: Date | null = null;

    defaultEvents = [
        {
            id: '1',
            title: 'Design Review',
            start: new Date(),
            end: new Date(),
            className: 'bg-primary-subtle text-primary'
        },
        {
            id: '2',
            title: 'Marketing Strategy',
            start: new Date(Date.now() + 16000000),
            end: new Date(Date.now() + 20000000),
            className: 'bg-secondary-subtle text-secondary'
        },
        {
            id: '3',
            title: 'Sales Demo',
            start: new Date(Date.now() + 40000000),
            end: new Date(Date.now() + 80000000),
            className: 'bg-success-subtle text-success'
        },
        {
            id: '4',
            title: 'Deadline Submission',
            start: new Date(Date.now() + 120000000),
            end: new Date(Date.now() + 180000000),
            className: 'bg-danger-subtle text-danger'
        },
        {
            id: '5',
            title: 'Training Session',
            start: new Date(Date.now() + 250000000),
            end: new Date(Date.now() + 290000000),
            className: 'bg-info-subtle text-info'
        },
        {
            id: '6',
            title: 'Budget Review',
            start: new Date(Date.now() + 400000000),
            end: new Date(Date.now() + 450000000),
            className: 'bg-warning-subtle text-warning'
        },
        {
            id: '7',
            title: 'Board Meeting',
            start: new Date(Date.now() + 600000000),
            end: new Date(Date.now() + 620000000),
            className: 'bg-dark-subtle text-dark'
        }
    ];

    externalEvents = [
        { id: '11', title: 'Design Review', variant: 'primary' },
        { id: '12', title: 'Marketing Strategy', variant: 'secondary' },
        { id: '13', title: 'Sales Demo', variant: 'success' },
        { id: '14', title: 'Deadline Submission', variant: 'danger' },
        { id: '15', title: 'Training Session', variant: 'info' },
        { id: '16', title: 'Budget Review', variant: 'warning' },
        { id: '17', title: 'Board Meeting', variant: 'dark' },
    ]


    calendarOptions!: CalendarOptions;

    constructor(private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.calendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
            initialView: 'dayGridMonth',
            themeSystem: 'bootstrap',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
            },
            buttonText: {
                today: 'Today',
                month: 'Month',
                week: 'Week',
                day: 'Day',
                list: 'List',
                prev: 'Prev',
                next: 'Next',
            },
            slotDuration: '00:30:00',
            slotMinTime: '07:00:00',
            slotMaxTime: '19:00:00',

            height: window.innerHeight - 240,
            editable: true,
            droppable: true,
            selectable: true,
            events: this.defaultEvents,
            dateClick: this.handleDateClick.bind(this),
            eventClick: this.handleEventClick.bind(this),
            eventDidMount: (info) => {
                const variant = info.event.extendedProps['variant'];
                if (variant) {
                    const el = info.el;
                    el.classList.add(
                        `bg-${variant}-subtle`,
                        `text-${variant}`,
                    );
                }
            }
        };
    }

    ngAfterViewInit(): void {
        const containerEl = document.getElementById('external-events');
        if (containerEl) {
            new Draggable(containerEl, {
                itemSelector: '.external-event',
                eventData: function (eventEl) {
                    const title = eventEl.innerText.trim();
                    const variant = eventEl.getAttribute('data-variant') || 'primary';
                    return {
                        title,
                        extendedProps: {variant}
                    };
                }
            });
        }
    }

    offsetDate(days: number): Date {
        return new Date(new Date().setDate(new Date().getDate() + days));
    }

    handleDateClick(arg: any): void {
        this.selectedDate = arg.date;
        this.openModal();
    }

    handleEventClick(arg: EventClickArg): void {
        this.openModal(arg.event);
    }


    openModal(event?: EventApi): void {
        this.currentEditingEvent = event || null;
        this.currentEventTitle = event?.title || '';
        this.currentEventVariant = event?.extendedProps['variant'] || 'primary';
        this.modalRef = this.modalService.open(this.eventModal, {centered: true});
    }

    saveEvent(): void {
        if (!this.currentEventTitle || !this.currentEventVariant) return;
        const calendarApi = this.calendarComponent.getApi();

        if (this.currentEditingEvent) {
            const oldEvent = this.currentEditingEvent.toPlainObject();
            this.currentEditingEvent.remove();
            calendarApi.addEvent({
                ...oldEvent,
                title: this.currentEventTitle,
                extendedProps: {
                    variant: this.currentEventVariant
                }
            });
        } else {
            calendarApi.addEvent({
                id: String(Date.now()),
                title: this.currentEventTitle,
                start: this.selectedDate ?? new Date(),
                allDay: true,
                extendedProps: {
                    variant: this.currentEventVariant
                }
            });
        }

        this.modalRef.close();
        this.selectedDate = null;
        this.currentEventVariant = '';
    }

    deleteEvent(): void {
        this.currentEditingEvent?.remove();
        this.modalRef.close();
        this.selectedDate = null;
        this.currentEventVariant = '';
    }
}
