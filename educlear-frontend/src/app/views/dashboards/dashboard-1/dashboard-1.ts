import {Component} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {statisticCards} from '@/app/views/dashboards/dashboard-1/data';
import {StatisticCard} from '@/app/views/dashboards/dashboard-1/components/statistic-card';
import {SalesCharts} from '@/app/views/dashboards/dashboard-1/components/sales-charts';
import {ProductInventory} from '@/app/views/dashboards/dashboard-1/components/product-inventory';
import {RecentOrders} from '@/app/views/dashboards/dashboard-1/components/recent-orders';

@Component({
    selector: 'app-dashboard-1',
    imports: [PageTitle, StatisticCard, SalesCharts, ProductInventory, RecentOrders],
    templateUrl: './dashboard-1.html'
})
export class Dashboard1 {


    protected readonly statisticCards = statisticCards;
}
