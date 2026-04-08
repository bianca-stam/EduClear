import { Component } from '@angular/core'
import { UiCard } from '@app/components/ui-card'
import { Chartjs } from '@app/components/chartjs'
import {
  bubbleChartOptions,
  comboBarAndLineChartOptions,
  donutChartOptions,
  multiSeriesPieChartOptions,
  pieChartOptions,
  polarChartOptions, radarChartOptions,
  scatterChartOptions,
  stackedBarAndLineChartOptions,
} from '@/app/views/charts/chartjs/other-charts/data'
import {PageTitle} from '@app/components/page-title';

@Component({
  selector: 'app-other-charts',
  imports: [UiCard, Chartjs, PageTitle],
  template: `
    <div class="container-fluid">
      <app-page-title title="Other Charts" subTitle="Charts"/>
      <div class="row">
        <div class="col-xl-6">
          <app-ui-card title="Bubble">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="bubbleChartOptions"
                  style="max-height: 300px"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Combo Bar & Line">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="ComboBarAndLineChartOptions"
                  style="max-height: 300px"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Stacked Bar & Line">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="stackedBarAndLineChartOptions"
                  style="max-height: 300px"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Doughnut">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="donutChartOptions"
                  style="max-height: 300px"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Multi Series Pie">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="multiSeriesPieChartOptions"
                  style="max-height: 300px"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Pie">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="pieChartOptions"
                  style="max-height: 300px"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Polar Area">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="polarChartOptions"
                  style="max-height: 300px"
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
                  style="max-height: 300px"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Scatter">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="scatterChartOptions"
                  style="max-height: 300px"
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
export class OtherCharts {
  protected readonly bubbleChartOptions = bubbleChartOptions
  protected readonly ComboBarAndLineChartOptions = comboBarAndLineChartOptions
  protected readonly stackedBarAndLineChartOptions =
    stackedBarAndLineChartOptions
  protected readonly donutChartOptions = donutChartOptions
  protected readonly multiSeriesPieChartOptions = multiSeriesPieChartOptions
  protected readonly pieChartOptions = pieChartOptions
  protected readonly polarChartOptions = polarChartOptions
  protected readonly scatterChartOptions = scatterChartOptions
  protected readonly radarChartOptions = radarChartOptions;
}
