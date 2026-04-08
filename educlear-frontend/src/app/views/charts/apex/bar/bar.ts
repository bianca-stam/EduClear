import {Component} from '@angular/core';
import {Apexchart} from '@app/components/apexchart';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {
    barWithMarkersChart,
    basicBarChart,
    dataLabelsBarChart,
    fullStackedBarChart,
    groupedBarChart,
    groupedStackedBarChart,
    imageFillBarChart,
    negativeBarChart,
    patternBarChart,
    reversedBarChart,
    stackedBarChart
} from './data';

@Component({
    selector: 'app-apex-bar',
    imports: [UiCard, PageTitle, Apexchart],
    templateUrl: './bar.html',
    styles: ``
})
export class Bar {
    basicBarChart = basicBarChart;
    groupedBarChart = groupedBarChart;
    stackedBarChart = stackedBarChart;
    fullStackedBarChart = fullStackedBarChart;
    groupedStackedBarChart = groupedStackedBarChart;
    negativeBarChart = negativeBarChart;
    reversedBarChart = reversedBarChart;
    imageFillBarChart = imageFillBarChart;
    dataLabelsBarChart = dataLabelsBarChart;
    patternBarChart = patternBarChart;
    barWithMarkersChart = barWithMarkersChart
}
