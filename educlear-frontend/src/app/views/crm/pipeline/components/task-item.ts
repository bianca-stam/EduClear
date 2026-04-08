import {Component, Input} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink} from '@angular/router';
import {TaskItemType} from '@/app/views/crm/pipeline/types';

@Component({
    selector: 'app-task-item',
    imports: [
        NgIcon,
        NgbDropdownModule,
        RouterLink,
    ],
    template: `
        <div class="card shadow border-light mb-2">
            <div class="card-body">
                <div class="d-flex align-items-center mb-2">
                    <div><h5 class="mb-0 fw-semibold"><a class="link-reset" routerLink="/">{{ item.title }}</a></h5>
                        <small
                            class="text-muted">{{ item.company }}</small></div>
                    <div class="ms-auto">
                        <div ngbDropdown>
                            <a href="javascript:void(0)" ngbDropdownToggle
                               class="btn btn-icon btn-sm  drop-arrow-none btn-ghost-light text-muted">
                                <ng-icon name="tablerDotsVertical" class="fs-xl"/>
                            </a>
                            <ul ngbDropdownMenu class="dropdown-menu-end">
                                <li><a ngbDropdownItem href="javascript:void(0)">
                                    <ng-icon name="tablerShare" class="me-2"/>
                                    Share</a></li>
                                <li><a ngbDropdownItem href="javascript:void(0)">
                                    <ng-icon name="tablerEdit" class="me-2"/>
                                    Edit</a></li>
                                <li><a ngbDropdownItem href="javascript:void(0)">
                                    <ng-icon name="tablerBan" class="me-2"/>
                                    Block</a></li>
                                <li><a ngbDropdownItem class="text-danger" href="javascript:void(0)">
                                    <ng-icon
                                        name="tablerTrash" class="me-2"/>
                                    Delete</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-1"><img class="rounded-circle avatar-xs" alt="Mark Allen"
                                                                      [src]="item.user"><span
                        class="fw-medium text-muted fs-sm">{{ item.userName }}</span></div>
                    <div class="d-flex align-items-center gap-1">
                        <ng-icon name="tablerCalendarTime" class="fs-lg text-muted"/>
                        <h5 class="fs-base mb-0 fw-medium">{{ item.date }}</h5></div>
                </div>

                <div class="mt-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-2 fs-sm">
                                  <span class="d-flex align-items-center gap-1">
                            <ng-icon name="tablerMessageDots" class="text-muted fs-lg"></ng-icon>
                                      {{item.messages }}
                                     </span>
                            <span class="d-flex align-items-center gap-1">
                                  <ng-icon name="tablerChecklist"  class="text-muted fs-lg"/>
                                {{ item.tasks }}
                            </span>
                        </div>
                        <span class="fw-semibold">$95,000</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: ``
})
export class TaskItem {
    @Input() item!: TaskItemType;
}
