import {Component} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {FlatpickrDirective,} from 'angularx-flatpickr';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-with-tools-topbar',
    imports: [
        NgIcon,
        FlatpickrDirective,
        FormsModule
    ],
    providers: [],
    templateUrl: './with-tools-topbar.html',
})
export class WithToolsTopbar {
    dates: { from: Date; to: Date } = {
        from: new Date('2025-01-01'),
        to: new Date('2025-01-31'),
    };
}
