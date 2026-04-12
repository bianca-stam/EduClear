import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LayoutStoreService} from '@core/services/layout-store.service';
import {Sidenav} from '@layouts/components/sidenav/sidenav';
import {Topbar} from '@layouts/components/topbar/topbar';
import {Footer} from '@layouts/components/footer/footer';
import {debounceTime, fromEvent, Subscription} from 'rxjs';

@Component({
    selector: 'app-vertical-layout',
    imports: [RouterOutlet, Sidenav, Topbar, Footer],
    templateUrl: './vertical-layout.html',
    styles: ``
})
export class VerticalLayout implements OnInit, OnDestroy {
    constructor(public layout: LayoutStoreService) {
    }

    resizeSubscription!: Subscription;

    ngOnInit() {
        this.onResize();

            this.resizeSubscription = fromEvent(window, 'resize')
            .pipe(debounceTime(200))
            .subscribe(() => this.onResize());
    }

    onResize(): void {
        const width = window.innerWidth;
        const size = this.layout.sidenavSize;

        if (width <= 767.98) {
            this.layout.setSidenavSize('offcanvas', false);
        } else if (width <= 1140 && !['offcanvas'].includes(size)) {
            this.layout.setSidenavSize(size === 'on-hover' ? 'condensed' : 'condensed', false);
        } else {
            this.layout.setSidenavSize(size);
        }
    }

    ngOnDestroy(): void {
        this.resizeSubscription?.unsubscribe();
    }
}
