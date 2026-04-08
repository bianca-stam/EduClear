import { Component } from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink} from '@ng-bootstrap/ng-bootstrap';
import {taskProgressChart} from '@/app/views/dashboards/dashboard-2/data';
import {Apexchart} from '@app/components/apexchart';

@Component({
  selector: 'app-task-progress',
    imports: [
        NgIcon,
        NgbNav,
        NgbNavItem,
        NgbNavItemRole,
        NgbNavLink,
        Apexchart
    ],
  template: `
      <div class="card">
          <div class="card-header border-dashed card-tabs d-flex align-items-center">
              <div class="flex-grow-1">
                  <h4 class="card-title">Task Progress</h4>
              </div>
              <ul ngbNav activeId="monthly" class="nav nav-tabs nav-justified card-header-tabs nav-bordered">
                  <li ngbNavItem="today">
                      <a  href="javascript:void(0);" ngbNavLink>
                          <ng-icon name="tablerHome" class="d-md-none d-block"/>
                          <span class="d-none d-md-block">Today</span>
                      </a>
                  </li>
                  <li  ngbNavItem="monthly">
                      <a href="javascript:void(0);" ngbNavLink >
                          <ng-icon name="tablerUserCircle" class="d-md-none d-block"/>
                          <span class="d-none d-md-block">Monthly</span>
                      </a>
                  </li>
                  <li  ngbNavItem="annual">
                      <a href="javascript:void(0);" ngbNavLink>
                          <ng-icon name="tablerSettings" class="d-md-none d-block"/>
                          <span class="d-none d-md-block">Annual</span>
                      </a>
                  </li>
              </ul>
          </div>
          <div class="card-body">
              <div dir="ltr">
                  <app-apexchart [getOptions]="taskProgressChart"/>
              </div>
          </div>
      </div>
  `,
  styles: ``
})
export class TaskProgress {

    protected readonly taskProgressChart = taskProgressChart;
}
