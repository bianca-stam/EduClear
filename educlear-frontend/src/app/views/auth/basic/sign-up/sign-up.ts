import { credits, currentYear } from '@/app/constants';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PasswordStrengthBar } from "@app/components/password-strength-bar";

@Component({
    selector: 'app-sign-up',
    imports: [RouterLink, PasswordStrengthBar, FormsModule],
    templateUrl: './sign-up.html',
    styles: ``
})
export class SignUp {
    currentYear = currentYear
    credits = credits
    password: string = '';
}
