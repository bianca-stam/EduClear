import {Component, OnInit} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {Observable} from 'rxjs';
import {TableService} from '@core/services/table.service';
import {countries, CountryType} from '@/app/views/icons/flags/data';
import {AsyncPipe} from '@angular/common';
import {LucideAngularModule, LucideSearch} from 'lucide-angular';
import {FormsModule} from '@angular/forms';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {CustomPagination} from '@app/components/custom-pagination';

@Component({
    selector: 'app-flags',
    imports: [
        PageTitle,
        AsyncPipe,
        LucideAngularModule,
        FormsModule,
        NgbdSortableHeader,
        CustomPagination
    ],
    providers: [TableService],
    templateUrl: './flags.html',
    styles: ``
})
export class Flags implements OnInit {
    countries$: Observable<CountryType[]>
    total$: Observable<number>;

    constructor(public tableService: TableService<CountryType>) {
        this.countries$ = this.tableService.items$
        this.total$ = this.tableService.total$
    }

    ngOnInit(): void {
        this.tableService.setItems(countries, 50)
    }

    protected readonly LucideSearch = LucideSearch;
}
