import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {LayoutStoreService} from '@core/services/layout-store.service';
import {NgIcon} from '@ng-icons/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {PageTitle} from '@app/components/page-title';

@Component({
    selector: 'app-gradient-topbar',
    imports: [
        NgIcon,
        NgbAlert,
        PageTitle
    ],
    templateUrl: './gradient-topbar.html'
})
export class GradientTopbar implements OnInit, OnDestroy {

    layout = inject(LayoutStoreService)

    ngOnInit() {
        this.layout.setTopbarColor('gradient')
    }

    ngOnDestroy() {
        this.layout.reset()
    }
}
