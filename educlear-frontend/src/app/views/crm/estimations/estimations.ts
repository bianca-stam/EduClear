import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {TableService} from '@core/services/table.service';
import {LucideAngularModule, LucideSearch, LucideShuffle} from 'lucide-angular';
import {AsyncPipe, NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgIcon} from '@ng-icons/core';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {Observable} from 'rxjs';
import {CustomPagination} from '@app/components/custom-pagination';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FlatpickrDirective} from 'angularx-flatpickr';
import {CrmStatisticWidget} from '@app/components/widgets/crm-statistic-widget';
import {RouterLink} from '@angular/router';
import {EstimateType, estimations, estimationWidgets} from '@/app/views/crm/estimations/data';

@Component({
    selector: 'app-estimations',
    imports: [
        PageTitle,
        AsyncPipe,
        FormsModule,
        LucideAngularModule,
        NgIcon,
        FlatpickrDirective,
        NgbdSortableHeader,
        CustomPagination,
        CrmStatisticWidget,
        RouterLink,
        NgClass,
    ],
    providers: [TableService],
    templateUrl: './estimations.html',
    styles: ``
})
export class Estimations implements OnInit {
    protected readonly LucideSearch = LucideSearch;
    protected readonly LucideShuffle = LucideShuffle;
    private modalService = inject(NgbModal);

    openEstimationModal(content: TemplateRef<any>) {
        this.modalService.open(content, {size: 'lg'});
    }

    selectAll = false;
    filterStatus = "";

    estimations$: Observable<EstimateType[]>;
    total$: Observable<number>;

    constructor(public tableService: TableService<EstimateType>) {
        this.estimations$ = this.tableService.items$;
        this.total$ = this.tableService.total$;
    }

    ngOnInit(): void {
        this.tableService.setItems(estimations, 8);
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

    protected readonly estimationWidgets = estimationWidgets
}
