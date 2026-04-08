import {Routes} from '@angular/router';
import {Maintenance} from './maintenance/maintenance';
import {ComingSoon} from '@/app/views/other-pages/coming-soon/coming-soon';

export const OTHER_PAGES_ROUTES: Routes = [
    {
        path: 'maintenance',
        component: Maintenance,
        data: {title: "Maintenance"},
    },
    {
        path: 'coming-soon',
        component: ComingSoon,
        data: {title: "Coming Soon"},
    },

];
