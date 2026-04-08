import { Component } from '@angular/core'
import { UiCard } from '@app/components/ui-card'
import { Chartjs } from '@app/components/chartjs'
import {
  basicBarChartOptions,
  borderedRadiusChartOptions,
  floatingChartOptions,
  stackedChartOptions,
  stackedGroupsChartOptions,
  verticalChartOptions,
} from '@/app/views/charts/chartjs/bar-charts/data'
import {PageTitle} from '@app/components/page-title';

@Component({
  selector: 'app-bar-charts',
  imports: [UiCard, Chartjs, PageTitle],
  template: `
    <div class="container-fluid">
      <app-page-title title="Bar Charts" subTitle="Charts"/>
      <div class="row">
        <div class="col-xl-6">
          <app-ui-card title="Basic Bar">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="basicBarChartOptions"
                  style="max-height: 300px"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Border Radius">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="borderedRadiusChartOptions"
                  style="max-height: 300px"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Floating">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="floatingChartOptions"
                  style="max-height: 300px"
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
                  style="max-height: 300px"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Stacked with Groups">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="stackedGroupsChartOptions"
                  style="max-height: 300px"
                />
              </div>
            </div>
          </app-ui-card>
        </div>

        <div class="col-xl-6">
          <app-ui-card title="Vertical">
            <div dir="ltr" card-body>
              <div class="mt-3">
                <app-chartjs
                  [getOptions]="verticalChartOptions"
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
export class BarCharts {
  protected readonly basicBarChartOptions = basicBarChartOptions
  protected readonly borderedRadiusChartOptions = borderedRadiusChartOptions
  protected readonly floatingChartOptions = floatingChartOptions
  protected readonly stackedChartOptions = stackedChartOptions
  protected readonly stackedGroupsChartOptions = stackedGroupsChartOptions
  protected readonly verticalChartOptions = verticalChartOptions
}
