import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-progress',
    imports: [
        PageTitle,
        UiCard,
        NgbProgressbarModule,
    ],
    templateUrl: './progress.html',
    styles: ``,
})
export class Progress {}
