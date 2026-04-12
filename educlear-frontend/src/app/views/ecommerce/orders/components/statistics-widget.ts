import {Component, Input} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {OrderStatisticsType} from '@/app/views/ecommerce/orders/types';
import {CountUpModule} from 'ngx-countup';

@Component({
    selector: 'app-statistics-widget',
    imports: [
        NgIcon,
        CountUpModule
    ],
    template: `
        <div class="card mb-1">
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <h3 class="mb-0" [countUp]="item.count" [options]="{prefix: item.prefix || '', suffix: item.suffix || ''}">{{ item.count }}</h3>
                    <div class="avatar-md flex-shrink-0">
                            <span class="avatar-title text-bg-{{item.variant}} rounded-circle fs-22">
                                <ng-icon [name]="item.icon" />
                            </span>
                    </div>
                </div>
                <p class="mb-0 text-uppercase fs-xs fw-bold">
                    {{item.title}}
                    <span class="float-end badge badge-soft-{{item.variant}}">{{ item.change }}%</span>
                </p>
            </div>
        </div>
    `,
    styles: ``
})
export class StatisticsWidget {
    @Input() item!: OrderStatisticsType
}
