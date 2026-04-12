import { Component } from '@angular/core';
import {AppMenu} from '@layouts/components/navbar/components/app-menu/app-menu';

@Component({
  selector: 'app-navbar',
    imports: [
        AppMenu
    ],
  templateUrl: './navbar.html'
})
export class Navbar {

}
