import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {NgClass} from '@angular/common';
import {generateInitials} from '@/app/utils/string-utils';

type ContactType = {
    id: number
    name: string
    description: string
    email: string
    phone: string
    avatar?: string
    label: {
        text: string
        variant: string
    }
    categories: {
        name: string
        variant: string
    }[]
    stats: {
        title: string
        count: number
        prefix?: string
        suffix?: string
    }[]
}

@Component({
  selector: 'app-contact-card',
    imports: [
        RouterLink,
        NgIcon,
        NgClass
    ],
  template: `
      <div class="card">
          <div class="card-body d-flex align-items-start">
              @if (item.avatar) {
                  <img [src]="item.avatar" [alt]="item.name" class="rounded-circle me-3" width="64" height="64"/>
              } @else {
                  <div class="avatar rounded-circle me-3 flex-shrink-0" style="height: 64px; width: 64px;">
            <span class="avatar-title text-bg-primary fw-semibold rounded-circle fs-22">
              {{ generateInitials(item.name) }}
            </span>
                  </div>
              }

              <div class="flex-grow-1">
                  <div class="d-flex justify-content-between align-items-center">
                      <h5 class="mb-0">
                          <a routerLink="/users/profile" class="link-reset">
                              {{ item.name }}
                          </a>
                      </h5>
                      <span class="badge badge-label" [ngClass]="'bg-' + item.label.variant">
                      {{ item.label.text }}
                    </span>
                  </div>
                  <p class="mb-3 text-muted fs-xs">{{ item.description }}</p>

                  <div class="mb-2">
                      <div class="d-flex align-items-center gap-2 mb-1">
                          <div class="avatar-xs avatar-img-size fs-24">
                <span class="avatar-title text-bg-light fs-sm rounded-circle">
                  <ng-icon name="tablerMail"></ng-icon>
                </span>
                          </div>
                          <h5 class="fs-base mb-0 fw-medium">
                              <a [routerLink]="[]" class="link-reset">{{ item.email }}</a>
                          </h5>
                      </div>

                      <div class="d-flex align-items-center gap-2">
                          <div class="avatar-xs avatar-img-size fs-24">
                <span class="avatar-title text-bg-light fs-sm rounded-circle">
                  <ng-icon name="tablerPhone"></ng-icon>
                </span>
                          </div>
                          <h5 class="fs-base mb-0 fw-medium">
                              <a [routerLink]="[]" class="link-reset">{{ item.phone }}</a>
                          </h5>
                      </div>
                  </div>

                  <div>
                      @for (category of item.categories; track $index) {
                          <span
                              class="badge me-1"
                              [ngClass]="category.variant === 'light'
                              ? 'text-bg-' + category.variant
                              : 'badge-soft-' + category.variant">
                          {{ category.name }}
                          </span>
                      }
                  </div>
              </div>
          </div>

          <div class="card-footer bg-light-subtle d-flex justify-content-between text-center border-top border-dashed">
              @for (stat of item.stats; track $index) {
                  <div>
                      <h5 class="mb-0">
                          {{ stat.prefix || '' }}{{ stat.count }}{{ stat.suffix || '' }}
                      </h5>
                      <span class="text-muted">{{ stat.title }}</span>
                  </div>
              }
          </div>
      </div>
  `,
  styles: ``
})
export class ContactCard {
    @Input() item!: ContactType;
    protected readonly generateInitials = generateInitials;
}
