import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Apexchart} from '@app/components/apexchart';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {
    basicColumnChart,
    columnWithGroupLabelChart,
    columnWithMarkersChart,
    datalabelsColumnChart,
    distributedColumnChart,
    dumbbellChart,
    fullStackedColumnChart,
    groupedStackedColumnChart,
    negativeValueColumnChart,
    rangeColumnChart,
    rotateLabelsColumnChart,
    stackedColumnChart
} from './data';
import { DynamicLoadedChart } from "./components/dynamic-loaded-chart";


@Component({
    selector: 'app-apex-column',
    imports: [PageTitle, UiCard, FormsModule, Apexchart, DynamicLoadedChart],
    templateUrl: './column.html',
    styles: ``
})
export class Column {
    basicColumnChart = basicColumnChart
    datalabelsColumnChart = datalabelsColumnChart
    stackedColumnChart = stackedColumnChart
    fullStackedColumnChart = fullStackedColumnChart
    groupedStackedColumnChart = groupedStackedColumnChart
    dumbbellChart = dumbbellChart
    columnWithMarkersChart = columnWithMarkersChart
    columnWithGroupLabelChart = columnWithGroupLabelChart
    rotateLabelsColumnChart = rotateLabelsColumnChart
    negativeValueColumnChart = negativeValueColumnChart
    distributedColumnChart = distributedColumnChart
    rangeColumnChart = rangeColumnChart
}
