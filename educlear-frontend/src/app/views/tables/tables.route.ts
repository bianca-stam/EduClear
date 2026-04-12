import {Routes} from '@angular/router';
import {Static} from './static/static';
import {Custom} from '@/app/views/tables/custom/custom';
import {TableWithSearch} from '@/app/views/tables/tanstack/table-with-search/table-with-search';
import {
    TableWithDeleteButton
} from '@/app/views/tables/tanstack/table-with-delete-button/table-with-delete-button';
import {
    TableWithPagination
} from '@/app/views/tables/tanstack/table-with-pagination/table-with-pagination';
import {TableWithSort} from '@/app/views/tables/tanstack/table-with-sort/table-with-sort';
import {
    TableWithCheckbox
} from '@/app/views/tables/tanstack/table-with-checkbox/table-with-checkbox';
import {TableWithFilters} from '@/app/views/tables/tanstack/table-with-filters/table-with-filters';

export const TABLES_ROUTES: Routes = [
    {
        path: 'tables/static',
        component: Static,
        data: {title: "Static Tables"},
    },
    {
        path: 'tables/custom',
        component: Custom,
        data: {title: "Custom Tables"},
    },
    {
        path: 'tanstack/table-with-search',
        component: TableWithSearch,
        data: {title: "Table With Search"},
    },
    {
        path: 'tanstack/table-with-delete-button',
        component: TableWithDeleteButton,
        data: {title: "Table With Search"},
    },
    {
        path: 'tanstack/table-with-pagination',
        component: TableWithPagination,
        data: {title: "Table With Pagination"},
    },
    {
        path: 'tanstack/table-with-sort',
        component: TableWithSort,
        data: {title: "Table With Sort"},
    },
    {
        path: 'tanstack/table-with-checkbox',
        component: TableWithCheckbox,
        data: {title: "Table With Checkbox"},
    },
    {
        path: 'tanstack/table-with-filters',
        component: TableWithFilters,
        data: {title: "Table With Filters"},
    },
];
