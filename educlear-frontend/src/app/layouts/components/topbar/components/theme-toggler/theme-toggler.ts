import {Component, computed} from '@angular/core';
import {LayoutStoreService} from '@core/services/layout-store.service';
import {LucideAngularModule, LucideIconData, LucideMonitorCog, LucideMoon, LucideSun} from 'lucide-angular';
import {LayoutThemeType} from '@/app/types/layout';
import {toTitleCase} from '@/app/utils/string-utils';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-theme-toggler',
    imports: [LucideAngularModule, NgbDropdownModule],
  templateUrl: './theme-toggler.html'
})
export class ThemeToggler{
    theme = computed(() => this.layout.state().theme);

    themeOptions: { layoutTheme: LayoutThemeType; icon: LucideIconData }[] = [
        { layoutTheme: 'light', icon: LucideSun },
        { layoutTheme: 'dark', icon: LucideMoon },
        { layoutTheme: 'system', icon: LucideMonitorCog },
    ];
  constructor(public layout: LayoutStoreService) {
  }



    changeTheme(theme: LayoutThemeType) {
        this.layout.setTheme(theme);
    }


    protected readonly toTitleCase = toTitleCase;
    protected readonly LucideMoon = LucideMoon;
    protected readonly LucideMonitorCog = LucideMonitorCog;
    protected readonly LucideSun = LucideSun;
}
