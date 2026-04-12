import {Component} from '@angular/core';
import {Apexchart} from '@app/components/apexchart';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {basicBox, horizontalBox, scatterBox} from './data';

@Component({
    selector: 'app-apex-boxplot',
    imports: [PageTitle, UiCard, Apexchart],
    templateUrl: './boxplot.html',
    styles: ``
})
export class Boxplot {
    basicBox = basicBox
    scatterBox = scatterBox
    horizontalBox = horizontalBox
}
