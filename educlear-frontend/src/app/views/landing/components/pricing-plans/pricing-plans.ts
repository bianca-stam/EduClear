import {Component} from '@angular/core';
import {PricingPlanCard} from "../pricing-plan-card/pricing-plan-card";

@Component({
    selector: 'app-pricing-plans',
    imports: [PricingPlanCard],
    templateUrl: './pricing-plans.html',
    styles: ``
})
export class PricingPlans {
    plans = [
        {
            name: "Starter Plan",
            description: "Best for freelancers and personal use",
            price: 9,
            highlight: "1 project included",
            features: [
                { text: "1 active project", included: true },
                { text: "Access to all components", included: true },
                { text: "Email support", included: true },
                { text: "No team collaboration", included: false },
                { text: "No SaaS rights", included: false }
            ],
            btnClass: "btn-outline-primary"
        },
        {
            name: "Professional",
            description: "Ideal for small teams and startups",
            price: 29,
            highlight: "Up to 5 projects",
            features: [
                { text: "5 active projects", included: true },
                { text: "Component + plugin access", included: true },
                { text: "Team collaboration", included: true },
                { text: "Priority email support", included: true },
                { text: "No resale rights", included: false }
            ],
            btnClass: "btn-light",
            isPopular: true
        },
        {
            name: "Business",
            description: "For agencies and large teams",
            price: 79,
            highlight: "Unlimited projects",
            features: [
                { text: "Unlimited projects", included: true },
                { text: "SaaS & client projects allowed", included: true },
                { text: "All premium components", included: true },
                { text: "Priority support", included: true },
                { text: "Team management tools", included: true }
            ],
            btnClass: "btn-dark"
        }
    ];
}
