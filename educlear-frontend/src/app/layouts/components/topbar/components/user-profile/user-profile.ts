import {Component, inject} from '@angular/core';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {userDropdownItems} from '@layouts/components/data';
import {Router, RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-user-profile-topbar',
  imports: [
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
    RouterLink,
    NgIcon
  ],
  templateUrl: './user-profile.html'
})
export class UserProfile {
  menuItems = userDropdownItems;
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    window.location.reload();
  }
  
}
