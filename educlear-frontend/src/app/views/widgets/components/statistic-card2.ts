import { Component, Input } from '@angular/core';
import { NgIcon } from "@ng-icons/core";
import { CountUpModule } from 'ngx-countup';
import { StatisticCard2Type } from '../types';

@Component({
    selector: 'app-statistic-card2',
    imports: [NgIcon, CountUpModule],
    template: `
                        <div class="card">
                            <div class="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h3 class="mb-2 fw-normal">{{item.prefix}}<span  [countUp]="item.counter" [options]="{suffix : item.suffix,  decimalPlaces: decimalPlaces}"></span></h3>
                                    <p class="mb-0 text-muted">{{item.title}}</p>
                                </div>
                                <div class="avatar fs-60 avatar-img-size">
                                    <span class="avatar-title rounded-circle fs-24" [class]="item.iconbgcolor">
                                       <ng-icon [name]="item.icon"></ng-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
    `,
    styles: ``,
})
export class StatisticCard2 {
   @Input() item!: StatisticCard2Type;

    get decimalPlaces(): number {
    return Number.isInteger(this.item.counter) ? 0 : 2;
  }
}
