import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {LayoutStoreService} from '@core/services/layout-store.service';
import {NgIcon} from '@ng-icons/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {PageTitle} from '@app/components/page-title';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Component({
    selector: 'app-horizontal',
    imports: [
        NgIcon,
        NgbAlert,
        PageTitle
    ],
    templateUrl: './horizontal.html',
})
export class Horizontal implements OnInit, OnDestroy {

    layout = inject(LayoutStoreService)
    router = inject(Router)

    ngOnInit() {
        this.layout.setLayoutOrientation('horizontal')
    }

    ngOnDestroy() {
        const sub = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.layout.setLayoutOrientation('vertical');
                this.layout.setSidenavSize('default');
                sub.unsubscribe();
            });
    }
}
