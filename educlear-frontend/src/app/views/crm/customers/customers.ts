import {Component, inject, OnInit, QueryList, TemplateRef, ViewChildren} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {TableService} from '@core/services/table.service';
import {AsyncPipe, DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {NgIcon} from '@ng-icons/core';
import {RouterLink} from '@angular/router';
import {NgbModal, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {LucideAngularModule, LucideGlobe, LucideSearch, LucideShuffle} from 'lucide-angular';
import {toTitleCase} from '@/app/utils/string-utils';
import {clients} from '@/app/views/crm/customers/data';
import {FlatpickrDirective} from 'angularx-flatpickr';
import {CustomPagination} from '@app/components/custom-pagination';


type ClientType = {
    name: string;
    email: string;
    avatar: string;
    phone: string;
    countryName: string;
    flag: string;
    enrollDate: string;
    type: string;
    title: string;
    status: "active" | "blocked" | "verification-pending" | "inactive";
    selected?: boolean;
}


@Component({
    selector: 'app-customers',
    imports: [
        PageTitle,
        FormsModule,
        NgIcon,
        RouterLink,
        NgbPaginationModule,
        NgbdSortableHeader,
        LucideAngularModule,
        AsyncPipe,
        FlatpickrDirective,
        CustomPagination
    ],
    providers: [TableService],
    templateUrl: './customers.html',
    styles: ``
})
export class Customers implements OnInit {
    private modalService = inject(NgbModal);

    openAddCustomerModal(content: TemplateRef<any>) {
        this.modalService.open(content, {size: 'lg'});
    }

    statusType='All'
    filterByCountry='All'
    selectAll = false;

    LucideGlobe=LucideGlobe
    LucideSearch=LucideSearch


    records$: Observable<ClientType[]>
    total$: Observable<number>;

    @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader<ClientType>>;
    public tableService = inject(TableService<ClientType>)

    constructor(public pipe: DecimalPipe) {
        this.records$ = this.tableService.items$
        this.total$ = this.tableService.total$

    }

    ngOnInit(): void {
        this.tableService.setItems(clients, 8)
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


    protected readonly toTitleCase = toTitleCase;
    protected readonly LucideShuffle = LucideShuffle;
}
