import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {PageTitle} from '@app/components/page-title';
import {LayoutStoreService} from '@core/services/layout-store.service';

@Component({
    selector: 'app-dark-topbar',
    imports: [
        NgIcon,
        NgbAlert,
        PageTitle
    ],
    templateUrl: './dark-topbar.html'
})
export class DarkTopbar implements OnInit, OnDestroy {

    layout = inject(LayoutStoreService)

    ngOnInit() {
        this.layout.setTopbarColor('dark')
    }

    ngOnDestroy() {
        this.layout.reset()
    }
}
