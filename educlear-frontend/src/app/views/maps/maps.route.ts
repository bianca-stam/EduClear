import { Routes } from '@angular/router';
import { Vector } from './vector/vector';
import { Leaflet } from './leaflet/leaflet';


export const MAPS_ROUTES: Routes = [
    {
        path: 'maps/vector',
        component: Vector,
        data: { title: "Vector Maps" },
    },
    {
        path: 'maps/leaflet',
        component: Leaflet,
        data: { title: "Vector Maps" },
    },
];
