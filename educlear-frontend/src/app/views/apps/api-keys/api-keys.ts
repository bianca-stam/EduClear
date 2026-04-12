import {Component} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {ApiTable} from '@/app/views/apps/api-keys/components/api-table/api-table';

@Component({
    selector: 'app-api-keys',
    imports: [
        PageTitle,
        ApiTable
    ],
    templateUrl: './api-keys.html',
    styles: ``
})
export class ApiKeys {
}
