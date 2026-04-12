import {Component} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {PageTitle} from '@app/components/page-title';

@Component({
    selector: 'app-compact',
    imports: [
        NgIcon,
        NgbAlert,
        PageTitle
    ],
    templateUrl: './compact.html'
})
export class Compact {

}
