import {Component, inject, TemplateRef} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {LucideAngularModule, LucideLayoutGrid, LucideList, LucidePlus} from 'lucide-angular';
import {
    ProductFilterSidebar
} from '@/app/views/ecommerce/products/grid/components/product-filter-sidebar';
import {NgbOffcanvas, NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from '@ng-bootstrap/ng-bootstrap';
import {SimplebarAngularModule} from 'simplebar-angular';
import {ProductCard} from '@/app/views/ecommerce/products/grid/components/product-card';
import {products} from '@/app/views/ecommerce/products/data';

@Component({
    selector: 'app-grid',
    imports: [
        PageTitle,
        RouterLink,
        NgIcon,
        LucideAngularModule,
        ProductFilterSidebar,
        SimplebarAngularModule,
        ProductCard,
        NgbPagination,
        NgbPaginationNext,
        NgbPaginationPrevious
    ],
    templateUrl: './grid.html',
    styles: ``
})
export class Grid {
    protected readonly LucideLayoutGrid = LucideLayoutGrid;
    protected readonly LucideList = LucideList;
    protected readonly LucidePlus = LucidePlus;

    private offcanvasService = inject(NgbOffcanvas);

    open(content: TemplateRef<any>) {
        this.offcanvasService.open(content, {position: 'start'});
    }

    protected readonly products = products;
}
