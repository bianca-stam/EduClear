import {Routes} from '@angular/router';
import {Widgets} from '@/app/views/widgets/widgets';

export const VIEWS_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./dashboards/dashboards.routes').then((mod) => mod.DASHBOARDS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./layouts/layout.routes').then((mod) => mod.LAYOUT_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./ui/ui.route').then((mod) => mod.UI_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./maps/maps.route').then((mod) => mod.MAPS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./tables/tables.route').then((mod) => mod.TABLES_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./forms/forms.route').then((mod) => mod.FORMS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./miscellaneous/miscellaneous.route').then((mod) => mod.MISCELLANEOUS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./pages/pages.route').then((mod) => mod.PAGES_ROUTES)
    },

    {
        path: '',
        loadChildren: () => import('./invoices/invoices.route').then((mod) => mod.INVOICES_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./apps/apps.route').then((mod) => mod.APPS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./ecommerce/ecommerce.route').then((mod) => mod.ECOMMERCE_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./crm/crm.routes').then((mod) => mod.CRM_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./icons/icons.route').then((mod) => mod.ICONS_ROUTES)
    },
    {
        path: 'widgets',
        component: Widgets,
        data: {title: "Widgets"},
    },
    {
        path: '',
        loadChildren: () => import('./charts/charts.route').then((mod) => mod.CHARTS_ROUTES)
    },
];
