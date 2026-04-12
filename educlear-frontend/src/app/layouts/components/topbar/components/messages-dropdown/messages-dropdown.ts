import {Component} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {LucideAngularModule, LucideIconData, Bell, ShieldUser, LucideBell} from 'lucide-angular';
import {SimplebarAngularModule} from 'simplebar-angular';
import {NgIcon} from '@ng-icons/core';
import {NgClass} from '@angular/common';

type MessageItemType = {
    id: string;
    user: {
        name: string;
        avatar?: string;
        icon?: string;
        bgClass?: string;
    };
    action: string;
    context: string;
    timestamp: string;
    active?: boolean;
    badge: { icon: string; variant: string };
};

@Component({
    selector: 'app-messages-dropdown',
    imports: [
        NgbDropdownMenu,
        NgbDropdownToggle,
        NgbDropdown,

        LucideAngularModule,
        SimplebarAngularModule,
        NgIcon,
        NgClass,
        NgbDropdownItem
    ],
    templateUrl: './messages-dropdown.html'
})
export class MessagesDropdown {

    protected readonly Bell = Bell;

    messages: MessageItemType[] = [
        {
            id: 'message-1',
            user: { name: 'Emily Johnson', avatar: 'assets/images/users/user-1.jpg' },
            action: 'commented on a task in',
            context: 'Design Sprint',
            timestamp: '12 minutes ago',
            active: true,
            badge: { icon: 'tablerBell', variant: 'success' },
        },
        {
            id: 'message-2',
            user: { name: 'Ava Mitchell', avatar: 'assets/images/users/user-2.jpg' },
            action: 'commented on',
            context: 'Marketing Campaign Q3',
            timestamp: '12 minutes ago',
            badge: { icon: 'tablerCloudUpload', variant: 'info' },
        },
        {
            id: 'message-4',
            user: { name: 'Sophia Taylor', avatar: 'assets/images/users/user-4.jpg' },
            action: 'sent an invoice for',
            context: 'Service Renewal',
            timestamp: '1 hour ago',
            badge: { icon: 'tablerAlertTriangle', variant: 'success' },
        },
        {
            id: 'message-5',
            user: { name: 'Ethan Moore', avatar: 'assets/images/users/user-5.jpg' },
            action: 'completed the task',
            context: 'UI Review',
            timestamp: '2 hours ago',
            badge: { icon: 'tablerCalendarEvent', variant: 'primary' },
        },
        {
            id: 'message-6',
            user: { name: 'Olivia White', avatar: 'assets/images/users/user-6.jpg' },
            action: 'assigned you a task in',
            context: 'Sales Pipeline',
            timestamp: 'Yesterday',
            badge: { icon: 'tablerEditCircle', variant: 'secondary' },
        },
        {
            id: 'message-7',
            user: { name: 'Server #3', icon: 'tablerServerBolt', bgClass: 'bg-light' },
            action: 'CPU usage exceeded 90%',
            context: '',
            timestamp: 'Just Now',
            badge: { icon: 'tablerAlertCircle', variant: 'danger' },
        },
        {
            id: 'message-8',
            user: { name: 'Product Server', icon: 'tablerRocket', bgClass: 'bg-light' },
            action: 'assigned you a task in',
            context: 'Sales Pipeline',
            timestamp: 'Yesterday',
            badge: { icon: 'tablerCheck', variant: 'success' },
        },
    ];
    protected readonly LucideBell = LucideBell;
}
