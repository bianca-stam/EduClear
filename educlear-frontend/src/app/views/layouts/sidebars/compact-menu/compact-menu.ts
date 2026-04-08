import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {PageTitle} from '@app/components/page-title';
import {LayoutStoreService} from '@core/services/layout-store.service';

@Component({
    selector: 'app-compact-menu',
    imports: [
        NgIcon,
        NgbAlert,
        PageTitle
    ],
    templateUrl: './compact-menu.html'
})
export class CompactMenu implements OnInit, OnDestroy {

    layout = inject(LayoutStoreService)

    ngOnInit() {
        this.layout.setSidenavSize('compact')
    }

    ngOnDestroy() {
        this.layout.reset()
    }
}
