import {Routes} from '@angular/router';
import {Apextree} from '@/app/views/charts/apextree/apextree';
import {Apexsankey} from '@/app/views/charts/apexsankey/apexsankey';

export const CHARTS_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./apex/apex.route').then((mod) => mod.APEXCHARTS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./chartjs/chartjs.route').then((mod) => mod.CHARTJS_ROUTES)
    },
    {
        path:'charts/apextree',
        component:Apextree
    },
    {
        path:'charts/apexsankey',
        component:Apexsankey
    },
]
