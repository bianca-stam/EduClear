import {Component} from '@angular/core';
import {Apexchart} from '@app/components/apexchart';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {basicRadarChart, polygonRadarChart} from './data';
import {ApexOptions} from 'ng-apexcharts';
import {getColor} from '@/app/utils/color-utils';
import {UpdatableRadarChart} from '@/app/views/charts/apex/radar/components/updatable-radar-chart';

@Component({
    selector: 'app-apex-radar',
    imports: [PageTitle, UiCard, Apexchart, UpdatableRadarChart],
    templateUrl: './radar.html',
    styles: ``
})
export class Radar {
    basicRadarChart = basicRadarChart
    polygonRadarChart = polygonRadarChart
}
