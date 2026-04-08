import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {LayoutStoreService} from '@core/services/layout-store.service';
import {LucideAngularModule, LucidePalette, Search} from 'lucide-angular';

import {MegaMenu} from '@layouts/components/topbar/components/mega-menu/mega-menu';
import {
    LanguageDropdown
} from '@layouts/components/topbar/components/language-dropdown/language-dropdown';
import {
    MessagesDropdown
} from '@layouts/components/topbar/components/messages-dropdown/messages-dropdown';
import {ThemeToggler} from '@layouts/components/topbar/components/theme-toggler/theme-toggler';
import {
    CustomizerToggler
} from '@layouts/components/topbar/components/customizer-toggler/customizer-toggler';
import {UserProfile} from '@layouts/components/topbar/components/user-profile/user-profile';
import {ApplicationMenu} from '@layouts/components/topbar/components/application-menu/application-menu';
import {ToggleFullscreen} from '@layouts/components/topbar/components/toggle-fullscreen';


@Component({
    selector: 'app-topbar',
    imports: [
        NgIcon,
        RouterLink,
        LucideAngularModule,
        MegaMenu,
        LanguageDropdown,
        MessagesDropdown,
        CustomizerToggler,
        ThemeToggler,
        UserProfile,
        ApplicationMenu,
        ToggleFullscreen,

    ],
    templateUrl: './topbar.html'
})
export class Topbar {
    constructor(public layout: LayoutStoreService) {
    }

    toggleSidebar() {

        const html = document.documentElement;
        const currentSize = html.getAttribute('data-sidenav-size');
        const savedSize = this.layout.sidenavSize;

        if (currentSize === 'offcanvas') {
            html.classList.toggle('sidebar-enable')
            this.layout.showBackdrop()
        } else if (savedSize === 'compact') {
            this.layout.setSidenavSize(currentSize === 'compact' ? 'condensed' : 'compact', false);
        } else {
            this.layout.setSidenavSize(currentSize === 'condensed' ? 'default' : 'condensed');
        }
    }

    Search = Search;
    protected readonly LucidePalette = LucidePalette;
}
