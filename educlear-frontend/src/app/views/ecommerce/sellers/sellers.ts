import {Component, OnInit} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {Rating} from '@app/components/rating';
import {RouterLink} from '@angular/router';
import {currency} from '@/app/constants';
import {sellers} from '@/app/views/ecommerce/sellers/data';
import {Observable} from 'rxjs';
import {TableService} from '@core/services/table.service';
import {SellerType} from '@/app/views/ecommerce/sellers/types';
import {LucideAngularModule, LucideDollarSign, LucideSearch, LucideShoppingCart, LucideStar} from 'lucide-angular';
import {FormsModule} from '@angular/forms';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {Apexchart} from '@app/components/apexchart';
import {AsyncPipe, DecimalPipe} from '@angular/common';
import {CustomPagination} from '@app/components/custom-pagination';

@Component({
    selector: 'app-sellers',
    imports: [
        PageTitle,
        Rating,
        RouterLink,
        LucideAngularModule,
        FormsModule,
        NgbdSortableHeader,
        Apexchart,
        DecimalPipe,
        AsyncPipe,
        CustomPagination,
    ],
    providers: [TableService],
    templateUrl: './sellers.html',
    styles: ``
})
export class Sellers implements OnInit {
    protected readonly currency = currency;
    protected readonly LucideSearch = LucideSearch;
    protected readonly LucideShoppingCart = LucideShoppingCart;
    protected readonly LucideDollarSign = LucideDollarSign;
    protected readonly LucideStar = LucideStar;

    sellers$: Observable<SellerType[]>
    total$: Observable<number>;

    constructor(public tableService: TableService<SellerType>) {
        this.sellers$ = this.tableService.items$
        this.total$ = this.tableService.total$
    }

    ngOnInit(): void {
        this.tableService.setItems(sellers, 8)
    }

    selectAll = false;

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

}
