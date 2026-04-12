import { Component } from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {CompleteTable} from '@/app/views/tables/custom/components/complete-table';
import {TableWithSearch} from '@/app/views/tables/custom/components/table-with-search';
import {TableWithCheckbox} from '@/app/views/tables/custom/components/table-with-checkbox';
import {TableWithDeleteButton} from '@/app/views/tables/custom/components/table-with-delete-button';
import {TableWithPagination} from '@/app/views/tables/custom/components/table-with-pagination';
import {
    TableWithPaginationInfo
} from '@/app/views/tables/custom/components/table-with-pagination-info';
import {TableWithFilters} from '@/app/views/tables/custom/components/table-with-filters';
import {TableWithSort} from '@/app/views/tables/custom/components/table-with-sort';

@Component({
  selector: 'app-custom',
    imports: [
        PageTitle,
        CompleteTable,
        TableWithSearch,
        TableWithCheckbox,
        TableWithDeleteButton,
        TableWithPagination,
        TableWithPaginationInfo,
        TableWithFilters,
        TableWithSort
    ],
  templateUrl: './custom.html',
  styles: ``
})
export class Custom {

}
