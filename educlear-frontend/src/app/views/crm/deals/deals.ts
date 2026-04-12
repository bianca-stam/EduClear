import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LucideAngularModule, LucideSearch, LucideShuffle} from 'lucide-angular';
import {NgIcon} from '@ng-icons/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TableService} from '@core/services/table.service';
import {Observable} from 'rxjs';
import {PageTitle} from '@app/components/page-title';
import {DealType, DealWidgetType} from '@/app/views/crm/deals/types';
import {DealStatisticWidget} from '@/app/views/crm/deals/components/deal-statistic-widget';
import {CustomPagination} from '@app/components/custom-pagination';
import {FlatpickrDirective} from 'angularx-flatpickr';
import {currency} from '@/app/constants';
import { RouterLink } from '@angular/router';

const googleLogo = '/assets/images/logos/google.svg'
const appleLogo = '/assets/images/logos/apple.svg'
const dropboxLogo = '/assets/images/logos/dropbox.svg'
const slackLogo = '/assets/images/logos/slack.svg'
const starbucksLogo = '/assets/images/logos/starbucks.svg'
const airbnbLogo = '/assets/images/logos/airbnb.svg'
const openaiLogo = '/assets/images/logos/openai.svg'
const shellLogo = '/assets/images/logos/shell.svg'
const figmaLogo = '/assets/images/logos/figma.svg'
const asanaLogo = '/assets/images/logos/asana.svg'


@Component({
    selector: 'app-deals',
    imports: [
        PageTitle,
        DealStatisticWidget,
        FormsModule,
        LucideAngularModule,
        AsyncPipe,
        CustomPagination,
        NgIcon,
        FlatpickrDirective,
        RouterLink
    ],
    providers: [TableService],
    templateUrl: './deals.html',
    styles: ``
})
export class Deals implements OnInit {
    private modalService = inject(NgbModal);

    openDealModal(content: TemplateRef<any>) {
        this.modalService.open(content, {size: 'lg'});
    }

    selectAll = false;
    filterStage = 'All';
    filterAmountRange = '';

    deals$: Observable<DealType[]>;
    total$: Observable<number>;

    constructor(public tableService: TableService<DealType>) {
        this.deals$ = this.tableService.items$;
        this.total$ = this.tableService.total$;
    }

    ngOnInit(): void {
        this.tableService.setItems(structuredClone(this.deals), 8);
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

    buildProbBars(prob: number): string[] {
        const bars: string[] = [];
        const filledBars = Math.round((prob / 100) * 5); // 5 bars
        for (let i = 0; i < 5; i++) {
            if (i < filledBars) {
                bars.push('prob-bar bg-success opacity-100');
            } else if (i === filledBars) {
                bars.push('prob-bar bg-success opacity-50');
            } else {
                bars.push('prob-bar bg-success opacity-25');
            }
        }
        return bars;
    }

    protected readonly LucideSearch = LucideSearch;
    protected readonly LucideShuffle = LucideShuffle;


    deals: DealType[] = [
        {
            id: 1,
            name: 'Enterprise Software',
            company: 'Google Inc',
            logo: googleLogo,
            amount: 102000,
            stage: 'Proposal Sent',
            probability: 65,
            date: '15 Aug, 2025',
        },
        {
            id: 2,
            name: 'Marketing Automation',
            company: 'Airbnb',
            logo: airbnbLogo,
            amount: 85000,
            stage: 'Qualified',
            probability: 55,
            date: '10 Aug, 2025',
        },
        {
            id: 3,
            name: 'Cloud Storage Deal',
            company: 'Dropbox',
            logo: dropboxLogo,
            amount: 47000,
            stage: 'Negotiation',
            probability: 80,
            date: '18 Aug, 2025',
        },
        {
            id: 4,
            name: 'AI Chatbot Integration',
            company: 'OpenAI',
            logo: openaiLogo,
            amount: 59500,
            stage: 'Proposal Sent',
            probability: 65,
            date: '22 Aug, 2025',
        },
        {
            id: 5,
            name: 'eCommerce Platform',
            company: 'Apple',
            logo: appleLogo,
            amount: 71200,
            stage: 'Qualification',
            probability: 45,
            date: '25 Aug, 2025',
        },
        {
            id: 6,
            name: 'Sales CRM Deal',
            company: 'Shell',
            logo: shellLogo,
            amount: 95000,
            stage: 'Won',
            probability: 100,
            date: '30 Aug, 2025',
        },
        {
            id: 7,
            name: 'Video Conferencing License',
            company: 'Figma Inc',
            logo: figmaLogo,
            amount: 38000,
            stage: 'Lost',
            probability: 0,
            date: '12 Sep, 2025',
        },
        {
            id: 8,
            name: 'Customer Support Suite',
            company: 'Starbucks',
            logo: starbucksLogo,
            amount: 52000,
            stage: 'Proposal Sent',
            probability: 70,
            date: '03 Sep, 2025',
        },
        {
            id: 9,
            name: 'Project Management SaaS',
            company: 'Slack',
            logo: slackLogo,
            amount: 44000,
            stage: 'Negotiation',
            probability: 60,
            date: '06 Sep, 2025',
        },
        {
            id: 10,
            name: 'Data Visualization Tool',
            company: 'Asana',
            logo: asanaLogo,
            amount: 67300,
            stage: 'Qualified',
            probability: 50,
            date: '10 Sep, 2025',
        },
        {
            id: 11,
            name: 'Team Chat Platform',
            company: 'Slack',
            logo: slackLogo,
            amount: 62000,
            stage: 'Won',
            probability: 100,
            date: '15 Sep, 2025',
        },
    ]

    dealStatisticWidgets: DealWidgetType[] = [
        {
            count: '1,230',
            change: '9.85%',
            icon: "tablerArrowUp",
            title: 'Total deals created',
            progress: 9.85,
            variant: 'primary',
        },
        {
            count: '860',
            change: '5.20%',
            icon: "tablerArrowUp",
            title: 'Deals won',
            progress: 5.2,
            variant: 'success',
        },
        {
            count: '270',
            change: '2.45%',
            icon: "tablerArrowDown",
            title: 'Deals lost',
            progress: 2.45,
            variant: 'danger',
        },
        {
            count: '$220,000',
            change: 'Top value',
            icon: "tablerCurrencyDollar",
            title: 'Highest deal closed',
            progress: 100,
            variant: 'warning',
        },
        {
            count: '5.2 days',
            change: '+1.1%',
            icon: "tablerClock",
            title: 'Avg. close time',
            progress: 1.1,
            variant: 'secondary',
        },
    ]

    protected readonly currency = currency;
}
