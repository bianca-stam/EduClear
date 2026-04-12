import {Component} from '@angular/core';
import {PageTitle} from "@app/components/page-title";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BasicWizard} from '@/app/views/forms/wizards/components/basic-wizard';
import {WizardWithProgressbar} from '@/app/views/forms/wizards/components/wizard-with-progressbar';
import {VerticalWizard} from '@/app/views/forms/wizards/components/vertical-wizard';

@Component({
    selector: 'app-wizard',
    imports: [PageTitle, FormsModule, ReactiveFormsModule, BasicWizard, WizardWithProgressbar, VerticalWizard],
    templateUrl: './wizards.html',
    styles: ``
})
export class Wizards {


}
