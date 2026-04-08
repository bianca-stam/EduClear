import { Component, Input } from '@angular/core';
import { StatisticCard6Type } from '../types';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-statistic-card6',
  imports: [NgIcon],
  template: `
   <div class="card">
                 <div class="card-body d-flex align-items-center">
                                <div class="me-3">
                                    <img [src]="item.image" alt="User" class="rounded-circle avatar-xl">
                                </div>
                                <div>
                                    <h5 class="mb-1">{{item.name}}</h5>
                                    <p class="text-muted fs-xs mb-0">{{item.role}}</p>
                                </div>
                                <button type="button" class="btn ms-auto" 
                                [class]="item.iconbgcolor">
                                  <ng-icon [name]="item.icon" class="fs-lg"></ng-icon></button>
                            </div>
                     </div>
  `,
  styles: ``
})
export class StatisticCard6 {
 @Input() item!: StatisticCard6Type;
}
