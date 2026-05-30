import {MenuItemType} from '@/app/types/layout';
import {
    LucideBookOpen, LucideCalendar, LucideCircleGauge,
    LucideGraduationCap, LucideNotebookPen, LucidePencilRuler,
    LucideUser
} from 'lucide-angular';

type UserDropdownItemType = {
    label?: string;
    icon?: string;
    url?: string;
    isDivider?: boolean;
    isHeader?: boolean;
    class?: string;
}

export const userDropdownItems: UserDropdownItemType[] = [
    {
        label: 'Log Out',
        icon: 'tablerLogout2',
        class: 'text-danger fw-semibold'
    }
];

export const menuItems: MenuItemType[] = [
    {label: 'EduClear', isTitle: true},
    {
        label: 'Cursos',
        icon: LucideGraduationCap,
        url: '/cursos',
    },
    {
        label: 'Área Personal',
        icon: LucideCalendar,
        url: '/area-personal',
    },
];

export const horizontalMenuItems: MenuItemType[] = [
    {
        label: 'Cursos',
        icon: LucideGraduationCap,
        url: '/cursos',
    },
    {
        label: 'Área Personal',
        icon: LucideCalendar,
        url: '/area-personal',
    },
];
