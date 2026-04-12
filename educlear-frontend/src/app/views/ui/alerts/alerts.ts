import {Component} from '@angular/core';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {PageTitle} from '@app/components/page-title';
import {NgIcon} from '@ng-icons/core';
import { UiCard } from '@app/components/ui-card';

interface Alert {
    id: number;
    message: string;
    type: string;
}

@Component({
  selector: 'app-alerts',
  imports: [NgbAlertModule, PageTitle, UiCard, NgIcon],
  templateUrl: './alerts.html',
  styles: ``
})
export class Alerts {
  alertCounter = 0;

    showAlerts = {
        primary: true,
        secondary: true,
        dark: true,
        success: true,
        danger: true,
        warning: true,
        info: true,
        light: true
    };


    alerts: Alert[] = [];
    alertData: Alert[] = [
        {id: 1, type: 'primary', message: '  This is a primary alert—something important you should know!'},
        {id: 2, type: 'secondary', message: 'This is a secondary alert—some additional context.'},
        {id: 3, type: 'success', message: ' Success! Your operation was completed successfully.'},
        {id: 4, type: 'danger', message: ' Error! Something went wrong—please try again.'},
        {id: 5, type: 'warning', message: ' Warning! Please double-check your inputs.'},
        {id: 6, type: 'info', message: 'Info: Here’s something you might find useful.'},
        {id: 7, type: 'light', message: ' Light alert—just a subtle notification.'},
        {id: 8, type: 'dark', message: ' Dark alert—use for general-purpose messages.'},

    ];
    alertData1: Alert[] = [
        {id: 1, type: 'primary', message: 'Heads up! This is a primary alert with important information.'},
        {id: 2, type: 'secondary', message: 'Notice: This is a secondary alert with supporting details.'},
        {id: 3, type: 'success', message: 'Success! Your action was completed successfully.'},
        {id: 4, type: 'danger', message: 'Error! Something went wrong—please try again later.'},
        {id: 5, type: 'warning', message: 'Warning! Please review your input before proceeding.'},
        {id: 6, type: 'info', message: 'Info: Here’s something you might find helpful.'},
        {id: 7, type: 'light', message: 'Note: This is a light alert with a subtle message.'},
        {id: 8, type: 'dark', message: 'Notice: This dark alert is great for general messages.'},

    ];

    linkAlert = [
        {
            variant: 'primary',
            content: `Need more info? Check out <a href="javascript:void(0);" class="alert-link">this primary link</a> for important details.`
        },
        {
            variant: 'secondary',
            content: `This is a secondary alert with <a href="javascript:void(0);" class="alert-link">a helpful link</a>for additional context.`
        },
        {
            variant: 'success',
            content: `Operation successful! View results <a href="javascript:void(0);" class="alert-link">by clicking here</a>.`
        },
        {
            variant: 'danger',
            content: `Something went wrong. Learn more <a href="javascript:void(0);" class="alert-link">through this alert link</a>.`
        },
        {
            variant: 'warning',
            content: `Heads up! Check <a href="javascript:void(0);" class="alert-link">this warning</a>.`
        },
        {
            variant: 'info',
            content: `Click <a href="javascript:void(0);" class="alert-link">this info link</a> to read more.`
        },
        {
            variant: 'light',
            content: `A light reminder with <a href="javascript:void(0);" class="alert-link">a gentle link</a> to explore.`
        },
        {
            variant: 'dark',
            content: `General alert: <a href="javascript:void(0);" class="alert-link">by clicking here</a>.`
        },
          ];


    triggerAlert(): void {
        const newAlert: Alert = {
            id: this.alertCounter++,
            message: `Alert #${this.alertCounter}: You triggered a live alert!`,
            type: 'success'
        };
        this.alerts.push(newAlert);
    }

    removeAlert(id: number): void {
        this.alerts = this.alerts.filter(alert => alert.id !== id);
    }

    close(alert: Alert): void {
        const index = this.alertData.indexOf(alert);
        if (index > -1) this.alertData.splice(index, 1);
    }
close1(alert: Alert): void {
  this.alertData1 = this.alertData1.filter(a => a.id !== alert.id);
}



}
