import {Component} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {NgIcon} from '@ng-icons/core';
import {RouterLink} from '@angular/router';
import {FlatpickrDirective} from 'angularx-flatpickr';

@Component({
  selector: 'app-new-invoice',
    imports: [PageTitle, NgIcon, RouterLink,FlatpickrDirective],
  templateUrl: './new-invoice.html',
  styles: ``
})
export class NewInvoice {
    previewSrc: string = 'assets/images/logo-black.png';

    onLogoSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                this.previewSrc = e.target?.result as string;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
}
