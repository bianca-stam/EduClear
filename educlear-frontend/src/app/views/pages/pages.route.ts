import { Routes } from '@angular/router';
import { Faqs } from './faqs/faqs';
import { Pricing } from './pricing/pricing';
import { EmptyPage } from './empty-page/empty-page';
import { Timeline } from './timeline/timeline';
import { SearchResults } from '@/app/views/pages/search-results/search-results';
import { TermsAndConditions } from '@/app/views/pages/terms-and-conditions/terms-and-conditions';
import { Sitemap } from './sitemap/sitemap';

export const PAGES_ROUTES: Routes = [
    {
        path: 'pages/faq',
        component: Faqs,
        data: { title: 'FAQs' },
    },
    {
        path: 'pages/pricing',
        component: Pricing,
        data: { title: 'pricing' },
    },
    {
        path: 'pages/empty-page',
        component: EmptyPage,
        data: { title: 'Empty Page' },
    },
    {
        path: 'pages/timeline',
        component: Timeline,
        data: { title: 'Timeline' },
    },
    {
        path: 'pages/search-results',
        component: SearchResults,
        data: { title: 'Search Results' },
    },
    {
        path: 'pages/terms-and-conditions',
        component: TermsAndConditions,
        data: { title: 'Terms & Conditions' },
    },
       {
        path: 'pages/sitemap',
        component: Sitemap,
        data: { title: 'Sitemap' },
    },
];
