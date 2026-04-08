import {Routes} from '@angular/router';
import {Dashboard1} from '@/app/views/dashboards/dashboard-1/dashboard-1';
import {Dashboard2} from '@/app/views/dashboards/dashboard-2/dashboard-2';

export const DASHBOARDS_ROUTES: Routes = [
    {
        path: 'dashboard',
        component: Dashboard1,
        data: {title: "Dashboard"},
    },
    {
        path: 'dashboard2',
        component: Dashboard2,
        data: {title: "Dashboard 2"},
    },
];
