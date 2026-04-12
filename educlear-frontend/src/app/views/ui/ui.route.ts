import {Routes} from '@angular/router';
import { Accordions } from './accordions/accordions';
import { Alerts } from './alerts/alerts';
import { Images } from './images/images';
import { Badges } from './badges/badges';
import { Breadcrumb } from './breadcrumb/breadcrumb';
import { Buttons } from './buttons/buttons';
import { Cards } from './cards/cards';
import { Carousel } from './carousel/carousel';
import { Collapse } from './collapse/collapse';
import { Colors } from './colors/colors';
import { Dropdowns } from './dropdowns/dropdowns';
import { Videos } from './videos/videos';
import { GridOptions } from './grid-options/grid-options';
import { Links } from './links/links';
import { ListGroups } from './list-groups/list-groups';
import { Modals } from './modals/modals';
import { Notifications } from './notifications/notifications';
import { Offcanvas } from './offcanvas/offcanvas';
import { Placeholders } from './placeholders/placeholders';
import { Pagination } from './pagination/pagination';
import { Popovers } from './popovers/popovers';
import { Progress } from './progress/progress';
import { Scrollspy } from './scrollspy/scrollspy';
import { Spinners } from './spinners/spinners';
import { Tabs } from './tabs/tabs';
import { Tooltips } from './tooltips/tooltips';
import { Typography } from './typography/typography';
import { Utilities } from './utilities/utilities';


export const UI_ROUTES: Routes = [
    {
        path: 'ui/accordions',
        component: Accordions,
        data: {title: "Accordions"},
    },
    {
        path: 'ui/alerts',
        component: Alerts,
        data: {title: "Alerts"},
    },
    {
        path: 'ui/images',
        component: Images,
        data: {title: "Images"}
    },
    {
        path: 'ui/badges',
        component: Badges,
        data: {title: "Badges"},
    },
    {
        path: 'ui/breadcrumb',
        component: Breadcrumb,
        data: {title: "Breadcrumbs"},
    },
    {
        path: 'ui/buttons',
        component: Buttons,
        data: {title: "Buttons"},
    },
    {
        path: 'ui/cards',
        component: Cards,
        data: {title: "Cards"},
    },
    {
        path: 'ui/carousel',
        component: Carousel,
        data: {title: "Carousels"},
    },
    {
        path: 'ui/collapse',
        component: Collapse,
        data: {title: "Collapse"},
    },
    {
        path: 'ui/colors',
        component: Colors,
        data: {title: "Colors"},
    },
    {
        path: 'ui/dropdowns',
        component: Dropdowns,
        data: {title: "Dropdowns"},
    },
    {
        path: 'ui/videos',
        component: Videos,
        data: {title: "Videos"},
    },
    {
        path: 'ui/grid-options',
        component: GridOptions,
        data: {title: "Grid Options"},
    },
    {
        path: 'ui/links',
        component: Links,
        data: {title: "Links"},
    },
    {
        path: 'ui/list-groups',
        component: ListGroups,
        data: {title: "List Groups"},
    },
    {
        path: 'ui/modals',
        component: Modals,
        data: {title: "Modals"},
    },
    {
        path: 'ui/notifications',
        component: Notifications,
        data: {title: "Notifications"},
    },
    {
        path: 'ui/offcanvas',
        component: Offcanvas,
        data: {title: "Offcanvas"},
    },
    {
        path: 'ui/placeholders',
        component: Placeholders,
        data: {title: "Placeholders"},
    },
    {
        path: 'ui/pagination',
        component: Pagination,
        data: {title: "Pagination"},
    },
    {
        path: 'ui/popovers',
        component: Popovers,
        data: {title: "Popovers"},
    },
    {
        path: 'ui/progress',
        component: Progress,
        data: {title: "Progress"},
    },
    {
        path: 'ui/scrollspy',
        component: Scrollspy,
        data: {title: "Scrollspy"},
    },
    {
        path: 'ui/spinners',
        component: Spinners,
        data: {title: "Spinners"},
    },
    {
        path: 'ui/tabs',
        component: Tabs,
        data: {title: "Tabs"},
    },
    {
        path: 'ui/tooltips',
        component: Tooltips,
        data: {title: "Tooltips"},
    },
    {
        path: 'ui/typography',
        component: Typography,
        data: {title: "Typography"},
    },
    {
        path: 'ui/utilities',
        component: Utilities,
        data: {title: "Utilities"},
    },
];
