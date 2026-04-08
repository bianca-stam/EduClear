import { credits, currentYear } from '@/app/constants';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LucideCircleUser, LucideAngularModule, LucideKeyRound } from 'lucide-angular';

@Component({
    selector: 'app-sign-in',
    host: { 'data-component-id': 'auth2-sign-in' },
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './sign-in.html',
    styles: ``,
})
export class SignIn {
    currentYear = currentYear
    credits = credits

    protected readonly LucideCircleUser = LucideCircleUser;
    protected readonly LucideKeyRound = LucideKeyRound;
}
