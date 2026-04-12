import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';

import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { toTitleCase } from '@/app/utils/string-utils';
@Component({
    selector: 'app-popovers',
    imports: [PageTitle, UiCard, NgbPopoverModule],
    templateUrl: './popovers.html',
    styles: ``,
})
export class Popovers {
    popoverVariants = [
        'primary',
        'success',
        'danger',
        'info ',
        'dark',
        'secondary',
        ];
    protected readonly toTitleCase = toTitleCase;
}
