import {Component, Input} from '@angular/core';
import type {PricingPlanType} from '../types';
import {NgIcon} from '@ng-icons/core';

@Component({
    selector: 'app-pricing-plan-card',
    imports: [NgIcon],
    templateUrl: './pricing-plan-card.html',
    styles: ``
})
export class PricingPlanCard {
    @Input() plan!: PricingPlanType

}
