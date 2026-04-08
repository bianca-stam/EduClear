import {Routes} from '@angular/router';
import {Contacts} from '@/app/views/crm/contacts/contacts';
import {Opportunities} from '@/app/views/crm/opportunities/opportunities';
import {Deals} from '@/app/views/crm/deals/deals';
import {Leads} from '@/app/views/crm/leads/leads';
import {Pipeline} from '@/app/views/crm/pipeline/pipeline';
import {Campaign} from '@/app/views/crm/campaign/campaign';
import {Proposals} from '@/app/views/crm/proposals/proposals';
import {Estimations} from '@/app/views/crm/estimations/estimations';
import {Customers} from '@/app/views/crm/customers/customers';
import {Activities} from '@/app/views/crm/activities/activities';


export const CRM_ROUTES: Routes = [
    {
        path: 'crm/contacts',
        component: Contacts,
        data: {title: "Contacts"},
    },
    {
        path: 'crm/opportunities',
        component: Opportunities,
        data: {title: "Opportunities"},
    },
    {
        path: 'crm/deals',
        component: Deals,
        data: {title: "Deals"},
    },
    {
        path: 'crm/leads',
        component: Leads,
        data: {title: "Leads"},
    },
    {
        path: 'crm/pipeline',
        component: Pipeline,
        data: {title: "Pipeline"},
    },
    {
        path: 'crm/campaign',
        component: Campaign,
        data: {title: "Campaign"},
    },
    {
        path: 'crm/proposals',
        component: Proposals,
        data: {title: "Campaign"},
    },
    {
        path: 'crm/estimations',
        component: Estimations,
        data: {title: "Estimations"},
    },
    {
        path: 'crm/customers',
        component: Customers,
        data: {title: "Customers"},
    },
    {
        path: 'crm/activities',
        component: Activities,
        data: {title: "Activities"},
    },

];
