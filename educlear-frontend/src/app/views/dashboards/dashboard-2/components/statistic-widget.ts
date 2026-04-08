import {Component, Input} from '@angular/core';
import {StatisticType} from '@/app/views/dashboards/dashboard-2/types';
import {NgClass} from '@angular/common';
import {NgIcon} from '@ng-icons/core';
import {NgbProgressbar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-statistic-widget',
    imports: [
        NgClass,
        NgIcon,
        NgbProgressbar
    ],
  template: `
      <div class="card">
          <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                  <div class="avatar avatar-lg flex-shrink-0">
            <span class="avatar-title rounded fs-24"
                  [ngClass]="'bg-' + item.variant + '-subtle text-' + item.variant">
              <ng-icon [name]="item.icon"></ng-icon>
            </span>
                  </div>
                  <div class="text-end">
                      <h4 class="mb-0">{{ item.count }}</h4>
                      <p class="mb-0 text-muted">{{ item.title }}</p>
                  </div>
              </div>
              <div class="mt-4">
                  <div class="d-flex justify-content-between mb-1">
                      <span class="text-muted fs-xs fw-semibold">{{ item.subtitle }}</span>
                      <span class="text-muted">{{ item.progress }}%</span>
                  </div>
                  <ngb-progressbar [value]="item.progress" [type]="item.variant" style="height: 6px;"/>
              </div>
          </div>
      </div>
  `,
  styles: ``
})
export class StatisticWidget {
    @Input() item!: StatisticType;
}
