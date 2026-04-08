import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {LayoutStoreService} from '@core/services/layout-store.service';
import {NgIcon} from '@ng-icons/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {PageTitle} from '@app/components/page-title';

@Component({
    selector: 'app-light-menu',
    imports: [
        NgIcon,
        NgbAlert,
        PageTitle
    ],
    templateUrl: './light-menu.html',
})
export class LightMenu implements OnInit, OnDestroy {

    layout = inject(LayoutStoreService)

    ngOnInit() {
        this.layout.setSidenavColor('light')
    }

    ngOnDestroy() {
        this.layout.reset()
    }
}
