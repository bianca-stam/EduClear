import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {PageTitle} from '@app/components/page-title';
import {LayoutStoreService} from '@core/services/layout-store.service';

@Component({
    selector: 'app-no-icons-with-lines-menu',
    imports: [
        NgIcon,
        NgbAlert,
        PageTitle
    ],
    templateUrl: './no-icons-with-lines-menu.html',
})
export class NoIconsWithLinesMenu implements OnInit, OnDestroy {

    layout = inject(LayoutStoreService)

    ngOnInit() {
        this.layout.setHtmlAttribute('class', 'sidebar-no-icons sidebar-with-line')
    }

    ngOnDestroy() {
        this.layout.setHtmlAttribute('class', '')
        this.layout.reset()
    }
}
