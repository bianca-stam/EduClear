import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';
@Component({
    selector: 'app-videos',
    imports: [UiCard, PageTitle],
    templateUrl: './videos.html',
    styles: ``,
})
export class Videos {}
