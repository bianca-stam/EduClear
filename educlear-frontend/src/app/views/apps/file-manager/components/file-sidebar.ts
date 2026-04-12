import {Component} from '@angular/core';
import {FileMenuType} from '@/app/views/apps/file-manager/types';
import {NgIcon} from '@ng-icons/core';
import {RouterLink} from '@angular/router';
import {SimplebarAngularModule} from 'simplebar-angular';

@Component({
    selector: 'app-file-sidebar',
    imports: [NgIcon, RouterLink, SimplebarAngularModule],
    template: `
        <div class="card h-100  mb-0 rounded-0 border-0">
            <ngx-simplebar style="height: 100%">
                <div class="card-body w-100">
                    <a [routerLink]="[]" class="btn btn-danger fw-medium w-100">Upload Files</a>

                    <div class="list-group list-group-flush list-custom mt-3">
                        @for (item of fileMenuItems; track i; let i = $index; let first = $first) {
                            <a
                                [href]="item.link"
                                class="list-group-item list-group-item-action"
                                [class.active]="first"
                            >
                                <div class="d-inline-flex align-items-center gap-1">
                                    <ng-icon [name]="item.icon" class="me-1 opacity-75 fs-lg"></ng-icon>
                                    <span class="align-middle">{{ item.label }}</span>
                                </div>
                                @if (item.badge) {
                                    <span
                                        class="badge align-middle bg-{{item.badge.variant}}-subtle text-{{item.badge.variant}} float-end fs-xxs">
                                        {{ item.badge.text }}
                                    </span>
                                }
                            </a>
                        }

                        <div class="list-group-item mt-2">
                            <span class="align-middle">Categories</span>
                        </div>

                        @for (category of fileCategories; track i;let i = $index) {
                        <a href="javascript:void(0);"
                           class="list-group-item list-group-item-action d-flex align-items-center gap-1">
                            <ng-icon [name]="category.icon"
                                     class="me-1  fs-sm text-{{category.variant}}"></ng-icon>
                            <span>{{ category.label }}</span>
                        </a>
                        }
                    </div>
                </div>
            </ngx-simplebar>
        </div>
    `,
    styles: ``
})
export class FileSidebar {
    fileMenuItems: FileMenuType[] = [
        {
            label: 'My Files',
            icon: 'tablerFolder',
            badge: {
                text: "12",
                variant: "danger",
            },
            link: '/apps/file-manager'
        },
        {
            label: 'Shared with Me',
            icon: 'tablerShare',
            link: 'javascript:void(0);'
        },
        {
            label: 'Recent',
            icon: 'tablerClock',
            link: 'javascript:void(0);'
        },
        {
            label: 'Favourites',
            icon: 'tablerStar',
            link: 'javascript:void(0);'
        },
        {
            label: 'Downloads',
            icon: 'tablerDownload',
            link: 'javascript:void(0);'
        },
        {
            label: 'Trash',
            icon: 'tablerTrash',
            link: 'javascript:void(0);'
        }
    ];

    fileCategories = [
        {
            label: 'Work',
            icon: 'tablerChartDonutFill',
            variant: 'primary'
        },
        {
            label: 'Projects',
            icon: 'tablerChartDonutFill',
            variant: 'purple'
        },
        {
            label: 'Media',
            icon: 'tablerChartDonutFill',
            variant: 'info'
        },
        {
            label: 'Documents',
            icon: 'tablerChartDonutFill',
            variant: 'warning'
        }
    ];
}
