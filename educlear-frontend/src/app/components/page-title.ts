import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
    selector: 'app-page-title',
    imports: [RouterLink, NgIcon],
    template: `
        <div class="page-title-head d-flex align-items-center">
            <div class="flex-grow-1">
                <h4 class="fs-xl fw-bold m-0">{{ title }}</h4>
            </div>

            @if (!hideBreadcrumbs) {
            <div class="text-end">
                <ol class="breadcrumb m-0 py-0">
                    @if (breadcrumbs && breadcrumbs.length > 0) {
                        @for (item of breadcrumbs; track $index) {
                            @if ($last) {
                                <li class="breadcrumb-item active">{{ item.label }}</li>
                            } @else {
                                <li class="breadcrumb-item">
                                    @if (item.url) {
                                        <a [routerLink]="item.url">{{ item.label }}</a>
                                    } @else {
                                        <a href="javascript: void(0);">{{ item.label }}</a>
                                    }
                                </li>
                                <li class="d-flex justify-content-center align-items-center">
                                    <ng-icon name="tablerChevronRight" size="14" class="breadcrumb-arrow mx-1"/>
                                </li>
                            }
                        }
                    } @else {
                        <li class="breadcrumb-item"><a routerLink="/cursos">Cursos</a></li>
                        <li class="d-flex justify-content-center align-items-center">
                            <ng-icon name="tablerChevronRight" size="14" class="breadcrumb-arrow  mx-1"/>
                        </li>
                            @if (subTitle) {
                            <li class="breadcrumb-item"><a href="javascript: void(0);">{{ subTitle }}</a></li>
                            <li class="d-flex justify-content-center align-items-center">
                                <ng-icon name="tablerChevronRight" size="14" class="breadcrumb-arrow  mx-1"/>
                            </li>
                            }
                        <li class="breadcrumb-item active">{{ title }}</li>
                    }
                </ol>
            </div>
            }
        </div>
    `
})
export class PageTitle {
    @Input() title: string = 'Welcome!';
    @Input() subTitle: string | null = null;
    @Input() breadcrumbs?: BreadcrumbItem[] = [];
    @Input() hideBreadcrumbs: boolean = false;
}
