import {Component, signal} from '@angular/core';
import {LucideAngularModule, LucideSearch} from 'lucide-angular';
import {PageTitle} from '@app/components/page-title';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TanstackTable} from '@app/components/Table/tanstack-table';
import {UiCard} from '@app/components/ui-card';
import {CompanyType, tableData} from '@/app/views/tables/tanstack/data';
import {
    ColumnDef,
    createAngularTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel
} from '@tanstack/angular-table';

@Component({
    selector: 'app-table-with-delete-button',
    imports: [
        LucideAngularModule,
        PageTitle,
        ReactiveFormsModule,
        FormsModule,
        TanstackTable,
        UiCard
    ],
    templateUrl: './table-with-delete-button.html',
    styles: ``
})
export class TableWithDeleteButton {
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
            enableSorting: false,
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'symbol',
            header: 'Symbol',
            enableSorting: false,
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'price',
            header: 'Price',
            enableSorting: false,
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'change',
            header: 'Change',
            enableSorting: false,
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'volume',
            header: 'Volume',
            enableSorting: false,
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'marketCap',
            header: 'Market Cap',
            enableSorting: false,
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'rating',
            header: 'Rating',
            enableSorting: false,
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            enableSorting: false,
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
        data: this.data(),
        columns: this.columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    }));

    setPageSize(size: number) {
        this.table.setPageSize(size);
    }

    protected readonly LucideSearch = LucideSearch;
}
