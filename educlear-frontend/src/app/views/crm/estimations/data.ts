import {CrmStatisticWidgetType} from '@/app/types';

export type EstimateType = {
    id: string
    project: string
    client: {
        name: string
        logo: string
    }
    value: string
    estimatedBy: {
        name: string
        avatar: string
    }
    created: string
    createdTime: string
    expectedClose: string
    expectedCloseTime: string
    status:  'In Review' | 'Approved' | 'Pending' | 'Declined' | 'Sent',
    selected?: boolean
}

export const estimations: EstimateType[] = [
    {
        id: '#EST00042',
        project: 'CRM System Redesign',
        client: { name: 'Airbnb', logo: "/assets/images/logos/airbnb.svg" },
        value: '$25,000',
        estimatedBy: { name: 'Jason Miller', avatar: "/assets/images/users/user-5.jpg" },
        created: '15 Jul, 2025',
        createdTime: '09:30 AM',
        expectedClose: '05 Aug, 2025',
        expectedCloseTime: '06:00 PM',
        status: 'In Review',
    },
    {
        id: '#EST00043',
        project: 'Lead Tracking Module',
        client: { name: 'Amazon', logo: "/assets/images/logos/amazon.svg" },
        value: '$14,200',
        estimatedBy: { name: 'Ava Green', avatar: "/assets/images/users/user-4.jpg" },
        created: '17 Jul, 2025',
        createdTime: '10:15 AM',
        expectedClose: '02 Aug, 2025',
        expectedCloseTime: '04:30 PM',
        status: 'Approved',
    },
    {
        id: '#EST00044',
        project: 'Marketing Automation',
        client: { name: 'Apple Inc.', logo: "/assets/images/logos/apple.svg" },
        value: '$32,000',
        estimatedBy: { name: 'Liam Scott', avatar: "/assets/images/users/user-2.jpg" },
        created: '18 Jul, 2025',
        createdTime: '01:40 PM',
        expectedClose: '10 Aug, 2025',
        expectedCloseTime: '01:00 PM',
        status: 'Pending',
    },
    {
        id: '#EST00045',
        project: 'Sales Pipeline Setup',
        client: { name: 'Asana Studio', logo: "/assets/images/logos/asana.svg" },
        value: '$21,800',
        estimatedBy: { name: 'Noah Carter', avatar: "/assets/images/users/user-3.jpg" },
        created: '19 Jul, 2025',
        createdTime: '03:00 PM',
        expectedClose: '08 Aug, 2025',
        expectedCloseTime: '05:45 PM',
        status: 'Declined',
    },
    {
        id: '#EST00046',
        project: 'Support Portal Development',
        client: { name: 'Dropbox Inc.', logo: "/assets/images/logos/dropbox.svg" },
        value: '$27,500',
        estimatedBy: { name: 'Emily Stone', avatar: "/assets/images/users/user-1.jpg" },
        created: '20 Jul, 2025',
        createdTime: '11:20 AM',
        expectedClose: '15 Aug, 2025',
        expectedCloseTime: '09:00 AM',
        status: 'In Review',
    },
    {
        id: '#EST00047',
        project: 'Client Onboarding System',
        client: { name: 'Figma Design', logo: "/assets/images/logos/figma.svg" },
        value: '$16,600',
        estimatedBy: { name: 'Sophia White', avatar: "/assets/images/users/user-6.jpg" },
        created: '21 Jul, 2025',
        createdTime: '02:00 PM',
        expectedClose: '06 Aug, 2025',
        expectedCloseTime: '12:00 PM',
        status: 'Sent',
    },
    {
        id: '#EST00048',
        project: 'Customer Insights Dashboard',
        client: { name: 'Meta', logo: "/assets/images/logos/meta.svg" },
        value: '$29,900',
        estimatedBy: { name: 'Mason Lee', avatar: "/assets/images/users/user-7.jpg" },
        created: '22 Jul, 2025',
        createdTime: '11:00 AM',
        expectedClose: '10 Aug, 2025',
        expectedCloseTime: '04:00 PM',
        status: 'In Review',
    },
    {
        id: '#EST00049',
        project: 'Workflow Automation Engine',
        client: { name: 'Slack', logo: "/assets/images/logos/slack.svg" },
        value: '$33,750',
        estimatedBy: { name: 'Olivia James', avatar: "/assets/images/users/user-8.jpg" },
        created: '23 Jul, 2025',
        createdTime: '09:30 AM',
        expectedClose: '14 Aug, 2025',
        expectedCloseTime: '11:30 AM',
        status: 'Approved',
    },
    {
        id: '#EST00050',
        project: 'Partner API Integration',
        client: { name: 'Microsoft', logo: "/assets/images/logos/microsoft.svg" },
        value: '$17,600',
        estimatedBy: { name: 'Ella Kim', avatar: "/assets/images/users/user-9.jpg" },
        created: '24 Jul, 2025',
        createdTime: '10:45 AM',
        expectedClose: '12 Aug, 2025',
        expectedCloseTime: '03:15 PM',
        status: 'Pending',
    },
    {
        id: '#EST00051',
        project: 'Mobile CRM App Build',
        client: { name: 'ChatGPT', logo: "/assets/images/logos/openai.svg" },
        value: '$40,000',
        estimatedBy: { name: 'Daniel Park', avatar: "/assets/images/users/user-10.jpg" },
        created: '25 Jul, 2025',
        createdTime: '02:30 PM',
        expectedClose: '20 Aug, 2025',
        expectedCloseTime: '05:00 PM',
        status: 'Sent',
    },
    {
        id: '#EST00052',
        project: 'Smart Contact Syncing',
        client: { name: 'Shell Petro.', logo: "/assets/images/logos/shell.svg" },
        value: '$13,250',
        estimatedBy: { name: 'Chloe Nguyen', avatar: "/assets/images/users/user-4.jpg" },
        created: '26 Jul, 2025',
        createdTime: '01:10 PM',
        expectedClose: '16 Aug, 2025',
        expectedCloseTime: '11:00 AM',
        status: 'Declined',
    },
]

export const estimationWidgets: CrmStatisticWidgetType[] = [
    {
        count: '52',
        change: '+15.7%',
        icon: "tablerArrowUp",
        description: 'Total estimations created',
        changeVariant: 'success',
    },
    {
        count: '24',
        change: '+10.2%',
        icon: "tablerArrowUp",
        description: 'Approved estimations',
        changeVariant: 'success',
    },
    {
        count: '8',
        change: '-3.9%',
        icon: "tablerArrowDown",
        description: 'Declined estimations',
        changeVariant: 'danger',
    },
    {
        count: '$138,500',
        change: 'Top value',
        icon: "tablerCurrencyDollar",
        description: 'Highest estimation value',
        changeVariant: 'success',
    },
    {
        count: '2.8 days',
        change: '+1.1%',
        icon: "tablerClock",
        description: 'Avg. review time',
        changeVariant: 'warning',
    },
]
