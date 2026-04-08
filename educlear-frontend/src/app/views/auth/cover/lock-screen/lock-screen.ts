import { credits, currentYear } from '@/app/constants';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideKeyRound, LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-lock-screen',
    host: { 'data-component-id': 'auth2-lock-screen' },
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './lock-screen.html',
    styles: ``,
})
export class LockScreen{
    currentYear = currentYear
    credits = credits

    protected readonly LucideKeyRound = LucideKeyRound;
}
