import { Component } from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {RouterLink} from '@angular/router';
type ActivityItem = {
    avatar: string;
    name: string;
    message: string;
    time: string;
    image?: string;
};
@Component({
  selector: 'app-activity',
    imports: [
        NgIcon,
        RouterLink
    ],
  template: `
      <div class="card">
          <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="mb-0">Activity</h5>
                  <a [routerLink]="[]" class="link-reset fs-sm">See all</a>
              </div>

              <div class="mb-3">
                  <small class="text-muted text-uppercase">Stories About You</small>
                  <div class="d-flex align-items-center mt-2">
                      <img [src]="user7" class="rounded-circle me-2" width="32" height="32" alt="mention" />
                      <div>
                          <strong>Mentions</strong><br />
                          <span class="text-muted fs-xs">3 stories mention you</span>
                      </div>
                  </div>
              </div>

              <!-- New Activities -->
              <span class="text-muted fs-xs fw-bold text-uppercase">New</span>
              <ul class="list-unstyled mt-2 mb-0">
                  @for (item of activities; track $index) {
                      <li class="d-flex align-items-center py-1">
                          <img
                              [src]="item.avatar"
                              class="rounded-circle me-2"
                              width="36"
                              height="36"
                              [alt]="item.name" />
                          <div class="flex-grow-1">
                              <strong>{{ item.name }}</strong> {{ item.message }}
                              <br />
                              <span class="text-muted fs-xs">{{ item.time }}</span>
                          </div>

                          @if (item.image) {
                              <div>
                                  <img [src]="item.image" class="rounded" width="32" height="32" alt="commented" />
                              </div>
                          } @else {
                              <div class="text-primary">
                                  <ng-icon name="tablerUserPlus" class="fs-lg"></ng-icon>
                              </div>
                          }
                      </li>
                  }
              </ul>
          </div>
      </div>

  `,
  styles: ``
})
export class Activity {
    user7 = 'assets/images/users/user-7.jpg';

    activities: ActivityItem[] = [
        { avatar: 'assets/images/users/user-8.jpg', name: 'jenny.w', message: 'started following you', time: '2m ago' },
        { avatar: 'assets/images/users/user-9.jpg', name: 'daniel92', message: 'commented on your post', time: '3m ago', image: 'assets/images/stock/gallery-2.jpg' },
        { avatar: 'assets/images/users/user-10.jpg', name: 'amelie.design', message: 'liked your story', time: '4m ago', image: 'assets/images/stock/gallery-3.jpg' },
        { avatar: 'assets/images/users/user-5.jpg', name: 'johnny_dev', message: 'started following you', time: '6m ago' },
        { avatar: 'assets/images/users/user-6.jpg', name: 'art.gal', message: 'liked your post', time: '8m ago', image: 'assets/images/stock/gallery-2.jpg' },
    ];
}
