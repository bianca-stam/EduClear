import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-breadcrumb',
  imports: [UiCard,PageTitle,NgIcon],
  templateUrl: './breadcrumb.html',
  styles: ``
})
export class Breadcrumb {

}
