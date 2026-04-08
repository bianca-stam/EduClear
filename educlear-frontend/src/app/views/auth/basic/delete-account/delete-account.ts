import { credits, currentYear } from '@/app/constants';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  imports: [RouterLink],
  templateUrl: './delete-account.html',
  styles: ``
})
export class DeleteAccount {
  currentYear = currentYear
    credits = credits
}
