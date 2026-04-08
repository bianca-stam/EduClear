import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {LucideAngularModule, LucideSearch, LucideShuffle} from 'lucide-angular';
import {TableService} from '@core/services/table.service';
import {FormsModule} from '@angular/forms';
import {CustomPagination} from '@app/components/custom-pagination';
import {NgIcon} from '@ng-icons/core';
import {currency} from '@/app/constants';
import {RouterLink} from '@angular/router';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CountUpModule} from 'ngx-countup';

const user2 = '/assets/images/users/user-2.jpg'
const user3 = '/assets/images/users/user-3.jpg'
const user4 = '/assets/images/users/user-4.jpg'
const user5 = '/assets/images/users/user-5.jpg'
const user6 = '/assets/images/users/user-6.jpg'
const user7 = '/assets/images/users/user-7.jpg'
const user8 = '/assets/images/users/user-8.jpg'
const user9 = '/assets/images/users/user-9.jpg'
const user10 = '/assets/images/users/user-10.jpg'

const googleLogo = '/assets/images/logos/google.svg'
const microsoftLogo = '/assets/images/logos/microsoft.svg'
const amazonLogo = '/assets/images/logos/amazon.svg'
const appleLogo = '/assets/images/logos/apple.svg'
const dropboxLogo = '/assets/images/logos/dropbox.svg'
const slackLogo = '/assets/images/logos/slack.svg'
const spotifyLogo = '/assets/images/logos/spotify.svg'
const airbnbLogo = '/assets/images/logos/airbnb.svg'
const asanaLogo = '/assets/images/logos/asana.svg'


type LeadType = {
    id: string;
    customer: string;
    company: string;
    logo: string;
    email: string;
    phone: string;
    amount: number;
    tag: { label: string; color: string };
    assigned: { avatar: string; name: string };
    status: string;
    statusVariant: string;
    created: string;
    selected?: boolean;
};

@Component({
    selector: 'app-leads',
    imports: [
        PageTitle,
        AsyncPipe,
        FormsModule,
        LucideAngularModule,
        CustomPagination,
        NgIcon,
        RouterLink,
        NgbdSortableHeader,
        CountUpModule
    ],
    providers: [TableService],
    templateUrl: './leads.html',
    styles: ``
})
export class Leads implements OnInit {
    leadStats = [
        {label: "New", count: 547,},
        {label: "Contacted", count: 469.2, suffix: "k"},
        {label: "Qualified", count: 105, suffix: "k"},
        {label: "Proposal Sent", count: 2.84, suffix: "k"},
        {label: "Customers", count: 4.98, variant: "success", suffix: "k"},
        {label: "Lost Leads", count: 2.05, variant: "danger", suffix: "k"},
    ];

    private modalService = inject(NgbModal);

    openLeadModal(content: TemplateRef<any>) {
        this.modalService.open(content, {size: 'lg'});
    }

    selectAll = false;

    searchTerm = '';
    filterStatus = '';

    leads$: Observable<LeadType[]>;
    total$: Observable<number>;

    constructor(public tableService: TableService<LeadType>) {
        this.leads$ = this.tableService.items$;
        this.total$ = this.tableService.total$;
    }

    ngOnInit(): void {
        this.tableService.setItems(structuredClone(this.leadsData), 8);
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

    protected readonly LucideSearch = LucideSearch;
    protected readonly LucideShuffle = LucideShuffle;

    leadsData: LeadType[] = [
        {
            id: '#LD007842',
            customer: 'R. Thompson',
            company: 'Amazon Web Services',
            logo: amazonLogo,
            email: 'contact@aws.com',
            phone: '+1 206-555-0199',
            amount: 150000,
            tag: {label: 'Cloud', color: 'info'},
            assigned: {avatar: user10, name: 'Emily Carter'},
            status: 'In Progress',
            statusVariant: 'success',
            created: '12 Jul, 2025',
        },
        {
            id: '#LD007865',
            customer: 'S. Kapoor',
            company: 'Microsoft',
            logo: microsoftLogo,
            email: 's.kapoor@microt.com',
            phone: '+44 20 7946 0991',
            amount: 98500,
            tag: {label: 'AI', color: 'warning'},
            assigned: {avatar: user2, name: 'Liam Brown'},
            status: 'Proposal Sent',
            statusVariant: 'primary',
            created: '21 Jul, 2025',
        },
        {
            id: '#LD007866',
            customer: 'A. Patel',
            company: 'Google',
            logo: googleLogo,
            email: 'amit.patel@google.com',
            phone: '+1 650-253-0000',
            amount: 120000,
            tag: {label: 'Cloud', color: 'success'},
            assigned: {avatar: user3, name: 'Emily Wang'},
            status: 'Follow Up',
            statusVariant: 'info',
            created: '22 Jul, 2025',
        },
        {
            id: '#LD007867',
            customer: 'J. Fernandes',
            company: 'Airbnb Inc',
            logo: airbnbLogo,
            email: 'j.fernandes@adobe.com',
            phone: '+1 408-536-6000',
            amount: 65000,
            tag: {label: 'Design', color: 'danger'},
            assigned: {avatar: user4, name: 'Sara Kim'},
            status: 'Pending',
            statusVariant: 'warning',
            created: '23 Jul, 2025',
        },
        {
            id: '#LD007868',
            customer: 'M. Zhang',
            company: 'Apple Platforms',
            logo: appleLogo,
            email: 'ming.zhang@apple.com',
            phone: '+1 650-308-7300',
            amount: 142000,
            tag: {label: 'VR', color: 'secondary'},
            assigned: {avatar: user5, name: 'David Li'},
            status: 'In Progress',
            statusVariant: 'success',
            created: '23 Jul, 2025',
        },
        {
            id: '#LD007869',
            customer: 'N. Sharma',
            company: 'Asana',
            logo: asanaLogo,
            email: 'n.sharma@netflix.com',
            phone: '+1 408-540-3700',
            amount: 75500,
            tag: {label: 'Streaming', color: 'info'},
            assigned: {avatar: user6, name: 'Natalie Jones'},
            status: 'Rejected',
            statusVariant: 'danger',
            created: '24 Jul, 2025',
        },
        {
            id: '#LD007870',
            customer: 'K. Williams',
            company: 'Dropbox',
            logo: dropboxLogo,
            email: 'k.williams@tesila.com',
            phone: '+1 310-420-6600',
            amount: 110250,
            tag: {label: 'EV', color: 'dark'},
            assigned: {avatar: user7, name: 'Kevin Nguyen'},
            status: 'Negotiation',
            statusVariant: 'secondary',
            created: '24 Jul, 2025',
        },
        {
            id: '#LD007871',
            customer: 'L. Mehra',
            company: 'Airbnb',
            logo: airbnbLogo,
            email: 'l.mehra@airbnb.com',
            phone: '+1 415-555-0102',
            amount: 87000,
            tag: {label: 'Travel', color: 'danger'},
            assigned: {avatar: user8, name: 'Laura Mehra'},
            status: 'Proposal Sent',
            statusVariant: 'primary',
            created: '24 Jul, 2025',
        },
        {
            id: '#LD007872',
            customer: 'R. Iyer',
            company: 'Slack',
            logo: slackLogo,
            email: 'r.iyer@slackhq.com',
            phone: '+1 628-555-0111',
            amount: 332000,
            tag: {label: 'Collaboration', color: 'info'},
            assigned: {avatar: user9, name: 'Rohan Iyer'},
            status: 'In Progress',
            statusVariant: 'success',
            created: '24 Jul, 2025',
        },
        {
            id: '#LD007873',
            customer: 'E. Fernandez',
            company: 'Spotify',
            logo: spotifyLogo,
            email: 'emma.f@spotify.com',
            phone: '+46 31 123 456',
            amount: 917000,
            tag: {label: 'Music', color: 'success'},
            assigned: {avatar: user10, name: 'Emma Fernandez'},
            status: 'Pending',
            statusVariant: 'warning',
            created: '25 Jul, 2025',
        },
    ]
    protected readonly currency = currency;
}
