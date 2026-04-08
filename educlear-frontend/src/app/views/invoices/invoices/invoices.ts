import {Component, OnInit} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {Observable} from 'rxjs';
import {TableService} from '@core/services/table.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {generateInitials, toTitleCase} from '@/app/utils/string-utils';
import {currency} from '@/app/constants';
import {LucideAngularModule, LucideCircleCheckBig, LucideSearch} from 'lucide-angular';
import {InvoiceType} from '@/app/views/invoices/types';
import {invoices} from '@/app/views/invoices/data';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {AsyncPipe} from '@angular/common';
import {CustomPagination} from '@app/components/custom-pagination';

@Component({
    selector: 'app-invoices',
    imports: [PageTitle, FormsModule, RouterLink, NgIcon, LucideAngularModule, NgbdSortableHeader, AsyncPipe, CustomPagination],
    templateUrl: './invoices.html',
    providers:[TableService],
    styles: ``
})

export class Invoices implements OnInit{
    filterStatus="All"
    selectAll = false;

    LucideSearch=LucideSearch
    records$: Observable<InvoiceType[]>
    total$: Observable<number>;

    constructor(public tableService: TableService<InvoiceType>) {
        this.records$ = this.tableService.items$
        this.total$ = this.tableService.total$
    }

    ngOnInit(): void {
        this.tableService.setItems(invoices, 8)
    }


    toggleAllSelection() {
        this.tableService.setAllSelection(this.selectAll);
    }

    toggleSingleSelection() {
        this.tableService.items$.subscribe(items => {
            this.selectAll = items.every((item: any) => item.selected);
        }).unsubscribe();
    }

    deleteSelected() {
        this.tableService.deleteSelectedItems();
        this.selectAll = false;
    }

    get hasSelection(): boolean {
        return this.tableService.hasSelectedItems();
    }

    protected readonly toTitleCase = toTitleCase;
    protected readonly currency = currency;
    protected readonly generateInitials = generateInitials;
    protected readonly LucideCircleCheckBig = LucideCircleCheckBig;
}
