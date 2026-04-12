import {Component} from '@angular/core';
import {Apexchart} from '@app/components/apexchart';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {basicFunnelChart, pyramidFunnelChart} from './data';

@Component({
    selector: 'app-apex-funnel',
    imports: [UiCard, PageTitle, Apexchart],
    templateUrl: './funnel.html',
    styles: ``
})
export class Funnel {
    basicFunnelChart = basicFunnelChart
    pyramidFunnelChart = pyramidFunnelChart
}
