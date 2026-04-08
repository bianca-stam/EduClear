import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {SimplebarAngularModule} from 'simplebar-angular';

type EmailSidebarItem = {
    label: string;
    icon: string;
    link: string;
    badge?: {
        variant: string;
        text: string;
    }
}

@Component({
    selector: 'app-email-sidebar',
    imports: [
        RouterLink,
        NgIcon,
        SimplebarAngularModule,
    ],
    template: `
        <ngx-simplebar style="height: 100%">
            <div class="card  mb-0 rounded-end-0" style="height:740px">
                <div class="card-body w-100">
                    <a routerLink="/apps/email/compose" class="btn btn-danger fw-medium w-100">Compose</a>

                    <div class="list-group list-group-flush list-custom mt-3">
                        @for (item of emailSidebarMenu; track i; let i = $index; let first = $first) {
                            <a [routerLink]="item.link ? item.link : []"
                               class="list-group-item list-group-item-action" [class.active]="first">
                                <ng-icon [name]="item.icon" class="me-2 opacity-75 fs-lg align-middle d-inline-flex"/>
                                <span class="align-middle">{{ item.label }}</span>
                                @if (item.badge) {
                                    <span
                                        class="badge align-middle bg-{{item.badge.variant}}-subtle fs-xxs text-{{item.badge.variant}} float-end">{{ item.badge.text }}</span>
                                }
                            </a>
                        }

                        <div class="list-group-item mt-2">
                            <span class="align-middle">Labels</span>
                        </div>
                        @for (item of labels; track i; let i = $index; ) {
                            <a [routerLink]="[]"
                               class="list-group-item list-group-item-action d-flex align-items-center gap-1">
                                <ng-icon name="tablerChartDonutFill" class="me-1 fs-sm text-{{item.variant}}"/>
                                <span class="align-middle">{{ item.name }}</span>
                            </a>
                        }
                    </div>

                </div>

            </div>
        </ngx-simplebar>
    `,
    styles: ``
})
export class EmailSidebar {
    labels = [{name: "Business", variant: "primary"}, {name: "Personal", variant: "purple"}, {
        name: "Friends",
        variant: "info"
    }, {name: "Family", variant: "warning"}];
    emailSidebarMenu: EmailSidebarItem[] = [
        {
            label: 'Inbox',
            icon: 'tablerInbox',
            link: '/apps/email/inbox',
            badge: {variant: 'danger', text: '21'}
        },
        {
            label: 'Sent',
            icon: 'tablerSend',
            link: ''
        },
        {
            label: 'Starred',
            icon: 'tablerStar',
            link: ''
        },
        {
            label: 'Scheduled',
            icon: 'tablerClock',
            link: ''
        },
        {
            label: 'Drafts',
            icon: 'tablerPencil',
            link: '',
            badge: {variant: 'secondary', text: '9'}
        },
        {
            label: 'Important',
            icon: 'tablerAlertCircle',
            link: ''
        },
        {
            label: 'Spam',
            icon: 'tablerBan',
            link: ''
        },
        {
            label: 'Trash',
            icon: 'tablerTrash',
            link: ''
        },

    ]
}
