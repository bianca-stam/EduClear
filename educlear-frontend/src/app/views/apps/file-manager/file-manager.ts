import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {FileSidebar} from '@/app/views/apps/file-manager/components/file-sidebar';
import {NgIcon} from '@ng-icons/core';
import {NgbDropdownModule, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {LucideAngularModule, LucideFile, LucideSearch} from 'lucide-angular';
import {FileRecordType, FolderType} from '@/app/views/apps/file-manager/types';
import {AsyncPipe, DatePipe} from '@angular/common';
import {FolderCard} from '@/app/views/apps/file-manager/components/folder-card';
import {SimplebarAngularModule} from 'simplebar-angular';
import {fileRecords} from '@/app/views/apps/file-manager/data';
import {formatFileSize} from '@/app/utils/file-utils';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {TableService} from '@core/services/table.service';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-file-manager',
    imports: [
        PageTitle,
        FileSidebar,
        NgIcon,
        LucideAngularModule,
        DatePipe,
        FolderCard,
        SimplebarAngularModule,
        NgbDropdownModule,
        RouterLink,
        NgbdSortableHeader,
        FormsModule,
        AsyncPipe,
    ],
    providers: [TableService],
    templateUrl: './file-manager.html',
    styles: ``
})
export class FileManager implements OnInit {
    private offcanvasService = inject(NgbOffcanvas)

    fileTypeFilter = "All"
    selectAll = false;

    LucideSeach = LucideSearch
    LucideFile = LucideFile

    openFileSidebar(content: TemplateRef<any>) {
        this.offcanvasService.open(content, {panelClass: 'outlook-left-menu outlook-left-menu-md'})
    }

    records$: Observable<FileRecordType[]>
    total$: Observable<number>;

    constructor(public tableService: TableService<FileRecordType>) {
        this.records$ = this.tableService.items$
        this.total$ = this.tableService.total$
    }

    ngOnInit(): void {
        this.tableService.setItems(fileRecords, 8)
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


    folders: FolderType[] = [
        {name: 'MyAdmin Multi', size: 2300000000},
        {name: 'Material Design', size: 105300000},
        {name: 'DashPro UI Kit', size: 512000000},
        {name: 'VueStudio Pack', size: 880000000},
        {name: 'Nextify Pro', size: 1100000000},
        {name: 'Blazor Studio', size: 780000000},
        {name: 'Angular Prime', size: 940000000},
        {name: 'React Kit Pro', size: 1600000000},
    ];

    protected readonly formatFileSize = formatFileSize;
}
