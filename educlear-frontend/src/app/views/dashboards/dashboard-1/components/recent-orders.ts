import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {OrderType} from '@/app/views/dashboards/dashboard-1/types';
import {TableService} from '@core/services/table.service';
import {orders} from '@/app/views/dashboards/dashboard-1/data';
import {NgIcon} from '@ng-icons/core';
import {AsyncPipe} from '@angular/common';
import {CustomPagination} from '@app/components/custom-pagination';
import {RouterLink} from '@angular/router';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recent-orders',
    imports: [
        NgIcon,
        AsyncPipe,
        CustomPagination,
        RouterLink,
        NgbDropdown,
        NgbDropdownToggle,
        NgbDropdownMenu,
        NgbDropdownItem
    ],
    providers: [TableService],
  template: `
      <div class="card">
          <div class="card-header justify-content-between align-items-center border-dashed">
              <h4 class="card-title mb-0">Recent Orders</h4>
              <div class="d-flex gap-2">
                  <a href="javascript:void(0);" class="btn btn-sm btn-soft-secondary">
                      <ng-icon name="tablerPlus" class="me-1"/> Add Order
                  </a>
                  <a href="javascript:void(0);" class="btn btn-sm btn-primary">
                      <ng-icon name="tablerFileExport" class="me-1"/> Export CSV
                  </a>
              </div>
          </div>
          <div class="card-body p-0">
              <div class="table-responsive">
                  <table class="table table-centered table-custom table-sm table-nowrap table-hover mb-0">
                      <tbody>
                          @if ((total$ | async)! > 0) {
                              @for (order of orders$ || [] | async; track $index) {
                                  <tr>
                                      <td>
                                          <div class="d-flex align-items-center">
                                              <img [src]="order.userImage" alt=""
                                                   class="avatar-sm rounded-circle me-2">
                                              <div>
                                                  <span class="text-muted fs-xs">{{ order.userName }}</span>
                                                  <h5 class="fs-base mb-0"><a routerLink="/order-details"
                                                                              class="text-body">#{{ order.id }}</a></h5>
                                              </div>
                                          </div>
                                      </td>
                                      <td>
                                          <span class="text-muted fs-xs">Product</span>
                                          <h5 class="fs-base mb-0 fw-normal">{{ order.product }}</h5>
                                      </td>
                                      <td>
                                          <span class="text-muted fs-xs">Date</span>
                                          <h5 class="fs-base mb-0 fw-normal">{{ order.date }}</h5>
                                      </td>
                                      <td>
                                          <span class="text-muted fs-xs">Amount</span>
                                          <h5 class="fs-base mb-0 fw-normal">{{ order.amount }}</h5>
                                      </td>
                                      <td>
                                          <span class="text-muted fs-xs">Status</span>
                                          <h5 class="fs-base mb-0 fw-normal"><ng-icon name="tablerCircleFill"
                                              class="fs-xs text-{{order.statusVariant}}"/>
                                              {{ order.status }}</h5>
                                      </td>
                                      <td style="width: 30px;">
                                          <div ngbDropdown>
                                              <a href="javascript:void(0);"
                                                 ngbDropdownToggle
                                                 class="text-muted drop-arrow-none card-drop p-0"
                                                 >
                                                  <ng-icon name="tablerDotsVertical" class="fs-lg"/>
                                              </a>
                                              <div ngbDropdownMenu class="dropdown-menu-end">
                                                  <a href="javascript:void(0)" ngbDropdownItem>View Details</a>
                                                  <a href="javascript:void(0)" ngbDropdownItem>Cancel Order</a>
                                              </div>
                                          </div>
                                      </td>
                                  </tr>
                              }
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
export class RecentOrders {
    orders$: Observable<OrderType[]>
    total$: Observable<number>;

    constructor(public tableService: TableService<OrderType>) {
        this.orders$ = this.tableService.items$
        this.total$ = this.tableService.total$
    }

    ngOnInit(): void {
        this.tableService.setItems(orders, 7)
    }
}
