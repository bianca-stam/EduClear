import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import { UiCard } from '@app/components/ui-card';

@Component({
  selector: 'app-placeholders',
  imports: [  PageTitle,
          UiCard,
          ],
  templateUrl: './placeholders.html',
  styles: ``
})
export class Placeholders {

}
