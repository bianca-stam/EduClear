import {Routes} from '@angular/router';
import {DarkTopbar} from '@/app/views/layouts/topbars/dark-topbar/dark-topbar';
import {GrayTopbar} from '@/app/views/layouts/topbars/gray-topbar/gray-topbar';
import {GradientTopbar} from '@/app/views/layouts/topbars/gradient-topbar/gradient-topbar';
import {
    WithSubItemsTopbar
} from '@/app/views/layouts/topbars/with-sub-items-topbar/with-sub-items-topbar';
import {WithToolsTopbar} from '@/app/views/layouts/topbars/with-tools-topbar/with-tools-topbar';

export const TOPBARS_ROUTES: Routes = [
    {
        path: 'layouts/topbars/dark',
        component: DarkTopbar,
        data: {title: "Dark Topbar"},
    },
    {
        path: 'layouts/topbars/gray',
        component: GrayTopbar,
        data: {title: "Gray Topbar"},
    },
    {
        path: 'layouts/topbars/gradient',
        component: GradientTopbar,
        data: {title: "Gradient Topbar"},
    },
    {
        path: 'layouts/topbars/with-sub-items',
        component: WithSubItemsTopbar,
        data: {title: "With Sub Items Topbar"},
    },
    {
        path: 'layouts/topbars/with-tools',
        component: WithToolsTopbar,
        data: {title: "With Tools Topbar"},
    },
];
