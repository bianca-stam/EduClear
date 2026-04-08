import { Component, Input } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIcon } from '@ng-icons/core';
import { StatisticCard5Type } from '../types';

@Component({
    selector: 'app-statistic-card5',
    imports: [NgIcon, NgbProgressbarModule],
    template: `
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="avatar avatar-lg flex-shrink-0">
                        <span
                            class="avatar-title rounded fs-24"
                            [class]="item.iconbgcolor"
                        >
                            <ng-icon [name]="item.icon"></ng-icon>
                        </span>
                    </div>
                    <div class="text-end">
                        <h4 class="mb-0">{{ item.number }}</h4>
                        <p class="mb-0 text-muted">{{ item.title }}</p>
                    </div>
                </div>
                <div class="mt-4">
                    <div class="d-flex justify-content-between mb-1">
                        <span class="text-muted fs-xs fw-semibold">{{
                            item.progresstitle
                        }}</span>
                        <span class="text-muted">{{ item.progress }}%</span>
                    </div>
                    <ngb-progressbar
                        [value]="item.progress"
                        [height]="'6px'"
                        [type]="item.progresscolor"
                    >
                    </ngb-progressbar>
                </div>
            </div>
        </div>
    `,
    styles: ``,
})
export class StatisticCard5 {
    @Input() item!: StatisticCard5Type;
}
