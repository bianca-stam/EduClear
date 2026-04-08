import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';

import {
    NgbDropdownModule,
    NgbScrollSpyModule,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-scrollspy',
    imports: [
        PageTitle,
        UiCard,
        NgbScrollSpyModule,
        NgbDropdownModule,
    ],
    templateUrl: './scrollspy.html',
    styles: ``,
})
export class Scrollspy {}
