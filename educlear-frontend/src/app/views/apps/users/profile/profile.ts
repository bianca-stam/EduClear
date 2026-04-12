import { Component } from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {ProfileCard} from '@/app/views/apps/users/profile/components/profile-card';
import {Account} from '@/app/views/apps/users/profile/components/account';

@Component({
  selector: 'app-profile',
    imports: [
        PageTitle,
        ProfileCard,
        Account
    ],
  templateUrl: './profile.html',
  styles: ``
})
export class Profile {

}
