import { Component } from '@angular/core';
import { Apexchart } from '@app/components/apexchart';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';
import { basicPolarAreaChart, monochromePolarAreaChart } from './data';

@Component({
  selector: 'app-apex-polar',
  imports: [PageTitle,UiCard,Apexchart],
  templateUrl: './polar.html',
  styles: ``
})
export class Polar {
monochromePolarAreaChart= monochromePolarAreaChart
basicPolarAreaChart= basicPolarAreaChart
}
