import {Component, inject, TemplateRef} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {EmailSidebar} from '@/app/views/apps/email/components/email-sidebar';
import {SimplebarAngularModule} from 'simplebar-angular';
import {NgIcon} from '@ng-icons/core';
import {NgbCollapseModule, NgbOffcanvas, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {actions} from '@/app/views/apps/email/data';
import {RouterLink} from '@angular/router';
import {LucideAngularModule, LucideSearch} from 'lucide-angular';

@Component({
    selector: 'app-details',
    imports: [
        PageTitle,
        EmailSidebar,
        SimplebarAngularModule,
        NgIcon,
        NgbTooltipModule,
        RouterLink,
        NgbCollapseModule,
        LucideAngularModule
    ],
    templateUrl: './details.html',
    styles: ``
})
export class Details {
    isCollapsed1:boolean = true;
    isCollapsed2:boolean = true;
    isCollapsed3:boolean = false;
    isEmailReplyCollapsed:boolean = true;

    actions = actions

    private offcanvasService = inject(NgbOffcanvas);


    open(content: TemplateRef<any>) {
        this.offcanvasService.open(content, {panelClass: 'outlook-left-menu outlook-left-menu-sm'});
    }

    replyToolbarButtons = [
        { title: 'Bold', icon: 'tablerBold' },
        { title: 'Italic', icon: 'tablerItalic' },
        { title: 'Attach files', icon: 'tablerPaperclip' },
        { title: 'Insert link', icon: 'tablerLink' },
        { title: 'Insert photo', icon: 'tablerPhotoUp' }
    ];

    protected readonly LucideSearch = LucideSearch;
}
