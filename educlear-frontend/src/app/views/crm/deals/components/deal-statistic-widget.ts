import {Component, Input} from '@angular/core';
import {DealWidgetType} from '@/app/views/crm/deals/types';
import {NgClass} from '@angular/common';
import {NgIcon} from '@ng-icons/core';
import {NgbProgressbar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deal-statistic-widget',
    imports: [
        NgClass,
        NgIcon,
        NgbProgressbar
    ],
  template: `
      <div class="card mb-2">
          <div class="card-body">
              <div class="mb-3 d-flex justify-content-between align-items-center">
                  <h5 class="fs-xl mb-0">{{ item.count }}</h5>
                  <span>
            {{ item.change }}
                      <ng-icon [name]="item.icon" [ngClass]="['text-' + item.variant]"></ng-icon>
          </span>
              </div>
              <p class="text-muted mb-2">{{ item.title }}</p>

              <ngb-progressbar
                  [value]="item.progress"
                  [type]="item.variant"
                  height="6px"
                  class="mb-0">
              </ngb-progressbar>
          </div>
      </div>
  `,
  styles: ``
})
export class DealStatisticWidget {
    @Input() item!: DealWidgetType;
}
