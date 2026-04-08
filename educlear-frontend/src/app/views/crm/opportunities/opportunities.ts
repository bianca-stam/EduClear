import {Component, OnInit} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {TableService} from '@core/services/table.service';
import {Observable} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, CommonModule, NgClass} from '@angular/common';
import {LucideAlertCircle, LucideAngularModule, LucideCheckCircle, LucideSearch, LucideShuffle} from 'lucide-angular';
import {CustomPagination} from '@app/components/custom-pagination';

const user1 = '/assets/images/users/user-1.jpg'
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
const starbucksLogo = '/assets/images/logos/starbucks.svg'
const airbnbLogo = '/assets/images/logos/airbnb.svg'


export type OpportunitiesType = {
    id: string
    productName: string
    productBy: string
    productLogo: string
    customerName: string
    customerEmail: string
    customerAvatar: string
    stage: string
    amount: string
    closeDate: string
    source: string
    owner: string
    status: "open" | "in-progress" | "closed"
    priority: "low" | "medium" | "high"
}

@Component({
    selector: 'app-opportunities',
    imports: [
        PageTitle,
        LucideAngularModule,
        AsyncPipe,
        CustomPagination,
        FormsModule,
        NgClass
    ],
    providers: [TableService,FormsModule,CommonModule,LucideAngularModule],
    templateUrl: './opportunities.html',
    styles: ``
})
export class Opportunities implements OnInit{

    selectAll = false;
    filterStage = 'All';
    filterStatus = 'All';
    filterPriority = 'All';

    opportunities$: Observable<OpportunitiesType[]>;
    total$: Observable<number>;

    constructor(public tableService: TableService<OpportunitiesType>) {
        this.opportunities$ = this.tableService.items$;
        this.total$ = this.tableService.total$;
    }

    ngOnInit(): void {
        this.tableService.setItems(this.opportunities, 8);
    }




    protected readonly LucideSearch = LucideSearch;
    protected readonly LucideShuffle = LucideShuffle;
    protected readonly LucideCheckCircle = LucideCheckCircle;
    protected readonly LucideAlertCircle = LucideAlertCircle;


    opportunities: OpportunitiesType[] = [
        {
            id: '#OP007501',
            productName: 'Website Redesign Deal',
            productBy: 'Google Inc.',
            productLogo: googleLogo,
            customerName: 'John Carter',
            customerEmail: 'john@acme.com',
            customerAvatar: user1,
            stage: 'Proposal Sent',
            amount: '$12,500',
            closeDate: '15 Aug, 2025',
            source: 'Referral',
            owner: 'Sarah Johnson',
            status: 'open',
            priority: 'high',
        },
        {
            id: '#OP007502',
            productName: 'Enterprise SaaS Suite',
            productBy: 'Microsoft Corp.',
            productLogo: microsoftLogo,
            customerName: 'Priya Mehta',
            customerEmail: 'priya@globex.com',
            customerAvatar: user2,
            stage: 'Qualification',
            amount: '$50,000',
            closeDate: '10 Sep, 2025',
            source: 'LinkedIn',
            owner: 'Michael ih-p',
            status: 'in-progress',
            priority: 'medium',
        },
        {
            id: '#OP009123',
            productName: 'Cloud Analytics Pro',
            productBy: 'Google LLC',
            productLogo: googleLogo,
            customerName: 'Aarav Patel',
            customerEmail: 'aarav@nextgen.io',
            customerAvatar: user5,
            stage: 'Negotiation',
            amount: '$75,000',
            closeDate: '18 Oct, 2025',
            source: 'Website',
            owner: 'Sophia Lee',
            status: 'closed',
            priority: 'low',
        },
        {
            id: '#OP009201',
            productName: 'Retail Insights Pro',
            productBy: 'Amazon Inc.',
            productLogo: amazonLogo,
            customerName: 'Meena Roy',
            customerEmail: 'meena@retailhub.io',
            customerAvatar: user3,
            stage: 'Won',
            amount: '$92,000',
            closeDate: '02 Nov, 2025',
            source: 'Email',
            owner: 'Daniel Kim',
            status: 'closed',
            priority: 'high',
        },
        {
            id: '#OP009202',
            productName: 'AI Compute Suite',
            productBy: 'Apple Inc.',
            productLogo: appleLogo,
            customerName: 'Kabir Shah',
            customerEmail: 'kabir@aicore.ai',
            customerAvatar: user7,
            stage: 'Qualification',
            amount: '$64,500',
            closeDate: '15 Oct, 2025',
            source: 'Referral',
            owner: 'Emily Davis',
            status: 'open',
            priority: 'high',
        },
        {
            id: '#OP009203',
            productName: 'Ad Manager Pro',
            productBy: 'Dropbox',
            productLogo: dropboxLogo,
            customerName: 'Sana Iqbal',
            customerEmail: 'sana@adstack.com',
            customerAvatar: user4,
            stage: 'Won',
            amount: '$120,000',
            closeDate: '09 Dec, 2025',
            source: 'LinkedIn',
            owner: 'John Carter',
            status: 'closed',
            priority: 'low',
        },
        {
            id: '#OP009204',
            productName: 'TeamCollab Enterprise',
            productBy: 'Slack Technologies',
            productLogo: slackLogo,
            customerName: 'Jatin Desai',
            customerEmail: 'jatin@collabzone.net',
            customerAvatar: user6,
            stage: 'Proposal Sent',
            amount: '$48,000',
            closeDate: '30 Sep, 2025',
            source: 'Webinar',
            owner: 'Ashley Mio-p',
            status: 'in-progress',
            priority: 'low',
        },
        {
            id: '#OP009205',
            productName: 'Virtual Events Suite',
            productBy: 'Spotify Inc.',
            productLogo: spotifyLogo,
            customerName: 'Lina George',
            customerEmail: 'lina@meetpro.io',
            customerAvatar: user8,
            stage: 'Lost',
            amount: '$33,000',
            closeDate: '22 Oct, 2025',
            source: 'Cold Call',
            owner: 'Mark Evans',
            status: 'closed',
            priority: 'medium',
        },
        {
            id: '#OP009312',
            productName: 'Streamlytics Dashboard',
            productBy: 'Starbucks Inc.',
            productLogo: starbucksLogo,
            customerName: 'Ravi Khanna',
            customerEmail: 'ravi@streamlytics.co',
            customerAvatar: user10,
            stage: 'Qualification',
            amount: '$58,900',
            closeDate: '05 Nov, 2025',
            source: 'Trade Show',
            owner: 'Jessica Moore',
            status: 'in-progress',
            priority: 'high',
        },
        {
            id: '#OP009313',
            productName: 'Hospitality CRM Suite',
            productBy: 'Airbnb Inc.',
            productLogo: airbnbLogo,
            customerName: 'Isabella Wang',
            customerEmail: 'isabella@aircrm.com',
            customerAvatar: user9,
            stage: 'Proposal Sent',
            amount: '$41,200',
            closeDate: '12 Nov, 2025',
            source: 'Inbound',
            owner: 'Thomas Blake',
            status: 'open',
            priority: 'medium',
        },
    ]
}
