import { Component } from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {UiCard} from '@app/components/ui-card';
import {NgIcon} from '@ng-icons/core';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-pagination',
  imports: [
          PageTitle,
          UiCard,
          NgIcon,
          NgbPaginationModule],
  templateUrl: './pagination.html',
  styles: ``
})
export class Pagination {

}
