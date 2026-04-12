import { Component } from '@angular/core';
import {NgClass} from '@angular/common';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';

type MenuItem = {
    label: string;
    link: string;
    icon: string;
    badge?: { text: string; variant: string };
};

type CategoryType = {
    label: string;
    link: string;
    variant: string;
};

@Component({
  selector: 'app-social-sidebar',
    imports: [
        NgClass,
        NgbDropdownItem,
        NgbDropdown,
        NgbDropdownToggle,
        NgbDropdownMenu,
        RouterLink,
        NgIcon
    ],
  template: `
      <div class="card card-top-sticky">
          <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                  <div class="me-2 position-relative">
                      <img src="assets/images/users/user-3.jpg" alt="avatar" class="rounded" width="42" height="42"/>
                  </div>
                  <div>
                      <h5 class="mb-0 d-flex align-items-center">
                          <a routerLink="/users/profile" class="link-reset">Geneva Lee</a>
                          <img src="assets/images/flags/us.svg" alt="US" class="ms-2 rounded-circle" height="16"/>
                      </h5>
                      <p class="text-muted mb-0">Content Creator</p>
                  </div>
                  <div class="ms-auto" ngbDropdown placement="bottom-end">
                      <button
                          class="btn btn-icon btn-ghost-light text-muted drop-arrow-none"
                          ngbDropdownToggle>
                          <ng-icon name="tablerDotsVertical" class="fs-xl"></ng-icon>
                      </button>
                      <ul ngbDropdownMenu class="dropdown-menu-end">
                          <li><a ngbDropdownItem [routerLink]="[]">View Profile</a></li>
                          <li><a ngbDropdownItem [routerLink]="[]">Send Message</a></li>
                          <li><a ngbDropdownItem [routerLink]="[]">Copy Profile Link</a></li>
                          <li>
                              <hr class="dropdown-divider"/>
                          </li>
                          <li><a ngbDropdownItem [routerLink]="[]">Edit Profile</a></li>
                          <li><a ngbDropdownItem class="text-danger" href="#">Block User</a></li>
                          <li><a ngbDropdownItem class="text-danger" href="#">Report User</a></li>
                      </ul>
                  </div>
              </div>

              <div class="list-group list-group-flush list-custom mt-3">
                  @for (item of mainMenu; track $index) {
                      <a
                          [routerLink]="item.link"
                          [ngClass]="['list-group-item', 'list-group-item-action', $index === 0 ? 'active' : '']">
                          <ng-icon [name]="item.icon" class="me-1 opacity-75 fs-lg"/>
                          <span class="align-middle">{{ item.label }}</span>
                          @if (item.badge) {
                              <span class="badge float-end" [ngClass]="'bg-' + item.badge.variant + '-subtle' + ' text-' + item.badge.variant">
                              {{ item.badge.text }}
                            </span>
                          }
                      </a>
                  }

                  <div class="list-group-item mt-2">
                      <span class="align-middle">Categories</span>
                  </div>

                  @for (category of categories; track $index) {
                      <a [routerLink]="category.link" class="list-group-item list-group-item-action">
                          <ng-icon name="tablerTag" class="me-1 align-middle fs-sm"
                                   [ngClass]="'text-' + category.variant"></ng-icon>
                          <span class="align-middle">{{ category.label }}</span>
                      </a>
                  }
              </div>
          </div>
      </div>

  `,
  styles: ``
})
export class SocialSidebar {
    mainMenu: MenuItem[] = [
        { label: 'News Feed', link: '/news', icon: 'tablerHome' },
        { label: 'Messages', link: '/messages', icon: 'tablerMessageCircle', badge: { text: '5', variant: 'danger' } },
        { label: 'Friends', link: '/friends', icon: 'tablerUsers' },
        { label: 'Notifications', link: '/notifications', icon: 'tablerBell', badge: { text: '12', variant: 'warning' } },
        { label: 'Groups', link: '/groups', icon: 'tablerLayoutGrid' },
        { label: 'Pages', link: '/pages', icon: 'tablerBook' },
        { label: 'Events', link: '/events', icon: 'tablerCalendarEvent' },
        { label: 'Settings', link: '/settings', icon: 'tablerSettings' },
    ];

    categories: CategoryType[] = [
        { label: 'Technology', link: '/category/technology', variant: 'primary' },
        { label: 'Travel', link: '/category/travel', variant: 'success' },
        { label: 'Lifestyle', link: '/category/lifestyle', variant: 'danger' },
        { label: 'Photography', link: '/category/photography', variant: 'info' },
    ];
}
