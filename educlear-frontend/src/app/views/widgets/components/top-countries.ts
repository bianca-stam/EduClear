import {Component} from '@angular/core';
import {UiCard} from '@app/components/ui-card';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {countries} from '@/app/views/widgets/data';

@Component({
  selector: 'app-top-countries',
  imports: [ UiCard,
        RouterLink,
        NgIcon,],
  template: `
      <app-ui-card title="Top Countries" [isCloseable]="true" [isTogglable]="true" [isReloadable]="true">
            <div card-body>
                @for (country of countries; let last = $last; let i = $index; track $index) {
                    <div class="d-flex align-items-center gap-2 {{!last ? 'mb-3' : '' }}">
                        <img [src]="country.flag" [alt]="country.name" class="avatar-xxs rounded">
                        <h5 class="mb-0 fw-medium"><a [routerLink]="[]" class="link-reset">{{ country.name }}</a> <small class="text-muted"> Pop: {{country.population}}</small></h5>
                        <div class="ms-auto">
                            <div class="d-flex align-items-center gap-3">
                                <p class="mb-0 fw-medium">{{ country.count }}</p>
                                <p class="badge badge-label fs-xxs badge-soft-{{country.variant}} mb-0">
                                    {{ country.variant === 'danger' ? '-' : country.variant === 'success' ? '+' : '' }}{{ country.change }}
                                    %</p>
                            </div>
                        </div>
                    </div>
                }
                <div class="text-center mt-4">
                    <a routerLink="/apps/chat"
                       class="link-reset text-decoration-underline fw-semibold link-offset-3 d-flex align-items-center gap-1 justify-content-center">
                        View all Countries
                        <ng-icon name="tablerWorld"/>
                    </a>
                </div>
            </div>
        </app-ui-card>
  `,
  styles: ``
})
export class TopCountries {
 protected readonly countries = countries;
}
