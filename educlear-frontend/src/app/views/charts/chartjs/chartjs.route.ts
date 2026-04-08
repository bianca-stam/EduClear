import {Routes} from '@angular/router';
import {AreaCharts} from '@/app/views/charts/chartjs/area-charts/area-charts';
import {LineCharts} from '@/app/views/charts/chartjs/line-charts/line-charts';
import {BarCharts} from '@/app/views/charts/chartjs/bar-charts/bar-charts';
import {OtherCharts} from '@/app/views/charts/chartjs/other-charts/other-charts';

export const CHARTJS_ROUTES: Routes = [
    {
        path: 'charts/chartjs/area',
        component: AreaCharts,
        data: {title: "Area Charts"},
    },
    {
        path: 'charts/chartjs/line',
        component: LineCharts,
        data: {title: "Line Charts"},
    }, {
        path: 'charts/chartjs/bar',
        component: BarCharts,
        data: {title: "Bar Charts"},
    }, {
        path: 'charts/chartjs/other',
        component: OtherCharts,
        data: {title: "Other Charts"},
    },
];
