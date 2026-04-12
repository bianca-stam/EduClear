import { credits, currentYear } from '@/app/constants';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PasswordStrengthBar } from "@app/components/password-strength-bar";
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucideCircleUser, LucideKeyRound, LucideMail } from "lucide-angular";

@Component({
    selector: 'app-sign-up',
    host: { 'data-component-id': 'auth2-sign-up' },
    imports: [RouterLink,  PasswordStrengthBar, FormsModule, LucideAngularModule],
    templateUrl: './sign-up.html',
    styles: ``,
})
export class SignUp {
    currentYear = currentYear
    credits = credits
     password: string = '';

    protected readonly LucideCircleUser = LucideCircleUser;
    protected readonly LucideMail = LucideMail;
    protected readonly LucideKeyRound = LucideKeyRound;
}
