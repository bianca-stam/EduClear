import {Component} from '@angular/core';
import {Apexchart} from '@app/components/apexchart';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {
    colorRangeHeatmapChart,
    multipleSeriesHeatmapChart,
    rangeWithoutShadesHeatmapChart,
    singleSeriesHeatmapChart
} from './data';

@Component({
    selector: 'app-apex-heatmap',
    imports: [UiCard, PageTitle, Apexchart],
    templateUrl: './heatmap.html',
    styles: ``
})
export class Heatmap {
    singleSeriesHeatmapChart = singleSeriesHeatmapChart
    multipleSeriesHeatmapChart = multipleSeriesHeatmapChart
    colorRangeHeatmapChart = colorRangeHeatmapChart
    rangeWithoutShadesHeatmapChart = rangeWithoutShadesHeatmapChart
}
