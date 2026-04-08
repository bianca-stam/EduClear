import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {UiCard} from '@app/components/ui-card';
import {NgIcon} from '@ng-icons/core';
import {countriesData} from '@/app/views/dashboards/dashboard-2/data';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-project-by-country',
    imports: [
        RouterLink,
        UiCard,
        NgIcon,
        NgClass
    ],
  template: `
      <app-ui-card title="Top Projects by Country" [isCloseable]="true" [isReloadable]="true" [isTogglable]="true">
          <div card-body>
              @for (country of countriesData; track $index) {
                  <div class="d-flex align-items-center gap-2 mb-3">
                      <img [src]="country.flag" [alt]="country.name"
                           class="avatar-xxs rounded" height="16" width="16" />
                      <h5 class="mb-0 fw-medium">
                          <a [routerLink]="[]" class="link-reset">
                              {{ country.name }}
                          </a>
                          <small class="text-muted ms-1">
                              {{ country.activeProjects }} Active Projects
                          </small>
                      </h5>
                      <div class="ms-auto">
                          <div class="d-flex align-items-center gap-3">
                              <p class="mb-0 fw-medium">{{ country.projectName }}</p>
                              <p class="badge badge-label fs-xxs mb-0"
                                 [ngClass]="'badge-soft-' + country.trend.type">
                                  {{ country.trend.type === 'danger' ? '-' : (country.trend.type === 'success' ? '+' : '') }}
                                  {{ country.trend.value }}%
                              </p>
                          </div>
                      </div>
                  </div>
              }

              <div class="text-center mt-4">
                  <a routerLink="/apps/chat"
                     class="link-reset text-decoration-underline fw-semibold link-offset-3 d-flex justify-content-center align-items-center gap-1">
                      View all Projects <ng-icon name="tablerBriefcase" />
                  </a>
              </div>
          </div>
      </app-ui-card>
  `,
  styles: ``
})
export class ProjectByCountry {

    protected readonly countriesData = countriesData;
}
