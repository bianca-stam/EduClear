import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { StatisticCard3Type } from '../types';

@Component({
    selector: 'app-statistic-card3',
    imports: [NgIcon],
    template: `
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 [title]="item.title">{{ item.heading }}</h5>
                    <p class="mb-0 fs-lg">
                        <ng-icon
                            name="tablerInfoHexagonFill"
                            class="text-muted"
                        ></ng-icon>
                    </p>
                </div>
                <div class="d-flex align-items-center gap-2 my-3">
                    <div class="avatar-md flex-shrink-0">
                        <span
                            class="avatar-title  bg-opacity-90 rounded-circle fs-22"
                            [class]="item.iconbgcolor"
                        >
                            <ng-icon [name]="item.icon"></ng-icon>
                        </span>
                    </div>
                    <h3 class="mb-0">{{ item.number }}</h3>
                </div>
                <p class="mb-0">
                    <span [class]="item.iconcolor"
                        ><ng-icon name="tablerPointFill"></ng-icon
                    ></span>
                    <span class="text-nowrap text-muted">{{
                        item.footerLabel
                    }}</span>
                    <span class="float-end"
                        ><b>{{ item.footerValue }}</b></span
                    >
                </p>
            </div>
        </div>
    `,
    styles: ``,
})
export class StatisticCard3 {
    @Input() item!: StatisticCard3Type;
}
