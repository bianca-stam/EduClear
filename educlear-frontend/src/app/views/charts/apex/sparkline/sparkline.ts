import {Component} from '@angular/core';
import {Apexchart} from '@app/components/apexchart';
import {PageTitle} from '@app/components/page-title';
import {spark1Options, spark2Options, spark3Options, tableChartData} from './data';

@Component({
    selector: 'app-apex-sparkline',
    imports: [PageTitle, Apexchart],
    templateUrl: './sparkline.html',
    styles: ``
})
export class Sparkline{
    spark1Options = spark1Options
    spark2Options = spark2Options
    spark3Options = spark3Options
    tableChartData = tableChartData
}
