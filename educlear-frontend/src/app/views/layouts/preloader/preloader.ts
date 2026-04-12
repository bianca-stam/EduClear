import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {LayoutStoreService} from '@core/services/layout-store.service';
import {NgIcon} from '@ng-icons/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {PageTitle} from '@app/components/page-title';

@Component({
    selector: 'app-preloader',
    imports: [
        NgIcon,
        NgbAlert,
        PageTitle
    ],
    templateUrl: './preloader.html',
})
export class Preloader implements OnInit {

    layout = inject(LayoutStoreService)
    changeDetector = inject(ChangeDetectorRef)

    ngOnInit() {
        this.layout.setIsLoading(true);
        this.changeDetector.detectChanges();

        setTimeout(() => {
            this.layout.setIsLoading(false);
        }, 2000);
    }
}
