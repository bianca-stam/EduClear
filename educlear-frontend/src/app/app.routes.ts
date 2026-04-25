import {Routes} from '@angular/router';
import {MainLayout} from '@layouts/main-layout/main-layout';
import {Landing} from './views/landing/landing';
import { authGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'cursos',
        pathMatch: 'full',
    },
    {
        path: '',
        loadChildren: () => import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES)
    },
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],
        loadChildren: () => import('./views/views.route').then((mod) => mod.VIEWS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./views/error/error.route').then((mod) => mod.ERROR_PAGES_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./views/other-pages/other-pages.route').then((mod) => mod.OTHER_PAGES_ROUTES)
    },
    {
        path: 'landing',
        component: Landing,
        data: {title: 'One page Landing'}
    },
    { 
        path: '**', 
        redirectTo: '/auth-2/sign-in', 
        pathMatch: 'full' 
    }
];
