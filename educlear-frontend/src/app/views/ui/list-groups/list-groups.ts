import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'app-list-groups',
    imports: [UiCard, PageTitle, NgIcon],
    templateUrl: './list-groups.html',
    styles: ``,
})
export class ListGroups {}
