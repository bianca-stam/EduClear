import { Component } from '@angular/core';
import { PageTitle } from '@app/components/page-title';
import type { PricingType } from './types';
import { PricingCard } from './components/pricing-card';

@Component({
    selector: 'app-pricing',
    imports: [PageTitle, PricingCard],
    templateUrl: './pricing.html',
    styles: ``,
})
export class Pricing {
    plans: PricingType[] = [
        {
            name: 'Starter Plan',
            description: 'Best for freelancers and personal use',
            price: 9,
            paymentType: 'Billed monthly',
            text: '1 project included',
            class: 'default',
            features: [
                {
                    icon: 'tablerCheck',
                    name: '1 active project',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'Access to all components',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'Email support',
                    variant: 'success',
                },
                {
                    icon: 'tablerX',
                    name: 'No team collaboration',
                    variant: 'success',
                },
                { icon: 'tablerX', name: 'No SaaS rights', variant: 'danger' },
            ],
            buttonText: 'Choose Starter',
            buttonClass: 'btn btn-outline-primary',
        },
        {
            name: 'Professional',
            description: 'Ideal for small teams and startups',
            price: 29,
            paymentType: 'Billed monthly',
            text: 'Up to 5 projects',
            class: 'primary',
            features: [
                {
                    icon: 'tablerCheck',
                    name: '5 active projects',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'Component + plugin access',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'Team collaboration',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'Priority email support',
                    variant: 'success',
                },
                {
                    icon: 'tablerX',
                    name: 'No resale rights',
                    variant: 'danger',
                },
            ],
            buttonText: 'Choose Professional',
            buttonClass: 'btn btn-light',
        },
        {
            name: 'Business',
            description: 'For agencies and large teams',
            price: 79,
            paymentType: 'Billed monthly',
            text: 'Unlimited projects',
            class: 'dark',
            features: [
                {
                    icon: 'tablerCheck',
                    name: 'Unlimited projects',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'SaaS & client projects allowed',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'All premium components',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'Priority support',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'Team management tools',
                    variant: 'success',
                },
            ],
            buttonText: 'Choose Business',
            buttonClass: 'btn btn-dark',
        },
        {
            name: 'Enterprise',
            description: 'Custom plan for enterprises & high-scale use',
            price: 'Contact Us',
            paymentType: 'Custom monthly billing',
            text: 'Based on usage & team size',
            class: 'outline-dark',
            features: [
                {
                    icon: 'tablerCheck',
                    name: 'Unlimited users & usage',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'White-label license',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'Custom integrations',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'SLA + NDA agreements',
                    variant: 'success',
                },
                {
                    icon: 'tablerCheck',
                    name: 'Dedicated manager & support',
                    variant: 'success',
                },
            ],
            buttonText: 'Contact Sales',
            buttonClass: 'btn btn-outline-dark',
        },
    ];
}
