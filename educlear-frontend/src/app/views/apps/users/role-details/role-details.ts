import {Component, inject, TemplateRef} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {AsyncPipe} from '@angular/common';
import {CustomPagination} from '@app/components/custom-pagination';
import {FormsModule} from '@angular/forms';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {toTitleCase} from '@/app/utils/string-utils';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {TableService} from '@core/services/table.service';
import {LucideAngularModule, LucideSearch} from 'lucide-angular';
import {RouterLink} from '@angular/router';

type UserType = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
    date: string;
    time: string;
    status: "inactive" | "active" | "suspended",
    selected?: boolean
}

@Component({
    selector: 'app-role-details',
    imports: [
        NgIcon,
        AsyncPipe,
        CustomPagination,
        FormsModule,
        NgbdSortableHeader,
        RouterLink,
        NgbDropdown,
        NgbDropdownToggle,
        NgbDropdownMenu,
        NgbDropdownItem,
        LucideAngularModule
    ],
    providers: [TableService],
    templateUrl: './role-details.html',
    styles: ``
})
export class RoleDetails {
    private modalService = inject(NgbModal);

    openUserModal(content: TemplateRef<any>) {
        this.modalService.open(content, {size: 'lg'});
    }

    openRoleModal(content: TemplateRef<any>) {
        this.modalService.open(content, {size: 'lg'});
    }


    filterStatus = 'All'
    selectAll = false;

    protected readonly LucideSearch = LucideSearch;


    users$: Observable<UserType[]>
    total$: Observable<number>;

    constructor(public tableService: TableService<UserType>) {
        this.users$ = this.tableService.items$
        this.total$ = this.tableService.total$
    }

    ngOnInit(): void {
        const data: UserType[] = this.users
        this.tableService.setItems(data, 8)
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


    users: UserType[] = [
        {
            id: "#USR00123",
            name: "Nathan Young",
            email: "nathan@companymail.com",
            avatar: "assets/images/users/user-5.jpg",
            role: "Project Manager",
            date: "18 Apr, 2025",
            time: "9:45 AM",
            status: "inactive"
        },
        {
            id: "#USR00145",
            name: "Leah Kim",
            email: "leah@wavehub.io",
            avatar: "assets/images/users/user-3.jpg",
            role: "Developer",
            date: "21 Apr, 2025",
            time: "3:15 PM",
            status: "active"
        },
        {
            id: "#USR00162",
            name: "Sophie Lee",
            email: "sophie@infrakit.io",
            avatar: "assets/images/users/user-1.jpg",
            role: "Support Lead",
            date: "19 Apr, 2025",
            time: "10:00 AM",
            status: "suspended"
        },
        {
            id: "#USR00178",
            name: "David Tran",
            email: "david@devsync.com",
            avatar: "assets/images/users/user-2.jpg",
            role: "Developer",
            date: "22 Apr, 2025",
            time: "8:15 AM",
            status: "active"
        },
        {
            id: "#USR00189",
            name: "Isabella Moore",
            email: "isabella@tracklog.com",
            avatar: "assets/images/users/user-4.jpg",
            role: "Security Officer",
            date: "20 Apr, 2025",
            time: "2:45 PM",
            status: "active"
        },
        {
            id: "#USR00203",
            name: "Daniel Cooper",
            email: "daniel@cloudops.dev",
            avatar: "assets/images/users/user-6.jpg",
            role: "Support Lead",
            date: "15 Apr, 2025",
            time: "11:20 AM",
            status: "inactive"
        },
        {
            id: "#USR00215",
            name: "Ava Thompson",
            email: "ava@digitalsphere.io",
            avatar: "assets/images/users/user-8.jpg",
            role: "Developer",
            date: "23 Apr, 2025",
            time: "4:25 PM",
            status: "active"
        },
        {
            id: "#USR00228",
            name: "Mason Carter",
            email: "mason@buildzone.io",
            avatar: "assets/images/users/user-9.jpg",
            role: "Security Officer",
            date: "17 Apr, 2025",
            time: "6:10 PM",
            status: "suspended"
        },
        {
            id: "#USR00239",
            name: "Chloe Adams",
            email: "chloe@infraops.io",
            avatar: "assets/images/users/user-10.jpg",
            role: "Project Manager",
            date: "11 Apr, 2025",
            time: "1:30 PM",
            status: "inactive"
        },
        {
            id: "#USR00149",
            name: "Isabella Moore",
            email: "isabella@tracklog.com",
            avatar: "assets/images/users/user-4.jpg",
            role: "Security Officer",
            date: "20 Apr, 2025",
            time: "2:45 PM",
            status: "active"
        },

    ];

    protected readonly toTitleCase = toTitleCase;
}
