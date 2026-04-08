import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageTitle } from '@app/components/page-title';
import { NgIcon } from '@ng-icons/core';
import { SitemapItem } from './types';

@Component({
    selector: 'app-sitemap',
    imports: [PageTitle, NgIcon, RouterLink],
    templateUrl: './sitemap.html',
    styles: ``,
})
export class Sitemap {
    sitemap :SitemapItem[] = [
        {
            title: 'Dashboard & Pages',
            icon: 'tablerCircleDot',
            items: [
                {
                    label: 'Dashboards',
                    icon: 'tablerLayoutDashboard',
                    link:[],
                    children: [
                        { label: 'Analytics', link: [] },
                        { label: 'CRM', link: [] },
                        { label: 'Sales', link: [] },
                        { label: 'Minimal', link: [] },
                        { label: 'eCommerce', link: [] },
                    ],
                },
                {
                    label: 'Profile',
                    icon: 'tablerUser',
                    link:[],
                    children: [
                        { label: 'Overview', link: [] },
                        { label: 'Edit', link: [] },
                        { label: 'Security', link: [] },
                    ],
                },
                { label: 'Help Center', icon: 'tablerHelp', link: [] },
                { label: 'Login', icon: 'tablerLock', link: [] },
                { label: 'Register', icon: 'tablerUserPlus', link: [] },
            ],
        },
        {
            title: 'Applications',
            icon: 'tablerCircleDot',
            items: [
                { label: 'Calendar', icon: 'tablerCalendar', link: [] },
                {
                    label: 'Email',
                    icon: 'tablerMail',
                    link:[],
                    children: [
                        { label: 'Inbox', link: [] },
                        { label: 'Read', link: [] },
                        { label: 'Compose', link: [] },
                    ],
                },
                {
                    label: 'Users',
                    icon: 'tablerUsers',
                    link:[],
                    children: [
                        { label: 'List', link: [] },
                        { label: 'Add User', link: [] },
                        { label: 'Roles', link: [] },
                    ],
                },
                {
                    label: 'Projects',
                    icon: 'tablerNotebook',
                    link:[],
                    children: [
                        { label: 'Overview', link: [] },
                        { label: 'Create', link: [] },
                        { label: 'Tasks', link: [] },
                    ],
                },
            ],
        },
        {
            title: 'Reports & Settings',
            icon: 'tablerCircleDot',
            items: [
                {
                    label: 'Reports',
                    icon: 'tablerChartBar',
                    link:[],
                    children: [
                        { label: 'Sales', link: [] },
                        { label: 'Users', link: [] },
                        { label: 'Performance', link: [] },
                    ],
                },
                {
                    label: 'Billing',
                    icon: 'tablerWallet',
                    link:[],
                    children: [
                        { label: 'Invoices', link: [] },
                        { label: 'Payments', link: [] },
                        { label: 'Methods', link: [] },
                    ],
                },
                {
                    label: 'Settings',
                    icon: 'tablerSettings',
                    link:[],
                    children: [
                        { label: 'General', link: [] },
                        { label: 'Appearance', link: [] },
                        { label: 'Integrations', link: [] },
                        { label: 'Audit Logs', link: [] },
                    ],
                },
                { label: 'Logout', icon: 'tablerLogout', link: [] },
            ],
        },
    ];
}
