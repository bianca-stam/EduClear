import { Component } from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {currentYear} from '@/app/constants';

@Component({
  selector: 'app-terms-and-conditions',
    imports: [
        PageTitle
    ],
  templateUrl: './terms-and-conditions.html',
  styles: ``
})
export class TermsAndConditions {
currentYear=currentYear
}
