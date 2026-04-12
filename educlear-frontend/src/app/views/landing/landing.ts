import { Component } from '@angular/core';
import { Cta } from "./components/cta/cta";
import { Features } from "./components/features/features";
import { Header } from "./components/header/header";
import { PricingPlans } from "./components/pricing-plans/pricing-plans";
import { Services } from "./components/services/services";
import { Testimonials } from "./components/testimonials/testimonials";
import { Contact } from "./components/contact/contact";
import { Footer } from './components/footer/footer';
import {Hero} from '@/app/views/landing/components/hero/hero';

@Component({
  selector: 'app-landing',
  imports: [Header, Hero, Services, Features, PricingPlans, Cta, Testimonials, Contact, Footer],
  templateUrl: './landing.html',
  styles: ``
})
export class Landing {

}
