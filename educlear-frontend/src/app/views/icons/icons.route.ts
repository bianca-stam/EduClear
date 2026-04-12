import {Routes} from '@angular/router';
import {Tabler} from '@/app/views/icons/tabler/tabler';
import {Lucide} from '@/app/views/icons/lucide/lucide';
import {Flags} from '@/app/views/icons/flags/flags';

export const ICONS_ROUTES: Routes = [
    {
        path: 'icons/tabler',
        component: Tabler,
        data: {title: "Tabler Icons"},
    },
    {
        path: 'icons/lucide',
        component: Lucide,
        data: {title: "Lucide Icons"},
    },
    {
        path: 'icons/flags',
        component: Flags,
        data: {title: "Flag Icons"},
    },
]
