import {Routes} from '@angular/router';
import {MainLayout} from '@layouts/main-layout/main-layout';
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
        path: '**', 
        redirectTo: '/auth-2/sign-in', 
        pathMatch: 'full' 
    }
];
