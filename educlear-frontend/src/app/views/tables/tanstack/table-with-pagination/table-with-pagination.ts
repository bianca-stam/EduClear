import {Component, signal} from '@angular/core';
import {TanstackTable} from '@app/components/Table/tanstack-table';
import {
    ColumnDef,
    createAngularTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel
} from '@tanstack/angular-table';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {LucideAngularModule, LucideSearch} from 'lucide-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TablePagination} from '@app/components/Table/table-pagination';
import {CompanyType, tableData} from '@/app/views/tables/tanstack/data';


@Component({
    selector: 'app-table-with-pagination',
    imports: [TanstackTable, PageTitle, UiCard, LucideAngularModule, ReactiveFormsModule, FormsModule, TablePagination],
    templateUrl: './table-with-pagination.html',
    styles: ``
})
export class TableWithPagination {


    deleteUser = (id: number) => {
        this.data.update(users => users.filter(user => user.id !== id));
    };

    data = signal<CompanyType[]>(tableData);

    columns: ColumnDef<CompanyType>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            enableSorting: false,
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'company',
             enableSorting: false,
            header: 'Company',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'symbol',
             enableSorting: false,
            header: 'Symbol',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'price',
             enableSorting: false,
            header: 'Price',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'change',
             enableSorting: false,
            header: 'Change',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'volume',
             enableSorting: false,
            header: 'Volume',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'marketCap',
             enableSorting: false,
            header: 'Market Cap',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'rating',
             enableSorting: false,
            header: 'Rating',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'status',
             enableSorting: false,
            header: 'Status',
            cell: info => info.getValue(),
        },
        {
            id: 'actions',
            header: 'Actions',
            enableSorting: false,
            cell: () => null
        }

    ];

    table = createAngularTable<CompanyType>(() => ({
        data:  this.data(),
        columns: this.columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
        initialState: {
            columnOrder: ['age', 'firstName', 'lastName'],
            sorting: [
                {
                    id: 'age',
                    desc: true
                }
            ]
        },
    }));


    setPageSize(size: number) {
        this.table.setPageSize(size);
    }

    protected readonly LucideSearch = LucideSearch;
    protected readonly Math = Math;
}

