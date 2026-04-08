import {Component, Input} from '@angular/core';
import {ContactType} from '@/app/views/apps/users/contacts/types';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {generateInitials} from '@/app/utils/string-utils';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-contact-card',
    imports: [
        RouterLink,
        NgIcon,
        NgbDropdownModule,
        NgClass
    ],
    template: `
        <div class="card">
            <div class="card-body text-center">
                <img [src]="contact.avatar" alt="avatar" class="rounded-circle" width="72" height="72"/>

                <h5 class="mb-0 mt-2 d-flex align-items-center justify-content-center">
                    <a routerLink="/users/profile" class="link-reset">{{ contact.name }}</a>
                    <img [src]="contact.flag" alt="flag" class="ms-1 rounded" height="16"/>
                </h5>

                <span class="text-muted fs-xs">{{ contact.role }}</span><br/>
                <span class="badge my-1" [ngClass]="'bg-' + contact.badge.color">{{ contact.badge.label }}</span><br/>

                <span class="text-muted">
                  {{ contact.username }} |
                  <a [routerLink]="[]" class="text-decoration-none text-danger">{{ contact.website }}</a>
                </span>

                <div class="mt-3">
                    <button class="btn btn-primary btn-sm me-1">Message</button>
                    <button class="btn btn-outline-secondary btn-sm">Follow</button>
                </div>

                <hr class="my-3 border-dashed"/>

                <div class="d-flex justify-content-between text-center">
                    <div>
                        <h5 class="mb-0">{{ contact.stats.posts }}</h5>
                        <span class="text-muted">Posts</span>
                    </div>
                    <div>
                        <h5 class="mb-0">{{ contact.stats.followers }}</h5>
                        <span class="text-muted">Followers</span>
                    </div>
                    <div>
                        <h5 class="mb-0">{{ contact.stats.followings }}</h5>
                        <span class="text-muted">Followings</span>
                    </div>
                </div>

                <hr class="mt-3 border-dashed"/>

                <div class="text-end text-muted fs-xs">
                    <ng-icon name="tablerRefresh" class="me-1"/>
                    Updated {{ contact.lastUpdated }}
                </div>
            </div>
        </div>

    `,
    styles: ``
})
export class ContactCard {
    @Input() contact!: ContactType

}
