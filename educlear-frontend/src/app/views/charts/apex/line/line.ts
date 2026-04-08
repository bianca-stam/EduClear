import {Component} from '@angular/core';
import {Apexchart} from '@app/components/apexchart';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {
    brushChartMain,
    brushChartOverview,
    dashedLineChart,
    gradientLineChart,
    lineChart,
    lineWithAnnotationsChart,
    lineWithDataLabelChart,
    missingDataLineChart,
    stepLineChart,
    syncChartPrimary,
    syncChartSecondary,
    zoomableLineChart
} from './data';

@Component({
    selector: 'app-apex-line',
    imports: [UiCard, PageTitle, Apexchart],
    templateUrl: './line.html',
    styles: ``
})
export class Line {
    lineChart = lineChart
    lineWithDataLabelChart = lineWithDataLabelChart
    zoomableLineChart = zoomableLineChart
    lineWithAnnotationsChart = lineWithAnnotationsChart
    syncChartPrimary = syncChartPrimary
    syncChartSecondary = syncChartSecondary
    gradientLineChart = gradientLineChart
    missingDataLineChart = missingDataLineChart
    dashedLineChart = dashedLineChart
    stepLineChart = stepLineChart
    brushChartMain = brushChartMain
    brushChartOverview = brushChartOverview
}
