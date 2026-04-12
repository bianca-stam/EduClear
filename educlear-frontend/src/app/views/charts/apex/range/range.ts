import {Component} from '@angular/core';
import {Apexchart} from '@app/components/apexchart';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {basicRangeArea, rangeAreaWithLine} from './data';

@Component({
    selector: 'app-apex-range',
    imports: [UiCard, PageTitle, Apexchart],
    templateUrl: './range.html',
    styles: ``
})
export class Range {
    basicRangeArea = basicRangeArea
    rangeAreaWithLine = rangeAreaWithLine
}
