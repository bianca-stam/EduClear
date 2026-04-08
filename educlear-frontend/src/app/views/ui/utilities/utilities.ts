import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';

@Component({
    selector: 'app-utilities',
    imports: [PageTitle, UiCard],
    templateUrl: './utilities.html',
    styles: ``,
})
export class Utilities {}
