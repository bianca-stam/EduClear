import { Component } from '@angular/core';
import {Timeline} from '@/app/views/apps/users/profile/components/timeline';
import {Settings} from '@/app/views/apps/users/profile/components/settings';
import {About} from '@/app/views/apps/users/profile/components/about';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavOutlet} from '@ng-bootstrap/ng-bootstrap';
import {NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-account',
    imports: [
        Timeline,
        Settings,
        About,
        NgbNav,
        NgbNavItem,
        NgbNavLink,
        NgIcon,
        NgbNavContent,
        NgbNavOutlet
    ],
  template: `
      <div class="card">
          <div class="card-header card-tabs d-flex align-items-center">
              <div class="flex-grow-1">
                  <h4 class="card-title">My Account</h4>
              </div>
              <ul ngbNav #nav="ngbNav" [(activeId)]="activeId" class="nav nav-tabs card-header-tabs nav-bordered">
                  <li ngbNavItem="about">
                      <a href="javascript:void(0);" ngbNavLink>
                          <ng-icon name="tablerHome" class="d-md-none d-block"/>
                          <span class="d-none d-md-block fw-bold">About Me</span>
                      </a>
                      <ng-template ngbNavContent>
                          <app-about/>
                      </ng-template>
                  </li>
                  <li ngbNavItem="timeline">
                      <a href="javascript:void(0);"  ngbNavLink>
                          <ng-icon name="tablerUserCircle" class="d-md-none d-block"/>
                          <span class="d-none d-md-block fw-bold">Timeline</span>
                      </a>
                      <ng-template ngbNavContent>
                          <app-timeline/>
                      </ng-template>
                  </li>
                  <li ngbNavItem="settings">
                      <a href="javascript:void(0);" ngbNavLink>
                          <ng-icon name="tablerSettings" class="d-md-none d-block"/>
                          <span class="d-none d-md-block fw-bold">Settings</span>
                      </a>
                      <ng-template ngbNavContent>
                          <app-settings/>
                      </ng-template>
                  </li>
              </ul>
          </div>

          <div class="card-body">
              <div class="tab-content" [ngbNavOutlet]="nav"></div>
          </div>
      </div>
  `,
  styles: ``
})
export class Account {
    activeId="timeline"
}
