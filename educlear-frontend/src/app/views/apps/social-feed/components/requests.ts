import { Component } from '@angular/core';
import {NgClass} from '@angular/common';
import {NgIcon} from '@ng-icons/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';


type RequestType = {
    avatar?: string;
    icon?: string;
    iconBg?: string;
    title: string;
    description: string;
    badge: { text: string; className: string };
    time: string;
    action: string;
};

@Component({
  selector: 'app-requests',
    imports: [
        NgClass,
        NgIcon,
        NgbDropdown,
        NgbDropdownToggle,
        NgbDropdownMenu,
        NgbDropdownItem
    ],
  template: `
      <div class="card">
          <div class="card-header justify-content-between align-items-center border-dashed d-flex">
              <h5 class="mb-0">Requests</h5>

              <div ngbDropdown>
                  <button ngbDropdownToggle class="btn btn-link text-muted drop-arrow-none card-drop p-0">
                      <ng-icon name="tablerDotsVertical" class="fs-lg"></ng-icon>
                  </button>
                  <div ngbDropdownMenu class="dropdown-menu-end">
                      <button ngbDropdownItem>
                          <ng-icon name="tablerCheck" class="me-2"></ng-icon>
                          Mark All as Read
                      </button>
                      <button ngbDropdownItem>
                          <ng-icon name="tablerTrash" class="me-2"></ng-icon>
                          Clear All
                      </button>
                  </div>
              </div>
          </div>

          <div class="card-body">
              @for (item of requests; track $index) {
                  <div
                      class="d-flex justify-content-between align-items-center"
                      [ngClass]="{ 'mb-3': $index !== requests.length - 1 }">

                      <div class="d-flex align-items-start" [ngClass]="{ 'gap-2': item.icon }">

                          @if (item.avatar) {
                              <img
                                  [src]="item.avatar"
                                  [alt]="item.title"
                                  width="32"
                                  height="32"
                                  class="avatar-xs rounded-circle me-2"/>
                          } @else {
                              <div class="avatar-xs flex-shrink-0">
                          <span class="avatar-title rounded-circle" [ngClass]="item.iconBg">
                            <ng-icon [name]="item.icon"></ng-icon>
                          </span>
                              </div>
                          }

                          <div>
                              <p class="mb-1">
                                  <strong>{{ item.title }}</strong> {{ item.description }}
                                  <span class="badge ms-1" [ngClass]="item.badge.className">
                            {{ item.badge.text }}
                          </span>
                              </p>
                              <small class="text-muted">{{ item.time }}</small>
                          </div>
                      </div>

                      <button class="btn btn-sm py-0 px-1 btn-default">
                          {{ item.action }}
                      </button>
                  </div>
              }
          </div>
      </div>

  `,
  styles: ``
})
export class Requests {
    requests: RequestType[] = [
        {
            avatar: 'assets/images/users/user-3.jpg',
            title: 'Emily Zhang',
            description: 'requested to collaborate on your design project.',
            badge: { text: 'New', className: 'bg-primary' },
            time: '2 minutes ago',
            action: 'Accept',
        },
        {
            icon: 'tablerRocket',
            iconBg: 'text-bg-info',
            title: 'New Feature:',
            description: 'Suggestion for dark mode support.',
            badge: { text: 'Pending', className: 'bg-warning text-dark' },
            time: '10 minutes ago',
            action: 'Review',
        },
        {
            avatar: 'assets/images/users/user-6.jpg',
            title: 'Client Feedback:',
            description: 'John Doe left a review on your dashboard.',
            badge: { text: 'Feedback', className: 'bg-secondary' },
            time: '30 minutes ago',
            action: 'Respond',
        },
        {
            icon: 'tablerBug',
            iconBg: 'text-bg-primary',
            title: 'Bug Report:',
            description: 'Login form issue on Safari mobile.',
            badge: { text: 'Urgent', className: 'bg-danger' },
            time: '1 hour ago',
            action: 'View',
        },
    ];
}
