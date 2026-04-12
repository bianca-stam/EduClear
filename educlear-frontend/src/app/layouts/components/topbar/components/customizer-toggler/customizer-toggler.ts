import {Component} from '@angular/core';
import {LayoutStoreService} from '@core/services/layout-store.service';
import {NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-customizer-toggler',
    imports: [ NgIcon],
  templateUrl: './customizer-toggler.html'
})
export class CustomizerToggler {
  constructor(public layout: LayoutStoreService) {
  }

}
