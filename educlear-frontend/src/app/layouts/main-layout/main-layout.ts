import {Component} from '@angular/core';
import {VerticalLayout} from '@layouts/vertical-layout/vertical-layout';
import {RouterOutlet} from '@angular/router';
import {HorizontalLayout} from '@layouts/horizontal-layout/horizontal-layout';
import {LayoutStoreService} from '@core/services/layout-store.service';

@Component({
    selector: 'app-main-layout',
    imports: [
        VerticalLayout,
        RouterOutlet,
        HorizontalLayout,

    ],
    templateUrl: './main-layout.html',
})
export class MainLayout {
    constructor(public layout: LayoutStoreService) {
    }
}
