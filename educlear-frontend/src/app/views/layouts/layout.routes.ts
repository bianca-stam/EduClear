import {Routes} from '@angular/router';
import {Scrollable} from '@/app/views/layouts/scrollable/scrollable';
import {Compact} from '@/app/views/layouts/compact/compact';
import {Boxed} from '@/app/views/layouts/boxed/boxed';
import {Horizontal} from '@/app/views/layouts/horizontal/horizontal';
import {Preloader} from '@/app/views/layouts/preloader/preloader';

export const LAYOUT_ROUTES: Routes = [
    {
        path: 'layouts/scrollable',
        component: Scrollable,
        data: {title: "Scrollable"},
    },
    {
        path: 'layouts/compact',
        component: Compact,
        data: {title: "Compact"},
    },
    {
        path: 'layouts/boxed',
        component: Boxed,
        data: {title: "Boxed"},
    },
    {
        path: 'layouts/horizontal',
        component: Horizontal,
        data: {title: "Horizontal"},
    },
    {
        path: 'layouts/preloader',
        component: Preloader,
        data: {title: "Preloader"},
    },
    {
        path: '',
        loadChildren: () => import('./sidebars/sidebars.routes').then((mod) => mod.SIDEBARS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./topbars/topbars.routes').then((mod) => mod.TOPBARS_ROUTES)
    },
];
