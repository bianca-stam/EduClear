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
import {CompanyType, tableData} from '@/app/views/tables/tanstack/data';


@Component({
    selector: 'app-table-with-search',
    imports: [TanstackTable, PageTitle, UiCard, LucideAngularModule, ReactiveFormsModule, FormsModule],
    templateUrl: './table-with-search.html',
    styles: ``
})
export class TableWithSearch {
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
            header: 'Company',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'symbol',
            header: 'Symbol',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'change',
            header: 'Change',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'volume',
            header: 'Volume',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'marketCap',
            header: 'Market Cap',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'rating',
            header: 'Rating',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'status',
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
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
    }));
    setPageSize(size: number) {
        this.table.setPageSize(size);
    }


    protected readonly LucideSearch = LucideSearch;
    protected readonly Math = Math;
}

