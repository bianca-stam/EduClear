import {Component, OnInit} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {
    LucideAngularModule,
    LucideBox,
    LucideLayoutGrid,
    LucideList,
    LucidePlus,
    LucideSearch,
    LucideStar,
    LucideTag
} from 'lucide-angular';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {TableService} from '@core/services/table.service';

import {currency} from '@/app/constants';
import {NgIcon} from '@ng-icons/core';
import {toTitleCase} from '@/app/utils/string-utils';
import {Rating} from '@app/components/rating';
import {FormsModule} from '@angular/forms';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {ProductType} from '@/app/views/ecommerce/products/types';
import {products} from '@/app/views/ecommerce/products/data';
import {AsyncPipe} from '@angular/common';
import {CustomPagination} from '@app/components/custom-pagination';

@Component({
    selector: 'app-products',
    imports: [
        PageTitle,
        LucideAngularModule,
        RouterLink,
        NgIcon,
        Rating,
        FormsModule,
        NgbdSortableHeader,
        AsyncPipe,
        CustomPagination,
    ],
    templateUrl: './products.html',
    styles: ``,
    providers:[TableService],
})
export class Products implements OnInit {
    protected readonly LucideSearch = LucideSearch;
    protected readonly LucideLayoutGrid = LucideLayoutGrid;
    protected readonly LucideList = LucideList;
    protected readonly LucidePlus = LucidePlus;

    protected readonly currency = currency;
    protected readonly toTitleCase = toTitleCase;

    categoryFilter = "All"
    statusFilter = "All"
    ratingFilter = "All"
    selectAll = false;

    products$: Observable<ProductType[]>
    total$: Observable<number>;

    constructor(public tableService: TableService<ProductType>) {
        this.products$ = this.tableService.items$
        this.total$ = this.tableService.total$
    }

    ngOnInit(): void {
        this.tableService.setItems(products, 8)
    }

    protected readonly LucideTag = LucideTag;
    protected readonly LucideBox = LucideBox;
    protected readonly LucideStar = LucideStar;

    truncateText(text: string, limit: number = 21): string {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
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


}
