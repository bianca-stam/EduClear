import { Component } from '@angular/core'
import { UiCard } from '@app/components/ui-card'
import { Chartjs } from '@app/components/chartjs'
import {
  basicLineChartOptions,
  interpolationChartOptions,
  lineSegmentChartOptions,
  multiAxesChartOptions,
  pointStyleChartOptions,
  steppedChartOptions,
} from '@/app/views/charts/chartjs/line-charts/data'
import {PageTitle} from '@app/components/page-title';

@Component({
  selector: 'app-line-charts',
  imports: [UiCard, Chartjs, PageTitle],
  template: `
    <div class="container-fluid">
      <app-page-title title="Line Charts" subTitle="Charts"/>
      <div class="row">
        <div class="col-xl-6">
          <app-ui-card title="Basic Line">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="basicLineChartOptions"
                  style="max-height: 300px;"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Interpolation">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="interpolationChartOptions"
                  style="max-height: 300px;"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Multi-Axes">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="multiAxesChartOptions"
                  style="max-height: 300px;"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Point Styling">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="pointStyleChartOptions"
                  style="max-height: 300px;"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Line Segment">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="lineSegmentChartOptions"
                  style="max-height: 300px;"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Stepped">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="steppedChartOptions"
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
export class LineCharts {
  protected readonly basicLineChartOptions = basicLineChartOptions
  protected readonly interpolationChartOptions = interpolationChartOptions
  protected readonly multiAxesChartOptions = multiAxesChartOptions
  protected readonly pointStyleChartOptions = pointStyleChartOptions
  protected readonly lineSegmentChartOptions = lineSegmentChartOptions
  protected readonly steppedChartOptions = steppedChartOptions
}
