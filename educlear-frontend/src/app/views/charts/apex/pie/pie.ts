import {Component} from '@angular/core';
import {Apexchart} from '@app/components/apexchart';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {
    gradientDonutChart,
    imagePieChart,
    monochromePieChart,
    patternedDonutChart,
    simpleDonutChart,
    simplePieChart
} from './data';
import {UpdatableDonutChart} from '@/app/views/charts/apex/pie/components/updatable-donut-chart';

@Component({
    selector: 'app-apex-pie',
    imports: [UiCard, PageTitle, Apexchart, UpdatableDonutChart],
    templateUrl: './pie.html',
    styles: ``
})
export class Pie {
    simplePieChart = simplePieChart
    simpleDonutChart = simpleDonutChart
    monochromePieChart = monochromePieChart
    gradientDonutChart = gradientDonutChart
    patternedDonutChart = patternedDonutChart
    imagePieChart = imagePieChart
}
