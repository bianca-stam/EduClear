import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {NgIcon} from '@ng-icons/core';

type MegaMenuType = {
    title: string;
    links: {
        icon:string;
        label: string;
        url: string;
    }[];
};

@Component({
    selector: 'app-mega-menu',
    imports: [RouterLink, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgIcon],
    templateUrl: './mega-menu.html',
})
export class MegaMenu {

    megaMenuItems: MegaMenuType[] = [
        {
            title: 'Dashboard & Analytics',
            links: [
                { label: 'Sales Dashboard', url: '', icon: "tablerChartLine" },
                { label: 'Marketing Dashboard', url: '', icon: "tablerBulb" },
                { label: 'Finance Overview', url: '', icon: "tablerCurrencyDollar" },
                { label: 'User Analytics', url: '', icon: "tablerUsers" },
                { label: 'Traffic Insights', url: '', icon: "tablerActivity" },
                { label: 'Performance Metrics', url: '', icon: "tablerGauge" },
                { label: 'Conversion Tracking', url: '', icon: "tablerZoomCheck" },
            ],
        },
        {
            title: 'Project Management',
            links: [
                { label: 'Kanban Workflow', url: '', icon: "tablerLayoutKanban" },
                { label: 'Project Timeline', url: '', icon: "tablerCalendarStats" },
                { label: 'Task Management', url: '', icon: "tablerListCheck" },
                { label: 'Team Members', url: '', icon: "tablerUsersGroup" },
                { label: 'Assignments', url: '', icon: "tablerClipboardList" },
                { label: 'Resource Allocation', url: '', icon: "tablerChartPie" },
                { label: 'Project Reports', url: '', icon: "tablerFileInvoice" },
            ],
        },
        {
            title: 'User Management',
            links: [
                { label: 'User Profiles', url: '', icon: "tablerUserCircle" },
                { label: 'Access Control', url: '', icon: "tablerLock" },
                { label: 'Role Permissions', url: '', icon: "tablerShieldLock" },
                { label: 'Activity Logs', url: '', icon: "tablerNotes" },
                { label: 'Security Settings', url: '', icon: "tablerSettings" },
                { label: 'User Groups', url: '', icon: "tablerUsers" },
                { label: 'Authentication', url: '', icon: "tablerKey" },
            ],
        },
    ]

}
