import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LayoutStoreService} from '@core/services/layout-store.service';
import {LucideAngularModule, LucideUserPlus} from 'lucide-angular';
import {UserProfile} from '@layouts/components/topbar/components/user-profile/user-profile';
import {AuthService} from '@core/services/auth.service';

@Component({
    selector: 'app-topbar',
    imports: [
        RouterLink,
        LucideAngularModule,
        UserProfile,
    ],
    templateUrl: './topbar.html'
})
export class Topbar {
    private authService = inject(AuthService);
    protected readonly LucideUserPlus = LucideUserPlus;

    constructor(public layout: LayoutStoreService) {
    }

    get canRegisterUser(): boolean {
        const user = this.authService.usuarioActual();
        return user?.rol === 'profesor' || user?.rol === 'admin';
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
}
