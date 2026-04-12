import {Routes} from '@angular/router';
import { PdfViewer } from './pdf-viewer/pdf-viewer';
import { SweetAlerts } from './sweet-alerts/sweet-alerts';
import { PasswordMeter } from './password-meter/password-meter';
import { Clipboard } from './clipboard/clipboard';
import { Tour } from './tour/tour';

export const MISCELLANEOUS_ROUTES: Routes = [
    {
        path: 'miscellaneous/pdf-viewer',
        component: PdfViewer,
        data: { title: "Pdf Viewer" },
    },
    {
        path: 'miscellaneous/sweet-alerts',
        component: SweetAlerts,
        data: { title: "SweetAlert2" },
    },
    {
        path: 'miscellaneous/password-meter',
        component: PasswordMeter,
        data: { title: "Password Meter" },
    },
    {
        path: 'miscellaneous/clipboard',
        component: Clipboard,
        data: { title: "Clipboard" },
    },
    {
        path: 'miscellaneous/tour',
        component: Tour,
        data: { title: "Tour" },
    }  
];
