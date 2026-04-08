import { Component } from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {TicketStatisticWidget} from '@/app/views/apps/support-center/ticket-list/components/ticket-statistic-widget';
import {TicketStatisticType, TicketType} from '@/app/views/apps/support-center/ticket-list/types';
import { LucideAngularModule, LucideSearch, LucideShuffle, LucideAlertTriangle } from 'lucide-angular';
import {Observable} from 'rxjs';
import {toTitleCase} from '@/app/utils/string-utils';
import {TableService} from '@core/services/table.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {AsyncPipe, NgClass} from '@angular/common';
import {CustomPagination} from '@app/components/custom-pagination';
import {NgIcon} from '@ng-icons/core';
@Component({
  selector: 'app-ticket-list',
    imports: [
        PageTitle,
        TicketStatisticWidget,
        FormsModule,
        LucideAngularModule,
        RouterLink,
        NgbdSortableHeader,
        AsyncPipe,
        NgClass,
        CustomPagination,
        NgIcon
    ],
    providers: [TableService],
  templateUrl: './ticket-list.html',
  styles: ``
})
export class TicketList {
    protected readonly LucideSearch = LucideSearch;
    protected readonly LucideShuffle = LucideShuffle;
    protected readonly LucideAlertTriangle = LucideAlertTriangle;

    selectAll = false;

    filterStatus = '';
    filterPriority = '';

    tickets$: Observable<TicketType[]>;
    total$: Observable<number>;

    constructor(public tableService: TableService<TicketType>) {
        this.tickets$ = this.tableService.items$;
        this.total$ = this.tableService.total$;
    }

    ngOnInit(): void {
        this.tableService.setItems(this.tickets, 8);
    }

    toggleAllSelection() {
        this.tableService.setAllSelection(this.selectAll);
    }

    toggleSingleSelection() {
        this.tableService.items$.subscribe(items => {
            this.selectAll = items.every((item: any) => item.selected);
        }).unsubscribe();
    }

    deleteSelected() {
        this.tableService.deleteSelectedItems();
        this.selectAll = false;
    }

    get hasSelection(): boolean {
        return this.tableService.hasSelectedItems();
    }

    protected readonly toTitleCase = toTitleCase;

    tickets: TicketType[] = [
        {
            id: '#SUP-2451',
            requestedBy: 'Emily Clark',
            requestedByImg: "assets/images/users/user-3.jpg",
            subject: 'Unable to login with 2FA',
            agent: 'Daniel Ray',
            agentImg: "assets/images/users/user-2.jpg",
            priority: 'High',
            status: 'Pending',
            createdAt: '04 Aug, 2025',
            createdAtTime: '11:30 AM',
            dueDate: '08 Aug, 2025',
        },
        {
            id: '#SUP-2517',
            requestedBy: 'Lucas Graham',
            requestedByImg: "assets/images/users/user-9.jpg",
            subject: 'Cannot upload profile image',
            agent: 'Sarah Lee',
            agentImg: "assets/images/users/user-1.jpg",
            priority: 'Medium',
            status: 'In Progress',
            createdAt: '05 Aug, 2025',
            createdAtTime: '2:05 PM',
            dueDate: '10 Aug, 2025',
        },
        {
            id: '#SUP-2518',
            requestedBy: 'Nina Patel',
            requestedByImg: "assets/images/users/user-4.jpg",
            subject: 'Incorrect invoice total shown',
            agent: 'Alex Morgan',
            agentImg: "assets/images/users/user-8.jpg",
            priority: 'High',
            status: 'Pending',
            createdAt: '05 Aug, 2025',
            createdAtTime: '10:42 AM',
            dueDate: '07 Aug, 2025',
        },
        {
            id: '#SUP-2519',
            requestedBy: 'Michael Foster',
            requestedByImg: "assets/images/users/user-6.jpg",
            subject: 'Website not loading on Safari',
            agent: 'Jessica Hughes',
            agentImg: "assets/images/users/user-5.jpg",
            priority: 'Low',
            status: 'Resolved',
            createdAt: '04 Aug, 2025',
            createdAtTime: '6:20 PM',
            dueDate: '06 Aug, 2025',
        },
        {
            id: '#SUP-2520',
            requestedBy: 'Isabella Reed',
            requestedByImg: "assets/images/users/user-7.jpg",
            subject: 'Cannot change account email',
            agent: 'Daniel Ray',
            agentImg: "assets/images/users/user-2.jpg",
            priority: 'Medium',
            status: 'In Progress',
            createdAt: '03 Aug, 2025',
            createdAtTime: '9:50 AM',
            dueDate: '08 Aug, 2025',
        },
        {
            id: '#SUP-2521',
            requestedBy: 'Olivia White',
            requestedByImg: "assets/images/users/user-1.jpg",
            subject: "Can't access dashboard after update",
            agent: 'James Carter',
            agentImg: "assets/images/users/user-9.jpg",
            priority: 'High',
            status: 'Escalated',
            createdAt: '05 Aug, 2025',
            createdAtTime: '7:45 AM',
            dueDate: '06 Aug, 2025',
        },
        {
            id: '#SUP-2522',
            requestedBy: 'Emma King',
            requestedByImg: "assets/images/users/user-10.jpg",
            subject: 'Feature request: export as PDF',
            agent: 'Harper Wells',
            agentImg: "assets/images/users/user-3.jpg",
            priority: 'Low',
            status: 'Closed',
            createdAt: '01 Aug, 2025',
            createdAtTime: '4:10 PM',
            dueDate: '05 Aug, 2025',
        },
        {
            id: '#SUP-2523',
            requestedBy: 'Ava Sullivan',
            requestedByImg: "assets/images/users/user-1.jpg",
            subject: 'App freezes when uploading files',
            agent: 'Liam Brooks',
            agentImg: "assets/images/users/user-4.jpg",
            priority: 'High',
            status: 'Pending',
            createdAt: '05 Aug, 2025',
            createdAtTime: '1:20 PM',
            dueDate: '09 Aug, 2025',
        },
        {
            id: '#SUP-2524',
            requestedBy: 'Sophie Bennett',
            requestedByImg: "assets/images/users/user-3.jpg",
            subject: 'Missing transaction history',
            agent: 'Lucas Shaw',
            agentImg: "assets/images/users/user-6.jpg",
            priority: 'Medium',
            status: 'In Progress',
            createdAt: '04 Aug, 2025',
            createdAtTime: '4:30 PM',
            dueDate: '08 Aug, 2025',
        },
        {
            id: '#SUP-2525',
            requestedBy: 'Noah Allen',
            requestedByImg: "assets/images/users/user-4.jpg",
            subject: 'Feedback form submission error',
            agent: 'Sophia Reed',
            agentImg: "assets/images/users/user-5.jpg",
            priority: 'Low',
            status: 'Resolved',
            createdAt: '03 Aug, 2025',
            createdAtTime: '12:00 PM',
            dueDate: '06 Aug, 2025',
        },
        {
            id: '#SUP-2526',
            requestedBy: 'Ethan James',
            requestedByImg: "assets/images/users/user-5.jpg",
            subject: "Can't generate report summary",
            agent: 'Chloe Adams',
            agentImg: "assets/images/users/user-7.jpg",
            priority: 'High',
            status: 'Escalated',
            createdAt: '05 Aug, 2025',
            createdAtTime: '8:50 AM',
            dueDate: '07 Aug, 2025',
        },
        {
            id: '#SUP-2527',
            requestedBy: 'Grace Carter',
            requestedByImg: "assets/images/users/user-8.jpg",
            subject: 'Feature request: Dark mode toggle',
            agent: 'Daniel Ray',
            agentImg: "assets/images/users/user-2.jpg",
            priority: 'Low',
            status: 'Closed',
            createdAt: '02 Aug, 2025',
            createdAtTime: '5:25 PM',
            dueDate: '06 Aug, 2025',
        },
    ]

    ticketsData: TicketStatisticType[] = [
        {
            id: 1,
            title: 'Open Tickets',
            value: 148,
            icon: 'tablerTicket',
            bgColor: 'bg-primary-subtle',
            textColor: 'text-primary',
        },
        {
            id: 2,
            title: 'Resolved Tickets',
            value: 1289,
            icon: 'tablerCheck',
            bgColor: 'bg-success-subtle',
            textColor: 'text-success',
        },
        {
            id: 3,
            title: 'Pending Tickets',
            value: 93,
            icon: 'tablerHourglass',
            bgColor: 'bg-info-subtle',
            textColor: 'text-info',
        },
        {
            id: 4,
            title: 'Escalated Tickets',
            value: 25,
            icon: 'tablerAlertTriangle',
            bgColor: 'bg-danger-subtle',
            textColor: 'text-danger',
        },
    ];

}
