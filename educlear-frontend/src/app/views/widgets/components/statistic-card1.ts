import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { CountUpModule } from 'ngx-countup';
import { StatisticCard1Type } from '../types';

@Component({
    selector: 'app-statistic-card1',
    imports: [NgIcon, CountUpModule],
    template: `
       
            <div class="card">
                <div class="card-body">
                    <div
                        class="d-flex justify-content-between align-items-center"
                    >
                        <div class="avatar fs-60 avatar-img-size flex-shrink-0">
                            <span
                                class="avatar-title bg-primary-subtle rounded-circle fs-24"
                                [class]="item.iconbgcolor"
                            >
                                <ng-icon [name]="item.icon" />
                            </span>
                        </div>
                        <div class="text-end">
                            <h3 class="mb-2 fw-normal">
                                {{ item.prefix}}<span
                                    [countUp]="item.counter"
                                    [options]="{ suffix: item.suffix,  decimalPlaces: decimalPlaces  }"
                                ></span>
                            </h3>
                            <p class="mb-0 text-muted">
                                <span>{{ item.title }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    `,
    styles: ``,
})
export class StatisticCard1 {
    @Input() item!: StatisticCard1Type;

    get decimalPlaces(): number {
    return Number.isInteger(this.item.counter) ? 0 : 2;
  }

}
