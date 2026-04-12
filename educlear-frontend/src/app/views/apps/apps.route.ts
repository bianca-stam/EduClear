import {Routes} from '@angular/router';
import {Calendar} from '@/app/views/apps/calendar/calendar';
import {Chat} from '@/app/views/apps/chat/chat';
import {FileManager} from '@/app/views/apps/file-manager/file-manager';
import {Contacts} from '@/app/views/apps/users/contacts/contacts';
import {Roles} from '@/app/views/apps/users/roles/roles';
import {Permissions} from '@/app/views/apps/users/permissions/permissions';
import {Inbox} from '@/app/views/apps/email/inbox/inbox';
import {Details} from '@/app/views/apps/email/details/details';
import {Compose} from '@/app/views/apps/email/compose/compose';
import {EmailTemplates} from '@/app/views/apps/email/email-templates/email-templates';
import {Profile} from '@/app/views/apps/users/profile/profile';
import {RoleDetails} from '@/app/views/apps/users/role-details/role-details';
import {SocialFeed} from '@/app/views/apps/social-feed/social-feed';
import {TicketList} from '@/app/views/apps/support-center/ticket-list/ticket-list';
import {TicketDetails} from '@/app/views/apps/support-center/ticket-details/ticket-details';
import {TicketCreate} from '@/app/views/apps/support-center/ticket-create/ticket-create';
import {ApiKeys} from '@/app/views/apps/api-keys/api-keys';

export const APPS_ROUTES: Routes = [
    {
        path: 'apps/calendar',
        component: Calendar,
        data: {title: "Calendar"},
    },
    {
        path: 'apps/chat',
        component: Chat,
        data: {title: "Chat"},
    },
    {
        path: 'apps/file-manager',
        component: FileManager,
        data: {title: "File Manager"},
    },
    {
        path: 'apps/email/inbox',
        component: Inbox,
        data: {title: "Inbox"},
    },
    {
        path: 'apps/email/detail',
        component: Details,
        data: {title: "Email Details"},
    },
    {
        path: 'apps/email/compose',
        component: Compose,
        data: {title: "Compose Email"},
    },
    {
        path: 'apps/email/templates',
        component: EmailTemplates,
        data: {title: "Email Templates  "},
    },
    {
        path: 'users/contacts',
        component: Contacts,
        data: {title: "Contacts"},
    },
    {
        path: 'users/roles',
        component: Roles,
        data: {title: "User Roles"},
    },
    {
        path: 'users/role-details',
        component: RoleDetails,
        data: {title: "Role Details"},
    },
    {
        path: 'users/profile',
        component: Profile,
        data: {title: "Profile"},
    },
    {
        path: 'users/permissions',
        component: Permissions,
        data: {title: "User Permissions"},
    },
    {
        path: 'apps/social-feed',
        component: SocialFeed,
        data: {title: "Social Feed"},
    },
    {
        path: 'tickets-list',
        component: TicketList,
        data: {title: "Ticket List"},
    },
    {
        path: 'ticket-details',
        component: TicketDetails,
        data: {title: "Ticket Details"},
    },
    {
        path: 'ticket-create',
        component: TicketCreate,
        data: {title: "Ticket Create"},
    },
    {
        path: 'api-keys',
        component: ApiKeys,
        data: {title: "Api Keys"},
    },
]
