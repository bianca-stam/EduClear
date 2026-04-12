import { Component, Input } from '@angular/core';
import type { PricingType } from '../types';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { currency } from '@/app/constants';

@Component({
    selector: 'app-pricing-card',
    imports: [NgIcon, RouterLink],
    template: `
        <div
            class="card h-100 my-4 my-lg-0"
            [class]="{
                'text-bg-primary': plan.class === 'primary',
                '': plan.class === 'default'
            }"
        >
            <div class="card-body p-lg-4 pb-0 text-center">
                <h3 class="fw-bold mb-1">{{ plan.name }}</h3>
                <p
                    [class]="
                        plan.class === 'primary'
                            ? 'text-white-50 mb-0'
                            : 'text-muted mb-0'
                    "
                >
                    {{ plan.description }}
                </p>

                <div class="my-4">
                    <h1 class="display-6 fw-bold mb-0">
                        {{
                            plan.price === 'Contact Us'
                                ? plan.price
                                : '$' + plan.price
                        }}
                    </h1>
                    <small
                        class="d-block fs-base"
                        [class]="
                            plan.class === 'primary'
                                ? 'text-white-50'
                                : 'text-muted'
                        "
                    >
                        {{ plan.paymentType }}
                    </small>

                    <small
                        class="d-block"
                        [class]="
                            plan.class === 'primary'
                                ? 'text-white-50'
                                : 'text-muted'
                        "
                    >
                        {{ plan.text }}
                    </small>
                </div>

                <ul class="list-unstyled text-start fs-sm mb-0">
                    @for (feature of plan.features; track feature.name) {
                    <li class="mb-2">
                        <ng-icon
                            [name]="feature.icon"
                            class="text-{{ feature.variant }} me-2 fs-5"
                        />
                        {{ feature.name }}
                    </li>
                    }
                </ul>
            </div>
            <div class="card-footer bg-transparent px-5 pb-4">
                <a
                    [routerLink]="[]"
                    class="w-100 py-2 fw-semibold rounded-pill"
                    [class]="plan.buttonClass"
                    >{{ plan.buttonText }}</a
                >
            </div>
        </div>
    `,
    styles: ``,
})
export class PricingCard {
    @Input() plan!: PricingType;
    currency = currency;
}
