import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { PageTitle } from "@app/components/page-title";
import { StatisticCard1 } from './components/statistic-card1';
import { StatisticCard2 } from "./components/statistic-card2";
import { StatisticCard3 } from "./components/statistic-card3";
import { StatisticCard4 } from "./components/statistic-card4";
import { StatisticCard5 } from "./components/statistic-card5";
import { StatisticCard6 } from "./components/statistic-card6";
import { StatisticCard7 } from "./components/statistic-card7";
import { Chatcard } from './components/chatcard';
import { TrafficSources } from "./components/traffic-sources";
import { TopCountries } from "./components/top-countries";
import { statisticCards1, statisticCards2, statisticCards3, statisticCards4, statisticCards5, statisticCards6, statisticCards7 } from './data';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-widgets',
    imports: [PageTitle, RouterLink, NgIcon, StatisticCard1, StatisticCard2, StatisticCard3, StatisticCard4, StatisticCard5, StatisticCard6, StatisticCard7, Chatcard, TrafficSources, TopCountries, NgbTooltip],
  templateUrl: './widgets.html',
  styles: ``
})
export class Widgets {
 protected readonly statisticcard = statisticCards1;
 protected readonly statisticCards2 = statisticCards2;
 protected readonly statisticCards3 = statisticCards3;
 protected readonly statisticCards4 = statisticCards4;
 protected readonly statisticCards5 = statisticCards5;
 protected readonly statisticCards6 = statisticCards6;
 protected readonly statisticCards7 = statisticCards7;
}
