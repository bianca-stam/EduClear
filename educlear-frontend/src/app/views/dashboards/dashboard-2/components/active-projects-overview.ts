import { Component } from '@angular/core';
import {UiCard} from '@app/components/ui-card';
import {CountUpModule} from 'ngx-countup';
import {NgIcon} from '@ng-icons/core';
import {NgbProgressbar, NgbProgressbarStacked} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink} from '@angular/router';

type ProjectSource = {
    url: string
    totalTask: number
    completedTask: number
    deadlineDate: string
}


@Component({
  selector: 'app-active-projects-overview',
    imports: [
        UiCard,
        CountUpModule,
        NgIcon,
        NgbProgressbarStacked,
        NgbProgressbar,
        RouterLink
    ],
  template: `
      <app-ui-card title="Active Projects Overview" [isCloseable]="true" [isReloadable]="true" [isTogglable]="true">
          <div card-body>
              <div class="row mb-2">
                  <div class="col-lg">
                      <h3 class="mb-2 fw-bold"><span [countUp]="4852">0</span></h3>
                      <p class="mb-2 fw-semibold text-muted">Projects in Progress</p>
                  </div>
                  <div class="col-lg-auto align-self-center">
                      <ul class="list-unstyled mb-0 lh-lg">
                          <li>
                              <ng-icon name="tablerCaretRightFill" class="fs-lg align-middle d-inline-flex me-1 text-primary"/>
                              <span class="text-muted">Web Development</span>
                          </li>
                          <li>
                              <ng-icon name="tablerCaretRightFill" class="fs-lg align-middle d-inline-flex me-1 text-success"/>
                              <span class="text-muted">Mobile Apps</span>
                          </li>
                          <li>
                              <ng-icon name="tablerCaretRightFill" class="fs-lg align-middle d-inline-flex me-1 text-info"/>
                              <span class="text-muted">UI/UX Design</span>
                          </li>
                      </ul>
                  </div>
              </div>
              <ngb-progressbar-stacked style="height: 10px;" class="mb-3">
                  <ngb-progressbar [value]="40"/>
                  <ngb-progressbar [value]="35"/>
                  <ngb-progressbar [value]="25"/>
              </ngb-progressbar-stacked>

              <div class="table-responsive">
                  <table class="table table-sm table-custom table-nowrap table-hover table-centered mb-0">
                      <thead class="bg-light align-middle bg-opacity-25 thead-sm">
                      <tr class="text-uppercase fs-xxs">
                          <th class="text-muted">Project</th>
                          <th class="text-muted text-end">Tasks Completed</th>
                          <th class="text-muted text-end">Deadline</th>
                      </tr>
                      </thead>
                      <tbody>
                          @for (project of projects; track $index) {
                              <tr>
                                  <td class="text-decoration-underline">{{ project.url }}</td>
                                  <td class="text-end">{{ project.completedTask }}/{{ project.totalTask }}</td>
                                  <td class="text-end">{{ project.deadlineDate }}</td>
                              </tr>
                          }
                      </tbody>
                  </table>
              </div>
              <div class="text-center mt-3">
                  <a [routerLink]="[]" class="link-reset text-decoration-underline fw-semibold link-offset-3 d-flex justify-content-center align-items-center gap-1">
                      View all Projects
                      <ng-icon name="tablerLink"/>
                  </a>
              </div>
          </div>
      </app-ui-card>
  `,
  styles: ``
})
export class ActiveProjectsOverview {
    projects: ProjectSource[] = [
        { url: 'E-Commerce Redesign',  totalTask: 60, completedTask: 45, deadlineDate: '15 Aug 2025' },
        { url: 'Mobile Banking App',  totalTask: 40, completedTask: 28, deadlineDate: '20 Sep 2025' },
        { url: 'Corporate Website',  totalTask: 25, completedTask: 18, deadlineDate: '05 Aug 2025' },
        { url: 'POS System Upgrade',  totalTask: 50, completedTask: 32, deadlineDate: '01 Oct 2025' },
        { url: 'Inventory Management Tool',  totalTask: 20, completedTask: 12, deadlineDate: '12 Aug 2025' },
    ]
}
