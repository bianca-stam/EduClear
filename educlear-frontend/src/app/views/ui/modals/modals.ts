import { Component, inject, TemplateRef } from '@angular/core';
import { PageTitle } from '@app/components/page-title';

import {
    NgbModal,
    NgbModalModule,
    NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UiCard } from '@app/components/ui-card';

@Component({
    selector: 'app-modals',
    imports: [PageTitle, UiCard, NgbModalModule, FormsModule],
    templateUrl: './modals.html',
    styles: ``,
})
export class Modals {
    private modalService = inject(NgbModal);

    name: string = '';

    open(content: TemplateRef<any>) {
        this.modalService.open(content);
    }

    openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
        this.modalService.open(content, options);
    }

    openvaryingModal(content: TemplateRef<HTMLElement>, name: string) {
        this.modalService.open(content);
        this.name = name;
    }
    modalTitle: string = 'Default Modal Title';

    openModals(
        content: TemplateRef<HTMLElement>,
        options: NgbModalOptions,
        title?: string
    ) {
        if (title) {
            this.modalTitle = title;
        }
        this.modalService.open(content, options);
    }
}
