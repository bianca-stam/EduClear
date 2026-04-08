import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { toTitleCase } from '@/app/utils/string-utils';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tooltips',
    imports: [PageTitle, UiCard,NgbTooltipModule,RouterLink],
    templateUrl: './tooltips.html',
    styles: ``,
})
export class Tooltips {
    tooltipVariants = [
        'primary',
        'danger',
        'info',
        'success',
        'secondary',
        'warning',
        'dark',
    ];
    protected readonly toTitleCase = toTitleCase;
}
