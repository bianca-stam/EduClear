import { Component } from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {ContactCard} from '@/app/views/crm/contacts/components/contact-card';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';

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


type ContactType = {
    id: number
    name: string
    description: string
    email: string
    phone: string
    avatar?: string
    label: {
        text: string
        variant: string
    }
    categories: {
        name: string
        variant: string
    }[]
    stats: {
        title: string
        count: number
        prefix?: string
        suffix?: string
    }[]
}

@Component({
  selector: 'app-contacts',
    imports: [
        PageTitle,
        ContactCard,
        NgbPagination
    ],
  templateUrl: './contacts.html',
  styles: ``
})
export class Contacts {
     contacts: ContactType[] = [
        {
            id: 1,
            name: 'Emily Ross',
            email: 'emily.ross@greentech.com',
            phone: '+44 7911 112233',
            avatar: user1,
            label: { text: 'Prospect', variant: 'success' },
            description: 'Marketing Director at GreenTech',
            categories: [
                { name: 'Eco', variant: 'info' },
                { name: 'Newsletter', variant: 'light' },
                { name: 'Follow-up', variant: 'secondary' },
            ],
            stats: [
                { title: 'Posts', count: 98 },
                { title: 'Followers', count: 12.5, suffix: 'k' },
                { title: 'Followings', count: 860 },
            ],
        },
        {
            id: 2,
            name: 'Ava Mitchell',
            email: 'ava.mitchell@novaxlabs.com',
            phone: '+1 347 445 8890',
            avatar: user2,
            label: { text: 'Cold Lead', variant: 'info' },
            description: 'Product Strategist at NovaX Labs',
            categories: [
                { name: 'Technology', variant: 'primary' },
                { name: 'Outbound', variant: 'light' },
                { name: 'Low Engagement', variant: 'danger' },
            ],
            stats: [
                { title: 'Total Value', count: 4.2, suffix: 'k', prefix: '$' },
                { title: 'Open Deal', count: 1 },
                { title: 'Meetings', count: 0 },
            ],
        },
        {
            id: 3,
            name: 'Noah Johnson',
            email: 'noah.j@urbanmart.com',
            phone: '+1 212 776 2233',
            avatar: user3,
            label: { text: 'Hot Lead', variant: 'warning' },
            description: 'Sales Manager at UrbanMart',
            categories: [
                { name: 'Retail', variant: 'success' },
                { name: 'In-Person', variant: 'secondary' },
                { name: 'Urgent', variant: 'danger' },
            ],
            stats: [
                { title: 'Revenue', count: 12, suffix: 'k', prefix: '$' },
                { title: 'Open Deals', count: 3 },
                { title: 'Meetings', count: 5 },
            ],
        },
        {
            id: 4,
            name: 'Olivia Carter',
            email: 'olivia.carter@medisync.com',
            phone: '+44 20 7946 1000',
            avatar: user4,
            label: { text: 'Customer', variant: 'primary' },
            description: 'Operations Head at MediSync',
            categories: [
                { name: 'Healthcare', variant: 'danger' },
                { name: 'Newsletter', variant: 'secondary' },
                { name: 'Retention', variant: 'info' },
            ],
            stats: [
                { title: 'Tickets', count: 38 },
                { title: 'Resolved', count: 35 },
                { title: 'Pending', count: 3 },
            ],
        },
        {
            id: 5,
            name: 'Liam Brown',
            email: 'liam.brown@finverse.com',
            phone: '+1 415 901 8899',
            avatar: user5,
            label: { text: 'VIP', variant: 'danger' },
            description: 'Chief Finance Officer at Finverse',
            categories: [
                { name: 'Finance', variant: 'success' },
                { name: 'Investment', variant: 'primary' },
                { name: 'High Value', variant: 'danger' },
            ],
            stats: [
                { title: 'Transactions', count: 150 },
                { title: 'Value', count: 2.5, suffix: 'M', prefix: '$' },
                { title: 'Pending', count: 12 },
            ],
        },
        {
            id: 6,
            name: 'Sophia White',
            email: 'sophia.white@aerolite.com',
            phone: '+61 2 8890 4455',
            label: { text: 'Prospect', variant: 'success' },
            description: 'Project Manager at AeroLite',
            categories: [
                { name: 'Aerospace', variant: 'secondary' },
                { name: 'Follow-up', variant: 'info' },
            ],
            stats: [
                { title: 'Projects', count: 6 },
                { title: 'On Hold', count: 2 },
                { title: 'Active', count: 4 },
            ],
        },
        {
            id: 7,
            name: 'Ethan Walker',
            email: 'ethan.walker@nextgenai.com',
            phone: '+1 202 555 0181',
            avatar: user6,
            label: { text: 'Customer', variant: 'primary' },
            description: 'AI Engineer at NextGen AI',
            categories: [
                { name: 'Technology', variant: 'primary' },
                { name: 'Newsletter', variant: 'light' },
                { name: 'Loyal', variant: 'success' },
            ],
            stats: [
                { title: 'Models', count: 12 },
                { title: 'Deployed', count: 8 },
                { title: 'In Progress', count: 4 },
            ],
        },
        {
            id: 8,
            name: 'Mia Green',
            email: 'mia.green@biozen.com',
            phone: '+1 646 445 7788',
            avatar: user7,
            label: { text: 'Cold Lead', variant: 'info' },
            description: 'Research Scientist at BioZen',
            categories: [
                { name: 'Biotech', variant: 'success' },
                { name: 'Outbound', variant: 'secondary' },
            ],
            stats: [
                { title: 'Experiments', count: 45 },
                { title: 'Successful', count: 39 },
                { title: 'Failed', count: 6 },
            ],
        },
        {
            id: 9,
            name: 'James Wilson',
            email: 'james.wilson@buildmate.com',
            phone: '+44 161 555 2299',
            avatar: user8,
            label: { text: 'Prospect', variant: 'success' },
            description: 'Site Engineer at BuildMate',
            categories: [
                { name: 'Construction', variant: 'danger' },
                { name: 'Field', variant: 'secondary' },
            ],
            stats: [
                { title: 'Sites', count: 22 },
                { title: 'Completed', count: 17 },
                { title: 'Pending', count: 5 },
            ],
        },
        {
            id: 10,
            name: 'Isabella Martinez',
            email: 'isabella.m@creativespark.com',
            phone: '+1 213 555 9876',
            avatar: user9,
            label: { text: 'Hot Lead', variant: 'warning' },
            description: 'Creative Director at CreativeSpark',
            categories: [
                { name: 'Design', variant: 'info' },
                { name: 'Media', variant: 'secondary' },
            ],
            stats: [
                { title: 'Campaigns', count: 15 },
                { title: 'Successful', count: 12 },
                { title: 'Ongoing', count: 3 },
            ],
        },
        {
            id: 11,
            name: 'Benjamin Clark',
            email: 'ben.clark@healthplus.com',
            phone: '+1 917 445 3344',
            avatar: user10,
            label: { text: 'Customer', variant: 'primary' },
            description: 'CTO at HealthPlus',
            categories: [
                { name: 'Healthcare', variant: 'danger' },
                { name: 'Retention', variant: 'info' },
                { name: 'VIP', variant: 'success' },
            ],
            stats: [
                { title: 'Tickets', count: 87 },
                { title: 'Resolved', count: 82 },
                { title: 'Pending', count: 5 },
            ],
        },
        {
            id: 12,
            name: 'Charlotte King',
            email: 'charlotte.king@edusmart.com',
            phone: '+1 646 556 2211',
            label: { text: 'VIP', variant: 'danger' },
            description: 'Founder of EduSmart',
            categories: [
                { name: 'Education', variant: 'primary' },
                { name: 'High Value', variant: 'danger' },
            ],
            stats: [
                { title: 'Students', count: 20, suffix: 'k' },
                { title: 'Courses', count: 48 },
                { title: 'Mentors', count: 15 },
            ],
        },
    ]
}
