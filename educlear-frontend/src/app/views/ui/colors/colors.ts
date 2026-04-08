import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import { RouterLink } from '@angular/router';
import { UiCard } from '@app/components/ui-card';

@Component({
    selector: 'app-colors',
    imports: [UiCard,PageTitle,RouterLink],
    templateUrl: './colors.html',
    styles: ``,
})
export class Colors {}
