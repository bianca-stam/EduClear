import { ChatMessageType, CountryType, PageVisitType, StatisticCard1Type, StatisticCard2Type, StatisticCard3Type, StatisticCard4Type, StatisticCard5Type, StatisticCard6Type, StatisticCard7Type } from "./types";

export const statisticCards1: StatisticCard1Type[] = [
    {
        icon : 'tablerCreditCard',
        prefix : '$',
        suffix : 'K',
        counter : 124.70,
        title : 'Total Sales',
        iconbgcolor : 'bg-primary-subtle text-primary'
    },
        {
        icon : 'tablerShoppingCart',
        prefix : '',
        suffix : '',
        counter : 2358,
        title : 'Orders Placed',
        iconbgcolor : 'bg-success-subtle text-success'
    },
        {
        icon : 'tablerUsers',
         prefix : '',
        suffix : '',
        counter : 839,
        title : 'Active Customers',
        iconbgcolor : 'bg-info-subtle text-info'
    },
        {
        icon : 'tablerRotateClockwise2',
         prefix : '',
        suffix : '',
        counter : 41,
        title : 'Refund Requests',
        iconbgcolor : 'bg-warning-subtle text-warning'
    }
]

export const statisticCards2: StatisticCard2Type[] = [
     {
        icon : 'tablerBellPlus',
        prefix : '',
        suffix : '',
        counter : 438,
        title : 'New Subscriptions',
        iconbgcolor : 'bg-secondary-subtle text-secondary'
    },
        {
        icon : 'tablerHeadset',
        prefix : '',
        suffix : '',
        counter : 108,
        title : 'Support Tickets',
        iconbgcolor : 'bg-danger-subtle text-danger'
    },
        {
        icon : 'tablerChartPie',
         prefix : '',
        suffix : '%',
        counter : 3.70,
        title : 'Conversion Rate',
        iconbgcolor : 'text-bg-light'
    },
        {
        icon : 'tablerTrendingUp',
         prefix : '+',
        suffix : '%',  
        counter : 12.4,
        title : 'Revenue Growth',
        iconbgcolor : 'bg-dark-subtle text-dark'
    }
]

export const statisticCards3: StatisticCard3Type[] = [
    {
      title : 'Number of Orders',
      heading : 'Orders',
      icon : 'tablerShoppingCart',
      number : '1,250',
      iconcolor : 'text-success',
      footerLabel : 'Total Orders',
      footerValue : '15,320',
      iconbgcolor : 'text-bg-success'
    },
      {
      title : 'Revenue Earned',
      heading : 'Revenue',
      icon : 'tablerCurrencyDollar',
      number : '$98.7k',
      iconcolor : 'text-primary',
      footerLabel : 'Total Revenue',
      footerValue : '$1.2M',
      iconbgcolor : 'text-bg-warning'
    },
      {
      title : 'Seller Ratings',
      heading : 'Ratings',
      icon : 'tablerStar',
      number : '4.8',
      iconcolor : 'text-info',
      footerLabel : 'Average Rating',
      footerValue : '5k Reviews',
      iconbgcolor : 'text-bg-info '
    },
      {
      title : 'Total Products',
      heading : 'Products',
      icon : 'tablerBox',
      number : '350',
      iconcolor : 'text-secondary',
      footerLabel : 'Total Products',
      footerValue : '750 Variants',
      iconbgcolor : 'text-bg-secondary'
    }
]

export const statisticCards4: StatisticCard4Type[] = [
    {
        title : 'Listed Properties',
        icontitle : 'Total number of properties listed',
        counter : 1245,
        iconcolor : 'text-info',
        iconcolor2 : 'text-success',
        footerlabel : 'New This Month: 120',
        footervalue : '5.2%'
    },
        {
        title : 'Sold Properties',
        icontitle : 'Properties successfully sold',
        counter : 862,
        iconcolor : 'text-success', 
        iconcolor2 : 'text-success',
        footerlabel : 'This Year: 308',
        footervalue : '7.9%'
    },
        {
        title : 'Rental Agreements',
        icontitle : 'Active rental contracts',
        counter : 573,
        iconcolor : 'text-warning', 
        iconcolor2 : 'text-warning',
        footerlabel : 'New Rentals: 48',
        footervalue : '2.3%'
    },
        {
        title : 'Active Agents',
        icontitle : 'Currently working agents',
        counter : 127,
        iconcolor : 'text-success', 
        iconcolor2 : 'text-success',
        footerlabel : 'On Duty: 35',
        footervalue : '4.1%'
    }
]

export const statisticCards5: StatisticCard5Type[] = [
    {
      iconbgcolor : 'bg-info-subtle text-info',
      icon : 'tablerClipboardList',
      number : 28,
      title : 'Active Projects',
      progresstitle : 'PROGRESS',
      progress : 75,    
      progresscolor : 'info'
    },
    {
      iconbgcolor : 'bg-success-subtle text-success',
      icon : 'tablerChecklist',
      number : 124,
      title : 'Tasks Completed',
      progresstitle : 'TARGET',
      progress : 88,    
      progresscolor : 'success'
    },
    {
      iconbgcolor : 'bg-warning-subtle text-warning',
      icon : 'tablerClockHour4',
      number : 16,
      title : 'Pending Tasks',
      progresstitle : 'DEADLINES',
      progress : 42,  
      progresscolor : 'warning'
    },
        {
      iconbgcolor : 'bg-danger-subtle text-danger',
      icon : 'tablerUserCog',
      number : 9,
      title : 'Project Managers',
      progresstitle : 'ALLOCATED',
      progress : 100,
      progresscolor : 'danger'
    }
]     

export const statisticCards6: StatisticCard6Type[] = [
  {
    image : 'assets/images/users/user-1.jpg',
    name : 'Ava Martinez',
    role : 'Project Manager',
    icon : 'tablerPhoneRinging',
    iconbgcolor : 'btn-soft-success'
  },
    {
    image : 'assets/images/users/user-2.jpg',
    name : 'Liam Nguyen',
    role : 'UI/UX Designer',
    icon : 'tablerPhoneRinging',
    iconbgcolor : 'btn-soft-warning'
  },
    {
    image : 'assets/images/users/user-3.jpg',
    name : 'Sophia Khan',
    role : 'Marketing Lead',
    icon : 'tablerPhoneRinging',
    iconbgcolor : 'btn-soft-info'
  },
    {
    image : 'assets/images/users/user-4.jpg',
    name : 'Noah Patel',
    role : 'Backend Developer',
    icon : 'tablerPhoneRinging',
    iconbgcolor : 'btn-soft-danger'
  }
]

export const statisticCards7: StatisticCard7Type[] = [
    {
        title: 'Total reports generated',
        count: {value: '4320'},
        percentage: 12.75,
        percentageIcon: 'tablerArrowUp',
        iconcolor: 'text-success',
        progress: 12.75
    },
    {
        title: 'Reports exported',
        variant: 'primary',
        count: {value: '1280'},
        percentage: 7.20,
        percentageIcon: 'tablerArrowUp',
        iconcolor: 'text-success',
        progress: 7.20
    },
    {
        title: 'Errors found in reports',
        variant: 'secondary',
        count: {value: '157'},
        percentage: 3.42,
        percentageIcon: 'tablerAlertCircle',
        iconcolor: 'text-danger',
        progress: 3.42
    },
    {
        title: 'Most viewed report',
        variant: 'warning',
        count: {value: 'Analytics Q2'},
        percentage: 54.6,
        percentageIcon: 'tablerEye',
        iconcolor: 'text-info',
        progress: 54.6
    },
     {
        title: 'Avg. completion time',
        count: {value: '3.8', suffix: ' mins'},
        percentage:1.65,
        percentageIcon: 'tablerClock',
        iconcolor: 'text-warning',
        progress:1.65
    }
]

export const messages: ChatMessageType[] = [
    {
        message: 'Hey! Are you available for a quick call? 📞',
        time: '08:55 am',
        fromUser: false,
        avatar: 'assets/images/users/user-5.jpg'
    },
    {
        message: 'Sure, give me 5 minutes. Just wrapping something up.',
        time: '08:57 am',
        fromUser: true,
        avatar: 'assets/images/users/user-2.jpg'
    },
    {
        message: "Perfect. Let me know when you're ready 👍",
        time: '08:58 am',
        fromUser: false,
        avatar: 'assets/images/users/user-5.jpg'
    },
    {
        message: 'Ready now. Calling you!',
        time: '09:00 am',
        fromUser: true,
        avatar: 'assets/images/users/user-2.jpg'
    },
    {
        message: 'Thanks for your time earlier!',
        time: '09:45 am',
        fromUser: false,
        avatar: 'assets/images/users/user-5.jpg'
    },
    {
        message: 'Of course! It was a productive discussion.',
        time: '09:46 am',
        fromUser: true,
        avatar: 'assets/images/users/user-2.jpg'
    },
    {
        message: 'I’ll send over the updated files by noon.',
        time: '09:50 am',
        fromUser: false,
        avatar: 'assets/images/users/user-5.jpg'
    }
];

export const pageVisits: PageVisitType[] = [
    {url: '/dashboard', uniqueVisitors: 9.8, totalPageviews: 8.5},
    {url: '/ecommerce-index', uniqueVisitors: 8.2, totalPageviews: 7.1},
    {url: '/apps/projects-overview', uniqueVisitors: 7.6, totalPageviews: 6.2},
    {url: '/pages/contact', uniqueVisitors: 5.9, totalPageviews: 4.8},
    {url: '/support/faq', uniqueVisitors: 5.2, totalPageviews: 4.3},
];

export const countries: CountryType[] = [
   {
        name: 'India',
        flag: 'assets/images/flags/in.svg',
        population : '1.43B',
        count: 14217,
        change: 3.2,
        variant: 'success'
    },
    {
        name: 'Germany',
        flag: 'assets/images/flags/de.svg',
        population : '83.2M',
        count: 10412,
        change: 1.5,
        variant: 'success'
    },
    {
        name: 'France',
        flag: 'assets/images/flags/fr.svg',
        population : '67.5M',
        count: 8934,
        change: 0.8,
        variant: 'danger'
    },
   
    {
        name: 'United States',
        flag: 'assets/images/flags/us.svg',
        population : '339.9M',
        count: 18522,
        change: 2.1,
        variant: 'success'
    },
    {
        name: 'United Kingdom',
        flag: 'assets/images/flags/gb.svg',
        population : '67.3M',
        count: 7614,
        change: 1.2,
        variant: 'danger'
    },
    {
        name: 'Canada',
        flag: 'assets/images/flags/ca.svg',
        population : '39.6M',
        count: 6221,
        change: 0.9,
        variant: 'success'
    },
    {
        name: 'Japan',
        flag: 'assets/images/flags/jp.svg',
        population : '123.3M',
        count: 5785,
        change: 0.0,
        variant: 'warning'
    },
    {
        name: 'Australia',
        flag: 'assets/images/flags/au.svg',
        population : '26.8M',
        count: 4918,
        change: 1.1,
        variant: 'success'
    }
];