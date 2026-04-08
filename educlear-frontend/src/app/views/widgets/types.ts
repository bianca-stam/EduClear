import { VariantType } from "@/app/types";

type CountType = {
    value: string;
    prefix?: string;
    suffix?: string;
}

export type StatisticCard1Type = {
   icon : string;
   prefix? : string;
   suffix? : string;
   counter : number;
   title : string;
   iconbgcolor : string;
}

export type StatisticCard2Type = {
    icon : string;
   prefix? : string;
   suffix? : string;
   counter : number;
   title : string;
   iconbgcolor : string;
}

export type StatisticCard3Type = {
    title: string;
    heading: string;
    icon: string;
    number: string;
    iconcolor: string;
    footerLabel: string;
    footerValue: string;
    iconbgcolor: string;
}

export type StatisticCard4Type = {
     title: string;
    icontitle: string;
    counter: number;
    iconcolor: string;
    iconcolor2 : string;
    footerlabel: string;
    footervalue: string;
}

export type StatisticCard5Type = {
      iconbgcolor : string;
      icon : string;
      number : number;
      title : string;
      progresstitle : string;
      progress : number; 
      progresscolor : string;
}

export type StatisticCard6Type = {
    image : string;
    name : string;
    role : string;
    icon : string;
    iconbgcolor : string;
}

export type StatisticCard7Type = {
     title: string;
    variant?: VariantType;
    count: CountType;
    percentage: number;
    percentageIcon: string;
    iconcolor: string;
    progress: number;
}

export type ChatMessageType = {
    message: string;
    time: string;
    fromUser: boolean;
    avatar: string;
}

export type  PageVisitType = {
    url: string;
    uniqueVisitors: number;
    totalPageviews: number;
}

export type CountryType = {
    name: string;
    flag: string;
    population : string;
    count: number;
    change: number;
    variant: 'danger' | 'success' | 'warning'
}  