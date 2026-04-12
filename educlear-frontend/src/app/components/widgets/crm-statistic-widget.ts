import {Component, Input} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {CrmStatisticWidgetType} from '@/app/types';


@Component({
  selector: 'app-crm-statistic-widget',
    imports: [
        NgIcon
    ],
  template: `
      <div class="card mb-2">
          <div class="card-body">
              <div class="mb-3 d-flex justify-content-between align-items-center">
                  <h5 class="fs-xl mb-0">{{item.count}}</h5>
                  <span class="d-flex align-items-center gap-1">{{ item.change }} <ng-icon [name]="item.icon" class="text-{{item.changeVariant}}"/></span>
              </div>
              <p class="text-muted mb-0">{{ item.description }}</p>
          </div>
      </div>
  `,
  styles: ``
})
export class CrmStatisticWidget {
@Input() item!: CrmStatisticWidgetType
}
