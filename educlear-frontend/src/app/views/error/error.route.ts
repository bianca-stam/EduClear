import { Routes } from '@angular/router';
import { Error400 } from './error-400/error-400';
import { Error401 } from './error-401/error-401';
import { Error403 } from './error-403/error-403';
import { Error404 } from './error-404/error-404';
import { Error408 } from './error-408/error-408';
import { Error500 } from './error-500/error-500';

export const ERROR_PAGES_ROUTES: Routes = [
    {
        path: 'error/400',
        component: Error400,
        data: { title: "400 Error" },
    },
    {
        path: 'error/401',
        component: Error401,
        data: { title: "401 Error" },
    },
    {
        path: 'error/403',
        component: Error403,
        data: { title: "403 Error" }
    },
    {
        path: 'error/404',
        component: Error404,
        data: { title: "404 Error" }
    },
    {
        path: 'error/408',
        component: Error408,
        data: { title: "408 Error" }
    },
    {
        path: 'error/500',
        component: Error500,
        data: { title: "500 Error" }
    },
];
