import { Component } from '@angular/core';
import {Chartjs} from '@app/components/chartjs';
import {salesAnalyticsChart, totalSalesChart} from '@/app/views/dashboards/dashboard-1/data';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-sales-charts',
    imports: [
        Chartjs,
        RouterLink,
        NgIcon
    ],
  template: `
      <div class="card">
          <div class="card-body p-0">
              <div class="row g-0">
                  <div class="col-xxl-3 col-xl-6 order-xl-1 order-xxl-0">
                      <div class="p-3 border-end border-dashed">
                          <h4 class="card-title mb-0">Total Sales</h4>
                          <p class="text-muted fs-xs">
                              You have 21 pending orders awaiting fulfillment.
                          </p>

                          <div class="row mt-4">
                              <div class="col-lg-12">
                              <app-chartjs [getOptions]="totalSalesChart" [height]="300"/>
                              </div>
                          </div>
                      </div>
                      <hr class="d-xxl-none border-light m-0">
                  </div>
                  <div class="col-xxl-9 order-xl-3 order-xxl-1">
                      <div class="px-4 py-3">
                          <div class="d-flex justify-content-between mb-3">
                              <h4 class="card-title">Sales Analytics</h4>
                              <a [routerLink]="[]" class="link-reset text-decoration-underline fw-semibold link-offset-3 d-flex align-items-center gap-1">View
                                  Reports <ng-icon name="tablerArrowRight" /></a>
                          </div>

                          <div dir="ltr">
                              <div class="mt-3" style="height: 330px;">
                                   <app-chartjs [getOptions]="salesAnalyticsChart" [height]="300"/>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </div>
  `,
  styles: ``
})
export class SalesCharts {

    protected readonly totalSalesChart = totalSalesChart;
    protected readonly salesAnalyticsChart = salesAnalyticsChart;
}
