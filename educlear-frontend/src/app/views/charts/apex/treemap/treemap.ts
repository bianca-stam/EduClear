import {Component} from '@angular/core';
import {Apexchart} from '@app/components/apexchart';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {
    basicTreemapOptions,
    colorRangeTreemapOptions,
    distributedTreemapOptions,
    multipleSeriesTreemapOptions
} from './data';

@Component({
    selector: 'app-apex-treemap',
    imports: [PageTitle, UiCard, Apexchart],
    templateUrl: './treemap.html',
    styles: ``
})
export class Treemap {
    basicTreemapOptions = basicTreemapOptions
    multipleSeriesTreemapOptions = multipleSeriesTreemapOptions
    distributedTreemapOptions = distributedTreemapOptions
    colorRangeTreemapOptions = colorRangeTreemapOptions
}
