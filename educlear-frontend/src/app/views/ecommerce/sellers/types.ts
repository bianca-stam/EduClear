import {ApexOptions} from 'ng-apexcharts';
import {CountType} from '@/app/types';

export type SellerType = {
    id: number;
    name: string;
    image: string;
    products: number;
    orders: number;
    rating: number;
    location: string;
    flag: string;
    balance: number;
    sinceYear: number;
    reportChartOptions: () => ApexOptions;
    selected?: boolean;
};

export type SellerStatisticType = {
    title: string
    description: string
    icon: string
    count: CountType
    variant: string
    totalCount: string
}
