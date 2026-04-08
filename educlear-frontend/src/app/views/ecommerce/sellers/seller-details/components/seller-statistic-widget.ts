import {Component, Input} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {SellerStatisticType} from '@/app/views/ecommerce/sellers/types';
import {NgClass} from '@angular/common';
import {CountUpModule} from 'ngx-countup';


@Component({
    selector: 'app-seller-statistic-widget',
    imports: [
        NgIcon,
        NgClass,
        CountUpModule
    ],
    template: `
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 [attr.title]="item.title">{{ item.title }}</h5>
                    <p class="mb-0 fs-lg">
                        <ng-icon name="tablerInfoHexagonFill" class="text-muted"/>
                    </p>
                </div>
                <div class="d-flex align-items-center gap-2 my-2">
                    <div class="avatar-md flex-shrink-0">
                        <span class="avatar-title rounded-circle fs-22 d-flex align-items-center justify-content-center"
                              [ngClass]="'text-bg-' + item.variant + ' bg-opacity-90'">
                            <ng-icon [name]="item.icon" class="d-flex align-items-center"></ng-icon>
                        </span>
                    </div>
                    <h3 class="mb-0" [countUp]="item.count.value" [options]="{prefix: item.count.prefix || '', suffix : item.count.suffix || ''}">
                    </h3>
                </div>
                <p class="d-flex align-items-center gap-1 mb-0">
                    <ng-icon name="tablerPointFill" [ngClass]="'text-' + item.variant"></ng-icon>
                    <span class="text-nowrap text-muted">{{ item.description }}</span>
                    <span class="ms-auto">
                    <b>{{ item.totalCount }}</b>
                    </span>
                </p>
            </div>
        </div>
    `,
    styles: ``
})
export class SellerStatisticWidget {
    @Input() item !: SellerStatisticType
}
