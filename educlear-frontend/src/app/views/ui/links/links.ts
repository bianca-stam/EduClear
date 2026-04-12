import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';

@Component({
    selector: 'app-links',
    imports: [PageTitle, UiCard, RouterLink],
    templateUrl: './links.html',
    styles: ``,
})
export class Links {}
