import {Component, OnInit} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {NgIcon} from '@ng-icons/core';
import {LucideAngularModule, LucideBriefcase, LucideCalendarClock, LucideSearch} from 'lucide-angular';
import {
    CdkDrag,
    CdkDragDrop,
    CdkDropList,
    CdkDropListGroup,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop'
import {SimplebarAngularModule} from 'simplebar-angular';
import {RouterLink} from '@angular/router';
import {TaskItemType} from '@/app/views/crm/pipeline/types';
import {TaskItem} from '@/app/views/crm/pipeline/components/task-item';

@Component({
    selector: 'app-pipeline',
    imports: [
        PageTitle,
        NgIcon,
        LucideAngularModule,
        CdkDropListGroup, CdkDropList, CdkDrag, SimplebarAngularModule, RouterLink, TaskItem
    ],
    templateUrl: './pipeline.html',
    styles: ``
})
export class Pipeline implements OnInit{

    protected readonly LucideSearch = LucideSearch;
    protected readonly LucideBriefcase = LucideBriefcase;
    protected readonly LucideCalendarClock = LucideCalendarClock;

    leads: TaskItemType[] = []
    negotiations: TaskItemType[] = []
    won: TaskItemType[] = []
    lost: TaskItemType[] = []

    ngOnInit(): void {
        this.leads = this.kanbanItems.filter((t) => t.status === 'lead')
        this.negotiations = this.kanbanItems.filter((t) => t.status === 'negotiation')
        this.won = this.kanbanItems.filter((t) => t.status === 'won')
        this.lost = this.kanbanItems.filter((t) => t.status === 'lost')
    }

    drop(event: CdkDragDrop<TaskItemType[], any, any>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

kanbanItems: TaskItemType[] = [
        {
            id:"601",
            title: "AI Analytics Dashboard",
            user: "/assets/images/users/user-4.jpg",
            userName: "Mark Allen",
            company: "Amazon Web Services",
            date: "30 May, 2025",
            messages: 2,
            tasks: 3,
            amount: 95000,
            status: "lead",
        },
        {
            id:'602',
            title: "Mobile App Redesign",
            user: "/assets/images/users/user-2.jpg",
            userName: "Alex Carter",
            company: "ByteCraft Studios",
            date: "12 Jun, 2025",
            messages: 1,
            tasks: 5,
            amount: 72000,
            status: "lead",
        },
        {
            id:'603',
            title: "Website Revamp",
            user: "/assets/images/users/user-5.jpg",
            userName: "Emily Rose",
            company: "NextGen UI",
            date: "18 Jun, 2025",
            messages: 4,
            tasks: 2,
            amount: 45500,
            status: "lead",
        },
        {
            id:'604',
            title: "Campaign Strategy",
            user: "/assets/images/users/user-6.jpg",
            userName: "Ryan King",
            company: "Visionary Labs",
            date: "05 Jul, 2025",
            messages: 0,
            tasks: 1,
            amount: 23000,
            status: "lead",
        },
        {
            id:'605',
            title: "Product Demo Scheduling",
            user: "/assets/images/users/user-8.jpg",
            userName: "Nina White",
            company: "Innovexa",
            date: "15 Jul, 2025",
            messages: 3,
            tasks: 4,
            amount: 18750,
            status: "negotiation",
        },
        {
            id:'606',
            title: "CRM Integration Task",
            user: "/assets/images/users/user-9.jpg",
            userName: "Amit Rao",
            company: "CoreSync Ltd.",
            date: "22 Jul, 2025",
            messages: 7,
            tasks: 4,
            amount: 39900,
            status: "negotiation",
        },
        {
            id:'607',
            title: "Enterprise License Upgrade",
            user: "/assets/images/users/user-1.jpg",
            userName: "Sophia Lee",
            company: "Zentrix Corp",
            date: "01 Jul, 2025",
            messages: 5,
            tasks: 7,
            amount: 120000,
            status: "won",
        },
        {
            id:'608',
            title: "Custom CRM Implementation",
            user: "/assets/images/users/user-2.jpg",
            userName: "Mark J.",
            company: "DeltaSoft",
            date: "28 Jun, 2025",
            messages: 3,
            tasks: 1,
            amount: 89500,
            status: "won",
        },
        {
            id:'609',
            title: "API Subscription Expansion",
            user: "/assets/images/users/user-3.jpg",
            userName: "Raj Patel",
            company: "Netwise Solutions",
            date: "25 Jun, 2025",
            messages: 1,
            tasks: 5,
            amount: 58000,
            status: "won",
        },
        {
            id:'610',
            title: "Annual Cloud Retainer",
            user: "/assets/images/users/user-5.jpg",
            userName: "Tina Ray",
            company: "SkyVault Inc.",
            date: "21 Jun, 2025",
            messages: 9,
            tasks: 6,
            amount: 135000,
            status: "won",
        },
        {
            id:'611',
            title: "Marketing Automation Deal",
            user: "/assets/images/users/user-6.jpg",
            userName: "Mohit Chauhan",
            company: "CloudReach",
            date: "18 Jun, 2025",
            messages: 5,
            tasks: 4,
            amount: 62500,
            status: "won",
        },
        {
            id:'612',
            title: "E-commerce Platform Proposal",
            user: "/assets/images/users/user-7.jpg",
            userName: "Julia Mason",
            company: "QuickCart",
            date: "14 Jul, 2025",
            messages: 2,
            tasks: 6,
            amount: 55000,
            status: "lost",
        },
        {
            id:'613',
            title: "Social Media Integration Deal",
            user: "/assets/images/users/user-8.jpg",
            userName: "Ethan Cruz",
            company: "BuzzPro Media",
            date: "10 Jul, 2025",
            messages: 8,
            tasks: 3,
            amount: 38400,
            status: "lost",
        },
    ]

}
