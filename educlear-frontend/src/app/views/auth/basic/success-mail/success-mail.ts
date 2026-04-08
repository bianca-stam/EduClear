import { credits, currentYear } from '@/app/constants';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-success-mail',
    imports: [RouterLink],
    templateUrl: './success-mail.html',
    styles: ``
})
export class SuccessMail {
    currentYear = currentYear
    credits = credits
}
