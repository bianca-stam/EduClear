import {Component, OnInit} from '@angular/core';
import {TableService} from '@core/services/table.service';
import {AsyncPipe} from '@angular/common';
import {Rating} from '@app/components/rating';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {Observable} from 'rxjs';
import {ProductType} from '@/app/views/dashboards/dashboard-1/types';
import {CustomPagination} from '@app/components/custom-pagination';
import {FormsModule} from '@angular/forms';
import {
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';
import {products} from '@/app/views/dashboards/dashboard-1/data';

@Component({
    selector: 'app-product-inventory',
    imports: [AsyncPipe, Rating, RouterLink, NgIcon, CustomPagination, FormsModule, NgbDropdownMenu, NgbDropdown, NgbDropdownToggle, NgbDropdownItem],
    providers: [TableService],
    template: `
        <div data-table data-table-rows-per-page="7" class="card">
            <div class="card-header justify-content-between align-items-center border-dashed">
                <h4 class="card-title mb-0">Product Inventory</h4>
                <div class="d-flex gap-2">
                    <a routerLink="/add-product" class="btn btn-sm btn-soft-secondary">
                        <ng-icon name="tablerPlus" class="me-1"/>
                        Add Product
                    </a>
                    <a href="javascript:void(0);" class="btn btn-sm btn-primary">
                        <ng-icon name="tablerFileExport" class="me-1"/>
                        Export CSV
                    </a>
                </div>
            </div>

            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-centered table-custom table-sm table-nowrap table-hover mb-0">
                        <tbody>
                            @if ((total$ | async)! > 0) {
                                @for (product of products$ | async; track $index) {
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <img [src]='product.image' alt=""
                                                     class="avatar-sm rounded-circle me-2"/>
                                                <div>
                                                    <span class="text-muted fs-xs">{{ product.category }}</span>
                                                    <h5 class="fs-base mb-0"><a routerLink="/products/1"
                                                                                class="text-body">{{product.name}}</a>
                                                    </h5>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="text-muted fs-xs">Stock</span>
                                            <h5 class="fs-base fw-normal mb-0">{{ product.stock }}</h5>
                                        </td>
                                        <td>
                                            <span class="text-muted fs-xs">Price</span>
                                            <h5 class="fs-base fw-normal mb-0">{{ product.price }}</h5>
                                        </td>
                                        <td>
                                            <span class="text-muted fs-xs">Ratings</span>
                                            <h5 class="fs-base fw-normal mb-0">
                                                       <app-rating [rate]="product.ratings"/>
                                                <span class="ms-1"><a routerLink="/reviews"
                                                                      class="link-reset fw-semibold">(52)</a></span>
                                            </h5>
                                        </td>
                                        <td>
                                            <span class="text-muted fs-xs">Status</span>
                                            <h5 class="fs-base fw-normal mb-0"><ng-icon name="tablerCircleFill"
                                                class="fs-xs text-{{product.statusVariant}}"/> {{ product.status }}</h5>
                                        </td>
                                        <td style="width: 30px;">
                                            <div ngbDropdown placement="bottom-end">
                                                <a href="javascript:void(0);" ngbDropdownToggle
                                                   class="text-muted drop-arrow-none card-drop p-0"
                                                   >
                                                    <ng-icon name="tablerDotsVertical" class="fs-lg"/>
                                                </a>
                                                <div ngbDropdownMenu class="dropdown-menu-end">
                                                    <a href="javascript:void(0)" ngbDropdownItem >Edit Product</a>
                                                    <a href="javascript:void(0)" ngbDropdownItem>Remove</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                }
                            } @else {
                                <tr class="no-results">
                                    <td colspan="11" class="text-center text-muted py-3">Nothing found.</td>
                                </tr>
                            }

                        </tbody>
                    </table>

                </div>
            </div>

            <div class="card-footer border-0">
                @if ((total$ | async)! > 0) {
                    <app-custom-pagination
                        [showingRange]="tableService.showingRange"
                        [collectionSize]="(total$ | async)!"
                        [(page)]="tableService.page"
                        [pageSize]="tableService.pageSize"
                    >
                    </app-custom-pagination>
                }
            </div>
        </div>
    `,
    styles: ``
})
export class ProductInventory implements OnInit{
    products$: Observable<ProductType[]>
    total$: Observable<number>;

    constructor(public tableService: TableService<ProductType>) {
        this.products$ = this.tableService.items$
        this.total$ = this.tableService.total$
    }

    ngOnInit(): void {
        this.tableService.setItems(products, 7)
    }
}
