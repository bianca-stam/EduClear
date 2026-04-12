import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgIconComponent} from '@ng-icons/core';

@Component({
    selector: 'app-custom-pagination',
    standalone: true,
    imports: [NgbPaginationModule, NgIconComponent],
    template: `
        <div class="d-flex justify-content-between pagination-boxed pagination-sm align-items-center">
           <span class="text-muted">
            {{ showingRange }} {{itemsName}}
           </span>
            <ngb-pagination
                size="sm"
                [collectionSize]="collectionSize"
                [(page)]="page"
                [pageSize]="pageSize"
                (pageChange)="onPageChange($event)"
            >
                <ng-template ngbPaginationPrevious>
                    <ng-icon name="tablerChevronLeft"/>
                </ng-template>
                <ng-template ngbPaginationNext>
                    <ng-icon name="tablerChevronRight"/>
                </ng-template>
            </ngb-pagination>
        </div>
    `
})
export class CustomPagination {
    @Input() showingRange: string = '';
    @Input() itemsName: string = 'products';
    @Input() collectionSize!: number;
    @Input() page!: number;
    @Input() pageSize!: number;
    @Output() pageChange = new EventEmitter<number>();

    onPageChange(newPage: number) {
        this.page = newPage;
        this.pageChange.emit(newPage)
    }
}
