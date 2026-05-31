import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./cover/cover.route').then((mod) => mod.COVER_ROUTES)
    }
];
