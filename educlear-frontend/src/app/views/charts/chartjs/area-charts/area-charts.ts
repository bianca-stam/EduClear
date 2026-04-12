import { Component } from '@angular/core'
import { Chartjs } from '@app/components/chartjs'
import {
  basicChartOptions,
  boundaryChartOptions,
  differentDataSetChartOptions,
  drowTimeChartOptions,
  radarChartOptions,
  stackedChartOptions,
} from '@/app/views/charts/chartjs/area-charts/data'
import { UiCard } from '@app/components/ui-card'
import {PageTitle} from '@app/components/page-title';

@Component({
  selector: 'app-basic-charts',
  imports: [Chartjs, UiCard, PageTitle],
  template: `
    <div class="container-fluid">
      <app-page-title title="Area Charts" subTitle="Charts"/>
      <div class="row">
        <div class="col-xl-6">
          <app-ui-card title="Basic Area">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="basicChartOptions"
                  style="max-height: 300px;"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Different Dataset">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="differentDataSetChartOptions"
                  style="max-height: 300px;"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Stacked">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="stackedChartOptions"
                  style="max-height: 300px;"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Boundaries">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="boundaryChartOptions"
                  style="max-height: 300px;"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Draw Time">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="drowTimeChartOptions"
                  style="max-height: 300px;"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Radar">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="radarChartOptions"
                  style="max-height: 300px;"
                />
              </div>
            </div>
          </app-ui-card>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class AreaCharts {
  protected readonly basicChartOptions = basicChartOptions
  protected readonly differentDataSetChartOptions = differentDataSetChartOptions
  protected readonly stackedChartOptions = stackedChartOptions
  protected readonly boundaryChartOptions = boundaryChartOptions
  protected readonly drowTimeChartOptions = drowTimeChartOptions
  protected readonly radarChartOptions = radarChartOptions
}
