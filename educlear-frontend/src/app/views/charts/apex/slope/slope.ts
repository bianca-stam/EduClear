import {Component} from '@angular/core';
import {Apexchart} from '@app/components/apexchart';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {basicSlopeChart, multiSlopeChart} from './data';

@Component({
    selector: 'app-apex-slope',
    imports: [UiCard, PageTitle, Apexchart],
    templateUrl: './slope.html',
    styles: ``
})
export class Slope {
    basicSlopeChart = basicSlopeChart
    multiSlopeChart = multiSlopeChart
}
