import {Routes} from '@angular/router';
import {Invoices} from '@/app/views/invoices/invoices/invoices';
import {SingleInvoice} from '@/app/views/invoices/single-invoice/single-invoice';
import {NewInvoice} from '@/app/views/invoices/new-invoice/new-invoice';

export const INVOICES_ROUTES: Routes = [
    {
        path: 'invoices',
        component: Invoices,
        data: {title: "Invoices"},
    },
    {
        path: 'invoice/:id',
        component: SingleInvoice,
        data: {title: "Invoices Single"},
    },
    {
        path: 'invoices/new',
        component: NewInvoice,
        data: {title: "New Invoice"},
    },
]
