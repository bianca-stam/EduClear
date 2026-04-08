import {Component, Input} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feed-card',
    imports: [
        NgIcon,
        NgClass,
        RouterLink,
        NgbDropdownItem,
        NgbDropdownMenu,
        NgbDropdownToggle,
        NgbDropdown
    ],
  template: `
      <div class="card">
          <div class="card-body pb-2">
              <div class="d-flex align-items-center mb-2">
                  <img [src]="avatar" alt="avatar" class="me-2 avatar-md rounded-circle"/>
                  <div class="w-100">
                      <h5 class="m-0">
                          <a routerLink="/users/profile" class="link-reset">{{ name }}</a>
                      </h5>
                      <p class="text-muted mb-0"><small>{{ time }}</small></p>
                  </div>

                  <div ngbDropdown class="ms-auto" placement="bottom-end">
                      <button
                          ngbDropdownToggle
                          class="bg-transparent border-0 text-muted drop-arrow-none card-drop p-0">
                          <ng-icon name="tablerDotsVertical" class="fs-lg"></ng-icon>
                      </button>
                      <div ngbDropdownMenu class="dropdown-menu-end">
                          <button ngbDropdownItem>
                              <ng-icon name="tablerEdit" class="me-2"/>
                              Edit Post
                          </button>
                          <button ngbDropdownItem>
                              <ng-icon name="tablerTrash" class="me-2"/>
                              Delete Post
                          </button>
                          <button ngbDropdownItem>
                              <ng-icon name="tablerShare" class="me-2"/>
                              Share
                          </button>
                          <button ngbDropdownItem>
                              <ng-icon name="tablerPin" class="me-2"/>
                              Pin to Top
                          </button>
                          <button ngbDropdownItem>
                              <ng-icon name="tablerFlag" class="me-2"/>
                              Report Post
                          </button>
                      </div>
                  </div>
              </div>

              @if (description) {
                  <p>{{ description }}</p>
              }

              <ng-content></ng-content>

              <div class="mt-2">
                  <a [routerLink]="[]" class="btn btn-sm fs-sm btn-link text-muted">
                      <ng-icon name="tablerArrowBackUp" class="me-1"/>
                      Reply
                  </a>

                  <button
                      type="button"
                      class="btn btn-sm fs-sm btn-link text-muted"
                      (click)="toggleLike()">
                      <ng-icon
                          class="me-1"
                          [name]="liked ? 'tablerHeartFill' : 'tablerHeart'"
                          [ngClass]="liked ? 'text-danger' : 'text-muted'"></ng-icon>
                      {{ liked ? 'Liked!' : 'Like' }}
                  </button>

                  <a [routerLink]="[]" class="btn btn-sm fs-sm btn-link text-muted">
                      <ng-icon name="tablerShare3" class="me-1"></ng-icon>
                      Share
                  </a>
              </div>
          </div>
      </div>

  `,
  styles: ``
})
export class FeedCard {
    @Input({required: true}) name!: string;
    @Input({required: true}) time!: string;
    @Input({required: true}) avatar!: string;
    @Input() description?: string;

    liked = false;

    toggleLike() {
        this.liked = !this.liked;
    }
}
