import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {PageTitle} from '@app/components/page-title';
import {LayoutStoreService} from '@core/services/layout-store.service';

@Component({
    selector: 'app-on-hover-active-menu',
    imports: [
        NgIcon,
        NgbAlert,
        PageTitle
    ],
    templateUrl: './on-hover-active-menu.html'
})
export class OnHoverActiveMenuComponent implements OnInit, OnDestroy {

    layout = inject(LayoutStoreService)

    ngOnInit() {
        this.layout.setSidenavSize('on-hover-active')
    }

    ngOnDestroy() {
        this.layout.reset()
    }
}
