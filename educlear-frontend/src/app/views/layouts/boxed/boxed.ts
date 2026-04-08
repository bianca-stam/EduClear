import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {LayoutStoreService} from '@core/services/layout-store.service';
import {NgIcon} from '@ng-icons/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {PageTitle} from '@app/components/page-title';

@Component({
    selector: 'app-boxed',
    imports: [
        NgIcon,
        NgbAlert,
        PageTitle
    ],
    templateUrl: './boxed.html',
})
export class Boxed implements OnInit, OnDestroy {

    layout = inject(LayoutStoreService)

    ngOnInit() {
        this.layout.setLayoutWidth('boxed')
        this.layout.setSidenavSize('on-hover')
    }

    ngOnDestroy() {
        this.layout.reset()
    }
}
