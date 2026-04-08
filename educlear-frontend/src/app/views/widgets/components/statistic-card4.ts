import { Component, Input } from '@angular/core';
import { StatisticCard4Type } from '../types';
import { NgIcon } from '@ng-icons/core';
import { CountUpModule } from 'ngx-countup';

@Component({
    selector: 'app-statistic-card4',
    imports: [NgIcon, CountUpModule],
    template: `
            <div class="card">
                        <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <h6 class="mb-0 fs-sm text-uppercase">{{item.title}}</h6>
                                    <p class="mb-0 fs-lg">
                                        <ng-icon name="tablerInfoHexagonFill" class="text-muted" />
                                    </p>
                                </div>
                                <h3 class="my-3 text-primary text-center"><span [countUp]="item.counter"></span></h3>
                                <p class="mb-0">
                                    <span [class]="item.iconcolor"><ng-icon name="tablerPointFill"/></span>
                                    <span class="text-muted">{{item.footerlabel}}</span>
                                    <span class="float-end d-flex align-items-center gap-1"><ng-icon name="tablerTrendingUp" [class]="item.iconcolor2" /> <b>{{item.footervalue}}</b></span>
                   </p>
           </div>
      </div>
  `,
    styles: ``
})
export class StatisticCard4 {
    @Input() item!: StatisticCard4Type;
}
