import {Routes} from '@angular/router';
import {LightMenu} from '@/app/views/layouts/sidebars/light-menu/light-menu';
import {GradientMenu} from '@/app/views/layouts/sidebars/gradient-menu/gradient-menu';
import {ImageMenu} from '@/app/views/layouts/sidebars/image-menu/image-menu';
import {GrayMenu} from '@/app/views/layouts/sidebars/gray-menu/gray-menu';
import {CompactMenu} from '@/app/views/layouts/sidebars/compact-menu/compact-menu';
import {OnHoverMenu} from '@/app/views/layouts/sidebars/on-hover-menu/on-hover-menu';
import {IconViewMenu} from '@/app/views/layouts/sidebars/icon-view-menu/icon-view-menu';
import {
    OnHoverActiveMenuComponent
} from '@/app/views/layouts/sidebars/on-hover-active-menu/on-hover-active-menu';
import {OffcanvasMenu} from '@/app/views/layouts/sidebars/offcanvas-menu/offcanvas-menu';
import {
    NoIconsWithLinesMenu
} from '@/app/views/layouts/sidebars/no-icons-with-lines-menu/no-icons-with-lines-menu';
import {WithLinesMenu} from '@/app/views/layouts/sidebars/with-lines-menu/with-lines-menu';

export const SIDEBARS_ROUTES: Routes = [
    {
        path: 'layouts/sidebars/light',
        component: LightMenu,
        data: {title: "Light Menu"},
    },
    {
        path: 'layouts/sidebars/gradient',
        component: GradientMenu,
        data: {title: "Gradient Menu"},
    },
    {
        path: 'layouts/sidebars/gray',
        component: GrayMenu,
        data: {title: "Gray Menu"},
    },
    {
        path: 'layouts/sidebars/image',
        component: ImageMenu,
        data: {title: "Image Menu"},
    },
    {
        path: 'layouts/sidebars/compact',
        component: CompactMenu,
        data: {title: "Compact Menu"},
    },
    {
        path: 'layouts/sidebars/icon-view',
        component: IconViewMenu,
        data: {title: "Icon View Menu"},
    },
    {
        path: 'layouts/sidebars/on-hover',
        component: OnHoverMenu,
        data: {title: "On Hover Menu"},
    },
    {
        path: 'layouts/sidebars/on-hover-active',
        component: OnHoverActiveMenuComponent,
        data: {title: "On Hover Active Menu"},
    },
    {
        path: 'layouts/sidebars/offcanvas',
        component: OffcanvasMenu,
        data: {title: "Offcanvas Menu"},
    },
    {
        path: 'layouts/sidebars/no-icons-with-lines',
        component: NoIconsWithLinesMenu,
        data: {title: "No Icons With Lines Menu"},
    },
    {
        path: 'layouts/sidebars/with-lines',
        component: WithLinesMenu,
        data: {title: "With Lines Menu"},
    },
];
