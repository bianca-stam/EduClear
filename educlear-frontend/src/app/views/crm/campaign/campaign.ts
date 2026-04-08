import {Component, inject, TemplateRef} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {TableService} from '@core/services/table.service';
import {LucideAngularModule, LucideSearch, LucideShuffle} from 'lucide-angular';
import {AsyncPipe, NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgIcon} from '@ng-icons/core';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {campaigns, campaignWidgets,CampaignType} from '@/app/views/crm/campaign/data';
import {Observable} from 'rxjs';
import {CustomPagination} from '@app/components/custom-pagination';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FlatpickrDirective} from 'angularx-flatpickr';
import {CrmStatisticWidget} from '@app/components/widgets/crm-statistic-widget';

@Component({
    selector: 'app-campaign',
    imports: [
        PageTitle,
        AsyncPipe,
        FormsModule,
        LucideAngularModule,
        NgIcon,
        FlatpickrDirective,
        NgbdSortableHeader,
        CustomPagination,
        NgClass,
        CrmStatisticWidget,
    ],
    providers: [TableService],
    templateUrl: './campaign.html',
    styles: ``
})
export class Campaign {
    protected readonly LucideSearch = LucideSearch;
    protected readonly LucideShuffle = LucideShuffle;
    private modalService = inject(NgbModal);

    openCampaignModal(content: TemplateRef<any>) {
        this.modalService.open(content, {size: 'lg'});
    }

    selectAll = false;
    filterStatus = "";

    campaigns$: Observable<CampaignType[]>;
    total$: Observable<number>;

    constructor(public tableService: TableService<CampaignType>) {
        this.campaigns$ = this.tableService.items$;
        this.total$ = this.tableService.total$;
    }

    ngOnInit(): void {
        this.tableService.setItems(campaigns, 8);
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

    protected readonly campaigns = campaigns;
    protected readonly campaignWidgets = campaignWidgets;
}
