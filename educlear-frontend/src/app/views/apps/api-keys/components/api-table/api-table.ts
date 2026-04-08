import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {TableService} from '@core/services/table.service';
import {Observable} from 'rxjs';
import {NgIcon} from '@ng-icons/core';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {FormsModule} from '@angular/forms';
import {LucideAngularModule, LucideCircleCheck, LucideGlobe} from 'lucide-angular';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {toTitleCase} from '@/app/utils/string-utils';
import {AsyncPipe} from '@angular/common';
import {apiClients} from '@/app/views/apps/api-keys/data';
import {ApiClientType} from '@/app/views/apps/api-keys/types';
import {FlatpickrDirective} from 'angularx-flatpickr';
import {CustomPagination} from '@app/components/custom-pagination';

@Component({
    selector: 'app-api-table',
    imports: [NgIcon, NgbdSortableHeader, FormsModule, LucideAngularModule, AsyncPipe, FlatpickrDirective, CustomPagination],
    providers: [TableService],
    templateUrl: './api-table.html',
})
export class ApiTable implements OnInit {

    private modalService = inject(NgbModal);

    openApiModal(content: TemplateRef<any>) {
        this.modalService.open(content, {size: 'lg'});
    }
    LucideCircleCheck=LucideCircleCheck
    LucideGlobe=LucideGlobe

    filterStatus='All'
    filterByRegion='All'
    selectAll = false;

    records$: Observable<ApiClientType[]>
    total$: Observable<number>;

    constructor(public tableService: TableService<ApiClientType>) {
        this.records$ = this.tableService.items$
        this.total$ = this.tableService.total$
    }

    ngOnInit(): void {
        this.tableService.setItems(apiClients, 8)
    }

    toggleAllSelection() {
        this.tableService.setAllSelection(this.selectAll);
    }

    toggleSingleSelection() {
        this.tableService.items$.subscribe(items => {
            this.selectAll = items.every((item: any) => item.selected);
        }).unsubscribe();
    }

    deleteSelected() {
        this.tableService.deleteSelectedItems();
        this.selectAll = false;
    }

    get hasSelection(): boolean {
        return this.tableService.hasSelectedItems();
    }

    copyToClipboard(text: string): void {
        navigator.clipboard.writeText(text)
    }

    readonly columns: (keyof ApiClientType)[] = ['name', 'author','apiKey', 'status', 'created', 'expiryDate', 'region']


    protected readonly toTitleCase = toTitleCase;
}
