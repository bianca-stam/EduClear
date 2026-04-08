import { Component } from '@angular/core';
import {NgClass} from '@angular/common';
import {NgIcon} from '@ng-icons/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink} from '@angular/router';

type TrendingType = {
    title: string;
    description: string;
    url: string;
};


@Component({
  selector: 'app-trending',
    imports: [
        NgClass,
        NgIcon,
        NgbDropdown,
        NgbDropdownToggle,
        NgbDropdownMenu,
        NgbDropdownItem,
        RouterLink
    ],
  template: `
      <div class="card">
          <div class="card-header justify-content-between align-items-center border-dashed d-flex">
              <h5 class="mb-0">Trending</h5>

              <div ngbDropdown>
                  <button ngbDropdownToggle class="btn btn-link text-muted drop-arrow-none card-drop p-0">
                      <ng-icon name="tablerDotsVertical" class="fs-lg"></ng-icon>
                  </button>
                  <div ngbDropdownMenu class="dropdown-menu-end">
                      <button ngbDropdownItem>
                          <ng-icon name="tablerRefresh" class="me-2"></ng-icon> Refresh Feed
                      </button>
                      <button ngbDropdownItem>
                          <ng-icon name="tablerSettings" class="me-2"></ng-icon> Manage Topics
                      </button>
                      <button ngbDropdownItem>
                          <ng-icon name="tablerAlertCircle" class="me-2"></ng-icon> Report Issue
                      </button>
                  </div>
              </div>
          </div>

          <div class="card-body">
              @for (item of trendings; track $index) {
                  <div class="d-flex" [ngClass]="{ 'mb-3': $index !== trendings.length - 1 }">
                      <ng-icon name="tablerTrendingUp" class="text-primary me-2 mt-1"></ng-icon>
                      <a [routerLink]="item.url || []" class="link-reset text-decoration-none">
                          <strong>{{ item.title }}:</strong> {{ item.description }}
                      </a>
                  </div>
              }
          </div>
      </div>

  `,
  styles: ``
})
export class Trending {
    trendings: TrendingType[] = [
        {
            title: 'Golden Globes',
            description: 'The 27 Best moments from the Golden Globe Awards',
            url: '',
        },
        {
            title: 'World Cricket',
            description: 'India has won ICC T20 World Cup Yesterday',
            url: '',
        },
        {
            title: 'Antarctica',
            description: 'Melting of Totten Glacier could cause high risk to areas near by sea',
            url: '',
        },
        {
            title: 'Global Tournament',
            description: 'America has won Football match Yesterday',
            url: '',
        },
    ];
}
