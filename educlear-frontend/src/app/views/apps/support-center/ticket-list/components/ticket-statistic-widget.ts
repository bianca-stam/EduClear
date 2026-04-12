import {Component, Input} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {NgClass} from '@angular/common';
import {CountUpModule} from 'ngx-countup';
import {TicketStatisticType} from '@/app/views/apps/support-center/ticket-list/types';

@Component({
  selector: 'app-ticket-statistic-widget',
    imports: [
        NgIcon,
        NgClass,
        CountUpModule
    ],
  template: `
      <div class="card">
          <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                  <div class="avatar fs-60 avatar-img-size flex-shrink-0">
              <span class="avatar-title rounded-circle fs-24" [ngClass]="[ticket.bgColor, ticket.textColor]">
                <ng-icon [name]="ticket.icon"></ng-icon>
              </span>
                  </div>
                  <div class="text-end">
                      <h3 class="mb-2 fw-normal">
                          <span [countUp]="ticket.value" [options]="{duration: 2}"></span>
                      </h3>
                      <p class="mb-0 text-muted">
                          <span>{{ ticket.title }}</span>
                      </p>
                  </div>
              </div>
          </div>
      </div>
  `,
  styles: ``
})
export class TicketStatisticWidget {
@Input({required: true}) ticket!: TicketStatisticType;
}
