import {Component, Input} from '@angular/core';
import {StatCardType} from '@/app/views/dashboards/dashboard-1/types';
import {CountUpModule} from 'ngx-countup';
import {CommonModule} from '@angular/common';
import {NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-statistic-card',
    imports: [CountUpModule, CommonModule, NgIcon],
  template: `
      <div class="card">
          <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                  <div class="avatar fs-60 avatar-img-size flex-shrink-0">
                      <span class="avatar-title rounded-circle fs-24"
                            [ngClass]="'bg-' + item.iconBg + '-subtle text-' + item.iconBg">
                        <ng-icon [name]="item.icon"/>
                      </span>
                  </div>
                  <div class="text-end">
                      <h3 class="mb-2 fw-normal">
                          <span [countUp]="item.value" [options]="{prefix: item.prefix || '', suffix: item.suffix || ''}"></span>
                      </h3>
                      <p class="mb-0 text-muted">
                          <span>{{ item.title }}</span>
                      </p>
                  </div>
              </div>
          </div>
      </div>
  `,
  styles: ``
})
export class StatisticCard {
    @Input() item!: StatCardType;
}
