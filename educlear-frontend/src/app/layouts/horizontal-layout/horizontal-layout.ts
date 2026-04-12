import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {Topbar} from '@layouts/components/topbar/topbar';
import {Footer} from '@layouts/components/footer/footer';
import {Navbar} from '@layouts/components/navbar/navbar';
import {LayoutStoreService} from '@core/services/layout-store.service';
import {debounceTime, fromEvent, Subscription} from 'rxjs';
import {Sidenav} from '@layouts/components/sidenav/sidenav';

@Component({
    selector: 'app-horizontal-layout',
    imports: [
        Footer,
        RouterOutlet,
        Topbar,
        Navbar,
        Sidenav,
    ],
    templateUrl: './horizontal-layout.html'
})
export class HorizontalLayout implements OnInit, OnDestroy {
    constructor(public layout: LayoutStoreService) {
    }

    resizeSubscription!: Subscription;

    isMobileSidebarVisible = false;

    ngOnInit() {
        this.onResize();

        this.resizeSubscription = fromEvent(window, 'resize')
            .pipe(debounceTime(200))
            .subscribe(() => this.onResize());
    }

    onResize(): void {
        const width = window.innerWidth;
        if (width < 992) {
            this.isMobileSidebarVisible = true
            this.layout.setSidenavSize('offcanvas');
        } else {
            this.isMobileSidebarVisible = false
            this.layout.setSidenavSize('default');
        }
    }

    ngOnDestroy(): void {
        this.resizeSubscription?.unsubscribe();
    }
}
