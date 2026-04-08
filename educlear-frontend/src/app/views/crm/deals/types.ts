import {VariantType} from '@/app/types';

export type DealWidgetType = {
    count: string
    change: string
    icon: string
    title: string
    progress: number
    variant: VariantType
}

export type DealType = {
    id: number;
    name: string;
    company: string;
    logo: string;
    amount: number;
    stage: string;
    probability: number;
    date: string;
    selected?: boolean;
};

