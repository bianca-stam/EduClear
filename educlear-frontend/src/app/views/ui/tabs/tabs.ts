import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';
import { NgIcon } from '@ng-icons/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-tabs',
    imports: [PageTitle, UiCard, NgIcon, NgbNavModule],
    templateUrl: './tabs.html',
    styles: ``,
})
export class Tabs {}
