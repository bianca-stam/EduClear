import {Component} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {
    LucideAngularModule,
    LucideLayers,
    LucideLayoutGrid,
    LucideList,
    LucideMapPin,
    LucideSearch,
    LucideUserCheck
} from 'lucide-angular';
import {ContactType} from '@/app/views/apps/users/contacts/types';
import {ContactCard} from '@/app/views/apps/users/contacts/components/contact-card';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-contacts',
    imports: [
        PageTitle,
        LucideAngularModule,
        ContactCard,
        NgbPagination,

    ],
    templateUrl: './contacts.html',
    styles: ``
})
export class Contacts {

    protected readonly LucideSearch = LucideSearch;
    protected readonly LucideUserCheck = LucideUserCheck;
    protected readonly LucideMapPin = LucideMapPin;
    protected readonly LucideLayers = LucideLayers;
    protected readonly LucideLayoutGrid = LucideLayoutGrid;
    protected readonly LucideList = LucideList;

    contacts: ContactType[] = [
        {
            id: 1,
            name: "Sophia Carter",
            avatar: "/assets/images/users/user-1.jpg",
            flag: "/assets/images/flags/gb.svg",
            role: "Lead UI/UX Designer",
            badge: { label: "Admin", color: "secondary" },
            username: "@Founder",
            website: "sophiacarter.com",
            stats: { posts: 134, followers: "29.8k", followings: 1125 },
            lastUpdated: "1 hour ago"
        },
        {
            id: 2,
            name: "Daniel Lee",
            avatar: "/assets/images/users/user-2.jpg",
            flag: "/assets/images/flags/us.svg",
            role: "Product Manager",
            badge: { label: "Verified", color: "success" },
            username: "@danielpm",
            website: "daniellee.com",
            stats: { posts: 98, followers: "12.5k", followings: 860 },
            lastUpdated: "2 hours ago"
        },
        {
            id: 3,
            name: "Maria Rodriguez",
            avatar: "/assets/images/users/user-3.jpg",
            flag: "/assets/images/flags/es.svg",
            role: "Marketing Head",
            badge: { label: "Team Lead", color: "info" },
            username: "@maria",
            website: "mariaworks.es",
            stats: { posts: 205, followers: "18.4k", followings: 1432 },
            lastUpdated: "3 hours ago"
        },
        {
            id: 4,
            name: "Liam Zhang",
            avatar: "/assets/images/users/user-4.jpg",
            flag: "/assets/images/flags/cn.svg",
            role: "Frontend Developer",
            badge: { label: "Contributor", color: "warning" },
            username: "@liamdev",
            website: "liamzhang.cn",
            stats: { posts: 67, followers: "9.3k", followings: 540 },
            lastUpdated: "10 mins ago"
        },
        {
            id: 5,
            name: "Ethan Wright",
            avatar: "/assets/images/users/user-7.jpg",
            flag: "/assets/images/flags/ca.svg",
            role: "Senior Backend Engineer",
            badge: { label: "Moderator", color: "primary" },
            username: "@DevOps",
            website: "ethanwright.dev",
            stats: { posts: 89, followers: "16.4k", followings: 734 },
            lastUpdated: "45 mins ago"
        },
        {
            id: 6,
            name: "Isabella Moretti",
            avatar: "/assets/images/users/user-8.jpg",
            flag: "/assets/images/flags/it.svg",
            role: "Content Strategist",
            badge: { label: "Top Creator", color: "danger" },
            username: "@isamoretti",
            website: "moretti.io",
            stats: { posts: 162, followers: "24.7k", followings: 921 },
            lastUpdated: "2 hours ago"
        },
        {
            id: 7,
            name: "Kenji Tanaka",
            avatar: "/assets/images/users/user-9.jpg",
            flag: "/assets/images/flags/jp.svg",
            role: "Full Stack Developer",
            badge: { label: "Contributor", color: "info" },
            username: "@kenjicode",
            website: "kenjitanaka.dev",
            stats: { posts: 113, followers: "13.9k", followings: 678 },
            lastUpdated: "30 mins ago"
        },
        {
            id: 8,
            name: "Amira El-Sayed",
            avatar: "/assets/images/users/user-1.jpg",
            flag: "/assets/images/flags/eg.svg",
            role: "Data Scientist",
            badge: { label: "Analyst", color: "warning" },
            username: "@amira.codes",
            website: "amira-ai.tech",
            stats: { posts: 176, followers: "21.1k", followings: 998 },
            lastUpdated: "20 mins ago"
        }
    ]
}
