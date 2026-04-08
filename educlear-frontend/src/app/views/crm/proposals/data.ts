import {CrmStatisticWidgetType} from '@/app/types';

const logoGoogle = '/assets/images/logos/google.svg'
const logoApple = '/assets/images/logos/apple.svg'
const logoMeta = '/assets/images/logos/meta.svg'
const logoFigma = '/assets/images/logos/figma.svg'
const logoAirbnb = '/assets/images/logos/airbnb.svg'
const logoAsana = '/assets/images/logos/asana.svg'
const logoMicrosoft = '/assets/images/logos/microsoft.svg'
const logoDropbox = '/assets/images/logos/dropbox.svg'
const logoOpenai = '/assets/images/logos/openai.svg'
const logoHandm = '/assets/images/logos/h&m.svg'
const logoShell = '/assets/images/logos/shell.svg'

export type ProposalType = {
    id: string
    subject: string
    sendTo: {
        name: string
        logo: string
    }
    value: string
    created: string
    createdTime: string
    openTill: string
    openTillTime: string
    status:  'Approved' | 'Pending' | 'Declined' | 'Sent' | 'In Review',
    selected?:boolean
}


export const proposals: ProposalType[] = [
    {
        id: '#PS008101',
        subject: 'SEO Optimization Campaign',
        sendTo: { name: 'Google Inc.', logo: logoGoogle },
        value: '$18,900',
        created: '12 Jul, 2025',
        createdTime: '10:00 AM',
        openTill: '30 Jul, 2025',
        openTillTime: '11:59 PM',
        status: 'Pending',
    },
    {
        id: '#PS008102',
        subject: 'New Mobile App Development',
        sendTo: { name: 'Apple Inc.', logo: logoApple },
        value: '$35,000',
        created: '18 Jul, 2025',
        createdTime: '3:15 PM',
        openTill: '15 Aug, 2025',
        openTillTime: '12:00 PM',
        status: 'Approved',
    },
    {
        id: '#PS008103',
        subject: 'Marketing Retargeting Plan',
        sendTo: { name: 'Meta Platforms', logo: logoMeta },
        value: '$22,750',
        created: '22 Jul, 2025',
        createdTime: '9:30 AM',
        openTill: '10 Aug, 2025',
        openTillTime: '5:00 PM',
        status: 'Declined',
    },
    {
        id: '#PS008104',
        subject: 'UI/UX Redesign for SaaS App',
        sendTo: { name: 'Figma Inc.', logo: logoFigma },
        value: '$9,800',
        created: '24 Jul, 2025',
        createdTime: '11:20 AM',
        openTill: '07 Aug, 2025',
        openTillTime: '6:00 PM',
        status: 'In Review',
    },
    {
        id: '#PS008105',
        subject: 'Cloud Infrastructure Setup',
        sendTo: { name: 'AirBNB', logo: logoAirbnb },
        value: '$45,000',
        created: '26 Jul, 2025',
        createdTime: '9:10 AM',
        openTill: '09 Aug, 2025',
        openTillTime: '5:00 PM',
        status: 'Approved',
    },
    {
        id: '#PS008106',
        subject: 'Digital Marketing Strategy',
        sendTo: { name: 'Asana', logo: logoAsana },
        value: '$27,600',
        created: '25 Jul, 2025',
        createdTime: '2:30 PM',
        openTill: '08 Aug, 2025',
        openTillTime: '3:00 PM',
        status: 'Pending',
    },
    {
        id: '#PS008107',
        subject: 'Backend API Integration',
        sendTo: { name: 'Microsoft Enterprise', logo: logoMicrosoft },
        value: '$14,200',
        created: '23 Jul, 2025',
        createdTime: '1:00 PM',
        openTill: '01 Aug, 2025',
        openTillTime: '2:00 PM',
        status: 'Sent',
    },
    {
        id: '#PS008108',
        subject: 'Performance Audit Report',
        sendTo: { name: 'Dropbox', logo: logoDropbox },
        value: '$6,500',
        created: '20 Jul, 2025',
        createdTime: '4:45 PM',
        openTill: '28 Jul, 2025',
        openTillTime: '11:00 AM',
        status: 'Declined',
    },
    {
        id: '#PS008109',
        subject: 'Data Migration Strategy',
        sendTo: { name: 'Dropbox Inc.', logo: logoDropbox },
        value: '$19,400',
        created: '19 Jul, 2025',
        createdTime: '3:20 PM',
        openTill: '03 Aug, 2025',
        openTillTime: '10:00 AM',
        status: 'Pending',
    },
    {
        id: '#PS008110',
        subject: 'Customer Portal UI Design',
        sendTo: { name: 'ChatGPT', logo: logoOpenai },
        value: '$31,000',
        created: '18 Jul, 2025',
        createdTime: '12:15 PM',
        openTill: '02 Aug, 2025',
        openTillTime: '6:00 PM',
        status: 'Approved',
    },
    {
        id: '#PS008111',
        subject: 'Mobile Analytics Dashboard',
        sendTo: { name: 'Mixpanel', logo: logoHandm },
        value: '$15,900',
        created: '16 Jul, 2025',
        createdTime: '4:00 PM',
        openTill: '30 Jul, 2025',
        openTillTime: '5:00 PM',
        status: 'Sent',
    },
    {
        id: '#PS008112',
        subject: 'AI-Powered Lead Generator',
        sendTo: { name: 'OpenAI', logo: logoOpenai },
        value: '$52,300',
        created: '21 Jul, 2025',
        createdTime: '1:45 PM',
        openTill: '04 Aug, 2025',
        openTillTime: '11:00 AM',
        status: 'In Review',
    },
    {
        id: '#PS008113',
        subject: 'Enterprise Security Audit',
        sendTo: { name: 'Cloudflare', logo: logoShell },
        value: '$40,750',
        created: '22 Jul, 2025',
        createdTime: '9:15 AM',
        openTill: '06 Aug, 2025',
        openTillTime: '4:00 PM',
        status: 'Declined',
    },
]

export const proposalWidgets: CrmStatisticWidgetType[] = [
    {
        count: '38',
        change: '+12.4%',
        icon: "tablerArrowUp",
        description: 'Total proposals submitted',
        changeVariant: 'success',
    },
    {
        count: '19',
        change: '+9.8%',
        icon: "tablerArrowUp",
        description: 'Approved proposals',
        changeVariant: 'success',
    },
    {
        count: '7',
        change: '-4.2%',
        icon: "tablerArrowDown",
        description: 'Declined proposals',
        changeVariant: 'danger',
    },
    {
        count: '$112,000',
        change: 'Top value',
        icon: "tablerCurrencyDollar",
        description: 'Highest proposal value',
        changeVariant: 'success',
    },
    {
        count: '3.2 days',
        change: '+0.8%',
        icon: "tablerClock",
        description: 'Avg. review time',
        changeVariant: 'warning',
    },
]
