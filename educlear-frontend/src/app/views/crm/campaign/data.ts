import {CrmStatisticWidgetType} from '@/app/types';

export type CampaignType = {
    id: string
    name: string
    creator: {
        name: string
        avatar: any
    }
    budget: string
    goals: string
    status: 'In Progress' | 'Success' | 'Scheduled' | 'Failed' | 'Ongoing'
    tags: string[]
    dateCreated: string
    dateCreatedTime: string
    selected?: boolean
}

export const campaigns: CampaignType[] = [
    {
        id: '1',
        name: 'Q4 Lead Nurture Campaign',
        creator: {name: 'Jason Miller', avatar: '/assets/images/users/user-5.jpg'},
        budget: '$12,500',
        goals: '$80,000',
        status: 'In Progress',
        tags: ['Email', 'Retargeting', 'Automation'],
        dateCreated: '21 Aug, 2025',
        dateCreatedTime: '2:45 PM',
    },
    {
        id: '2',
        name: 'Holiday Flash Sale',
        creator: {name: 'Sandra Walton', avatar: '/assets/images/users/user-7.jpg'},
        budget: '$6,000',
        goals: '$30,000',
        status: 'Success',
        tags: ['Seasonal', 'SMS'],
        dateCreated: '05 Dec, 2024',
        dateCreatedTime: '11:00 AM',
    },
    {
        id: '3',
        name: 'Product Launch Webinar',
        creator: {name: 'Jason Miller', avatar: '/assets/images/users/user-4.jpg'},
        budget: '$10,000',
        goals: '$65,000',
        status: 'Scheduled',
        tags: ['Webinar', 'Leads'],
        dateCreated: '01 Sep, 2025',
        dateCreatedTime: '9:15 AM',
    },
    {
        id: '4',
        name: 'Back-to-School Promo',
        creator: {name: 'Ava Nguyen', avatar: '/assets/images/users/user-8.jpg'},
        budget: '$4,800',
        goals: '$25,000',
        status: 'Failed',
        tags: ['Email', 'Discount'],
        dateCreated: '15 Jul, 2025',
        dateCreatedTime: '4:30 PM',
    },
    {
        id: '5',
        name: 'Spring Email Blast',
        creator: {name: 'Ryan Patel', avatar: '/assets/images/users/user-3.jpg'},
        budget: '$7,200',
        goals: '$40,000',
        status: 'Success',
        tags: ['Newsletter', 'Organic'],
        dateCreated: '18 Mar, 2025',
        dateCreatedTime: '1:00 PM',
    },
    {
        id: '6',
        name: 'Customer Loyalty Program',
        creator: {name: 'Lily Chen', avatar: '/assets/images/users/user-2.jpg'},
        budget: '$9,500',
        goals: '$70,000',
        status: 'Ongoing',
        tags: ['Rewards', 'Customer Retention'],
        dateCreated: '28 Aug, 2025',
        dateCreatedTime: '10:00 AM',
    },
    {
        id: '7',
        name: 'Referral Boost Campaign',
        creator: {name: 'Noah Brooks', avatar: '/assets/images/users/user-9.jpg'},
        budget: '$5,000',
        goals: '$20,000',
        status: 'Success',
        tags: ['Referral', 'Growth'],
        dateCreated: '04 Jun, 2025',
        dateCreatedTime: '9:00 AM',
    },
    {
        id: '8',
        name: 'App Download Drive',
        creator: {name: 'Sophia Lee', avatar: '/assets/images/users/user-10.jpg'},
        budget: '$3,200',
        goals: '$15,000',
        status: 'In Progress',
        tags: ['Mobile', 'Ads'],
        dateCreated: '12 Aug, 2025',
        dateCreatedTime: '3:15 PM',
    },
    {
        id: '9',
        name: 'Abandoned Cart Recovery',
        creator: {name: 'Lucas Green', avatar: '/assets/images/users/user-1.jpg'},
        budget: '$2,000',
        goals: '$12,000',
        status: 'Failed',
        tags: ['Email', 'Recovery'],
        dateCreated: '29 Jul, 2025',
        dateCreatedTime: '5:50 PM',
    },
    {
        id: '10',
        name: 'Local Awareness Campaign',
        creator: {name: 'Isabella Ray', avatar: '/assets/images/users/user-2.jpg'},
        budget: '$4,700',
        goals: '$28,000',
        status: 'Scheduled',
        tags: ['Geo Targeting', 'Brand'],
        dateCreated: '02 Sep, 2025',
        dateCreatedTime: '8:10 AM',
    },
    {
        id: '11',
        name: 'Video Ad Campaign',
        creator: {name: 'Leo White', avatar: '/assets/images/users/user-3.jpg'},
        budget: '$9,900',
        goals: '$55,000',
        status: 'Ongoing',
        tags: ['YouTube', 'Video'],
        dateCreated: '14 Aug, 2025',
        dateCreatedTime: '12:00 PM',
    },
]

export const campaignWidgets: CrmStatisticWidgetType[] = [
    {
        count: '11',
        change: '+22.2%',
        icon: "tablerArrowUp",
        description: 'Total campaigns launched',
        changeVariant: 'success',
    },
    {
        count: '4',
        change: '+36.3%',
        icon: "tablerArrowUp",
        description: 'Successful campaigns',
        changeVariant: 'success',
    },
    {
        count: '2',
        change: '-18.1%',
        icon: "tablerArrowDown",
        description: 'Failed campaigns',
        changeVariant: 'danger',
    },
    {
        count: '$85,000',
        change: 'Top value',
        icon: "tablerCurrencyDollar",
        description: 'Highest campaign budget',
        changeVariant: 'success',
    },
    {
        count: '5,7 days',
        change: '+1.4%',
        icon: "tablerClock",
        description: 'Avg. campaign duration',
        changeVariant: 'warning',
    },
]
