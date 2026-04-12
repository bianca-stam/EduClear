import {Component, inject, TemplateRef} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {NgbOffcanvas, NgbOffcanvasModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {EmailSidebar} from '@/app/views/apps/email/components/email-sidebar';
import {SimplebarAngularModule} from 'simplebar-angular';
import {LucideAngularModule, LucideSearch} from 'lucide-angular';
import {actions, emails} from '@/app/views/apps/email/data';
import {NgIcon} from '@ng-icons/core';
import {RouterLink} from '@angular/router';
import {EmailItemType} from '@/app/views/apps/email/types';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-inbox',
    imports: [
        PageTitle,
        NgbOffcanvasModule,
        EmailSidebar,
        SimplebarAngularModule,
        LucideAngularModule,

        NgbTooltipModule,
        NgIcon,
        RouterLink,
        FormsModule
    ],
    templateUrl: './inbox.html',
    styles: ``
})
export class Inbox {
    searchTerm: string = '';
    private offcanvasService = inject(NgbOffcanvas);

    actions = actions
    emails = emails;
    filteredEmails: EmailItemType[] = this.emails;
    selectedEmails: EmailItemType[] = [];
    selectAll = false;

    open(content: TemplateRef<any>) {
        this.offcanvasService.open(content, {panelClass: 'outlook-left-menu outlook-left-menu-sm'})
    }

    onSearch(term: string) {
        this.searchTerm = term;
        const lowerTerm = term.toLowerCase();
        this.filteredEmails = this.emails.filter(email =>
            email.name.toLowerCase().includes(lowerTerm) ||
            email.subject.toLowerCase().includes(lowerTerm) ||
            email.snippet.toLowerCase().includes(lowerTerm)
        );
    }


    onEmailSelect(email: EmailItemType): void {
        if (email.selected) {
            this.selectedEmails.push(email);
        } else {
            this.selectedEmails = this.selectedEmails.filter(e => e.id !== email.id);
        }
    }


    toggleSelectAll(): void {
        this.filteredEmails.forEach(email => {
            email.selected = this.selectAll;
            this.onEmailSelect(email); // update selection list
        });
    }

    protected readonly LucideSearch = LucideSearch;
}
