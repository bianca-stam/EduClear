import { credits, currentYear } from '@/app/constants';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-lock-screen',
    imports: [RouterLink],
    templateUrl: './lock-screen.html',
    styles: ``
})
export class LockScreen {
    currentYear = currentYear
    credits = credits
}
