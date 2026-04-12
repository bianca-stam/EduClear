import { Component, Input } from '@angular/core';
import { StatisticCard7Type } from '../types';
import { NgIcon } from '@ng-icons/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-statistic-card7',
    imports: [NgIcon, NgbProgressbar],
    template: `
       <div class="card rounded-0 border shadow-none border-dashed mb-0"
             [class]="item.variant ? 'bg-opacity-10 bg-' + item.variant + ' border-' + item.variant : ''">
            <div class="card-body">
                <div class="mb-3 d-flex justify-content-between align-items-center">
                    <h5 class="fs-xl mb-0">{{ item.count.prefix || '' }}{{ item.count.value }}
                        @if (item.count.suffix) {
                            <small class="fs-6">{{ item.count.suffix }}</small>
                        }
                    </h5>
                    <span>{{ item.percentage }}%
                        <ng-icon [name]="item.percentageIcon" [class]="item.iconcolor"/>
                    </span>
                </div>
                <p class="text-muted mb-2"><span>{{ item.title }}</span></p>

                <ngb-progressbar [value]="item.progress" class="progress-sm mb-0"
                                 [textType]="item.variant ? item.variant : 'secondary'"
                                 [type]="item.variant ? item.variant : 'secondary'"/>
            </div>
        </div>
    `,
    styles: ``,
})
export class StatisticCard7 {
    @Input() item!: StatisticCard7Type;
}
