import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-notifications',
    imports: [PageTitle, UiCard, NgbToastModule, FormsModule],
    templateUrl: './notifications.html',
    styles: ``,
})
export class Notifications {
    liveToast = false;
    showToast = true;
    showToast2 = true;
    showToast3 = true;
    placement = true;
    toastPlacement: string = '';
    close() {
        this.showToast = false;
    }
}
