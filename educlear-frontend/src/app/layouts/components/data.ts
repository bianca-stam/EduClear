import {MenuItemType} from '@/app/types/layout';
import {
    LucideCalendar, LucideChartBar, LucideChartNoAxesCombined,
    LucideCircleGauge, LucideComponent, LucideDessert,
    LucideEarth, LucideEyeOff, LucideFileBox, LucideFileInput, LucideFingerprint,
    LucideFolderOpenDot, LucideHandshake, LucideHexagon, LucideHousePlug, LucideInbox, LucideKey, LucideLifeBuoy,
    LucideListTree, LucideMapPinned,
    LucideMessageSquareDot, LucideNotebookText, LucidePanelRightClose,
    LucidePanelTop, LucidePencilRuler, LucideProportions, LucideReceiptText, LucideRss,
    LucideShieldAlert, LucideShieldUser, LucideShoppingBag, LucideSparkles, LucideTable, LucideTable2,
    LucideTableConfig, LucideUsers
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
        label: 'Welcome back!',
        isHeader: true
    },
    {
        label: 'Profile',
        icon: 'tablerUserCircle',
        url: '/pages/profile'
    },
    {
        label: 'Notifications',
        icon: 'tablerBellRinging',
        url: ''
    },
    {
        label: 'Balance: $985.25',
        icon: 'tablerCreditCard',
        url: '',
    },
    {
        label: 'Account Settings',
        icon: 'tablerSettings2',
        url: ''
    },
    {
        label: 'Support Center',
        icon: 'tablerHeadset',
        url: ''
    },
    {
        isDivider: true
    },
    {
        label: 'Lock Screen',
        icon: 'tablerLock',
        url: '/auth/lock-screen'
    },
    {
        label: 'Log Out',
        icon: 'tablerLogout2',
        url: '',
        class: 'text-danger fw-semibold'
    }
];

export const menuItems: MenuItemType[] = [
    {label: 'Navigation', isTitle: true},
    {
        label: 'Dashboards',
        icon: LucideCircleGauge,
        isCollapsed: true,
        badge: {variant: 'success', text: '02'},
        children: [
            {label: 'Dashboard 1', url: '/dashboard'},
            {label: 'Dashboard 2', url: '/dashboard2'},
        ]
    },
    {
        label: 'Landing Page',
        icon: LucideEarth,
        url: '/landing',
    },

    {label: 'Apps', isTitle: true},
    {
        label: 'Chat',
        icon: LucideMessageSquareDot,
        url: '/apps/chat',
    },
    {
        label: 'Calendar',
        icon: LucideCalendar,
        url: '/apps/calendar',
    },
    {
        label: 'File Manager',
        icon: LucideFolderOpenDot,
        url: '/apps/file-manager',
    },
    {
        label: 'Ecommerce',
        icon: LucideShoppingBag,
        isCollapsed: true,
        children: [
            {
                label: 'Products',
                isCollapsed: true,
                children: [
                    {label: 'Listing', url: '/ecommerce/products'},
                    {label: 'Products Grid', url: '/ecommerce/products/grid'},
                    {label: 'Product Details', url: '/ecommerce/products/WB-10245'},
                    {label: 'Add Product', url: '/ecommerce/products/add'},
                ]
            },
            {label: 'Categories', url: '/ecommerce/categories'},
            {
                label: 'Orders',
                isCollapsed: true,
                children: [
                    {label: 'Orders', url: '/ecommerce/orders'},
                    {label: 'Order Details', url: '/ecommerce/orders/WB20103'},
                ]
            },
            {label: 'Customers', url: '/ecommerce/customers'},
            {
                label: 'Sellers',
                isCollapsed: true,
                children: [
                    {label: 'Sellers', url: '/ecommerce/sellers'},
                    {label: 'Seller Details', url: '/ecommerce/sellers/2'},
                ]
            },
            {label: 'Reviews', url: '/ecommerce/reviews'},

        ]
    },
    {
        label: 'Email',
        icon: LucideInbox,
        badge: {
            text: 'New',
            variant: 'danger',
        },
        isCollapsed: true,
        children: [
            {label: 'Inbox', url: '/apps/email/inbox'},
            {label: 'Details', url: '/apps/email/detail'},
            {label: 'Compose', url: '/apps/email/compose'},
            {label: 'Email Templates', url: '/apps/email/templates'},
        ]
    },
    {
        label: 'CRM',
        icon: LucideHandshake,
        children: [
            {label: 'Contacts', url: '/crm/contacts'},
            {label: 'Opportunities', url: '/crm/opportunities'},
            {label: 'Deals', url: '/crm/deals'},
            {label: 'Leads', url: '/crm/leads'},
            {label: 'Pipeline', url: '/crm/pipeline'},
            {label: 'Campaign', url: '/crm/campaign'},
            {label: 'Proposals', url: '/crm/proposals'},
            {label: 'Estimations', url: '/crm/estimations'},
            {label: 'Customers', url: '/crm/customers'},
            {label: 'Activities', url: '/crm/activities'},
        ],
    },
    {
        label: 'Users',
        icon: LucideUsers,
        isCollapsed: true,
        children: [
            {label: 'Contacts', url: '/users/contacts'},
            {label: 'Profile', url: '/users/profile'},
            {label: 'Roles', url: '/users/roles'},
            {label: 'Role Details', url: '/users/role-details'},
            {label: 'Permissions', url: '/users/permissions'},
        ]
    },

    {
        label: 'Invoice',
        icon: LucideReceiptText,
        isCollapsed: true,
        children: [
            {label: 'Invoices', url: '/invoices'},
            {label: 'New Invoice', url: '/invoices/new'},
            {label: 'Single Invoice', url: '/invoice/INS-0120010'},
        ]
    },
    {
        label: 'Social Feed',
        icon: LucideRss,
        url: '/apps/social-feed'
    },
    {
        label: 'Support Center',
        icon: LucideLifeBuoy,
        children: [
            {  label: 'Tickets List', url: '/tickets-list' },
            {  label: 'Ticket Details', url: '/ticket-details' },
            {  label: 'Ticket Create', url: '/ticket-create' },
        ],
    },
    {
        label: 'Api Keys',
        icon: LucideKey,
        url: '/api-keys'
    },
    {label: 'Custom Pages', isTitle: true},
    {
        label: 'Pages',
        icon: LucideNotebookText,
        isCollapsed: true,
        children: [
            {label: 'FAQ', url: '/pages/faq'},
            {label: 'Pricing', url: '/pages/pricing'},
            {label: 'Empty Page', url: '/pages/empty-page'},
            {label: 'Timeline', url: '/pages/timeline'},
            {label: 'Sitemap', url: '/pages/sitemap' },
            {label: 'Search Results', url: '/pages/search-results'},
            {label: 'Coming Soon', url: '/coming-soon'},
            {label: 'Terms & Conditions', url: '/pages/terms-and-conditions'},
        ]
    },

    {
        label: 'Authentication',
        icon: LucideFingerprint,
        isCollapsed: true,
        children: [
            {
                label: 'Basic',
                isCollapsed: true,
                children: [
                    {label: 'Sign In', url: '/auth/sign-in'},
                    {label: 'Sign Up', url: '/auth/sign-up'},
                    {label: 'Reset Password', url: '/auth/reset-pw'},
                    {label: 'New Password', url: '/auth/new-pw'},
                    {label: 'Two Factor', url: '/auth/two-factor'},
                    {label: 'Lock Screen', url: '/auth/lock-screen'},
                    {label: 'Success Mail', url: '/auth/success-mail'},
                    {label: 'Login with PIN', url: '/auth/login-pin'},
                    {label: 'Delete Account', url: '/auth/delete-account'},
                ]
            },
            {
                label: 'Cover',
                isCollapsed: true,
                children: [
                    {label: 'Sign In', url: '/auth-2/sign-in'},
                    {label: 'Sign Up', url: '/auth-2/sign-up'},
                    {label: 'Reset Password', url: '/auth-2/reset-pw'},
                    {label: 'New Password', url: '/auth-2/new-pw'},
                    {label: 'Two Factor', url: '/auth-2/two-factor'},
                    {label: 'Lock Screen', url: '/auth-2/lock-screen'},
                    {label: 'Success Mail', url: '/auth-2/success-mail'},
                    {label: 'Login with PIN', url: '/auth-2/login-pin'},
                    {label: 'Delete Account', url: '/auth-2/delete-account'},
                ]
            },
        ]
    },
    {
        label: 'Error Pages',
        icon: LucideShieldAlert,
        isCollapsed: true,
        children: [
            {label: '400', url: '/error/400'},
            {label: '401', url: '/error/401'},
            {label: '403', url: '/error/403'},
            {label: '404', url: '/error/404'},
            {label: '408', url: '/error/408'},
            {label: '500', url: '/error/500'},
            {label: 'Maintenance', url: '/maintenance'},
        ]
    },
    {label: 'Layouts', isTitle: true},
    {
        label: 'Layout Options',
        icon: LucideProportions,
        isCollapsed: true,
        children: [
            {label: 'Scrollable', url: '/layouts/scrollable'},
            {label: 'Compact', url: '/layouts/compact'},
            {label: 'Boxed', url: '/layouts/boxed'},
            {label: 'Horizontal', url: '/layouts/horizontal'},
            {label: 'Preloader', url: '/layouts/preloader'},
        ]
    },
    {
        label: 'Sidebars',
        icon: LucidePanelRightClose,
        isCollapsed: true,
        children: [
            {label: 'Light Menu', url: '/layouts/sidebars/light'},
            {label: 'Gradient Menu', url: '/layouts/sidebars/gradient'},
            {label: 'Gray Menu', url: '/layouts/sidebars/gray'},
            {label: 'Image Menu', url: '/layouts/sidebars/image'},
            {label: 'Compact Menu', url: '/layouts/sidebars/compact'},
            {label: 'Icon View Menu', url: '/layouts/sidebars/icon-view'},
            {label: 'On Hover Menu', url: '/layouts/sidebars/on-hover'},
            {label: 'On Hover Active', url: '/layouts/sidebars/on-hover-active'},
            {label: 'Offcanvas Menu', url: '/layouts/sidebars/offcanvas'},
            {label: 'No Icons with Lines', url: '/layouts/sidebars/no-icons-with-lines'},
            {label: 'Sidebar with Lines', url: '/layouts/sidebars/with-lines'},
        ]
    },
    {
        label: 'Topbars',
        icon: LucidePanelTop,
        isCollapsed: true,
        children: [
            {label: 'Dark Topbar', url: '/layouts/topbars/dark'},
            {label: 'Gray Topbar', url: '/layouts/topbars/gray'},
            {label: 'Gradient Topbar', url: '/layouts/topbars/gradient'},
        ]
    },
    {label: 'Components', isTitle: true},
    {
        label: 'Base UI',
        icon: LucidePencilRuler,
        isCollapsed: true,
        children: [
            {label: 'Accordions', url: '/ui/accordions'},
            {label: 'Alerts', url: '/ui/alerts'},
            {label: 'Images', url: '/ui/images'},
            {label: 'Badges', url: '/ui/badges'},
            {label: 'Breadcrumb', url: '/ui/breadcrumb'},
            {label: 'Buttons', url: '/ui/buttons'},
            {label: 'Cards', url: '/ui/cards'},
            {label: 'Carousel', url: '/ui/carousel'},
            {label: 'Collapse', url: '/ui/collapse'},
            {label: 'Colors', url: '/ui/colors'},
            {label: 'Dropdowns', url: '/ui/dropdowns'},
            {label: 'Videos', url: '/ui/videos'},
            {label: 'Grid Options', url: '/ui/grid-options'},
            {label: 'Links', url: '/ui/links'},
            {label: 'List Group', url: '/ui/list-groups'},
            {label: 'Modals', url: '/ui/modals'},
            {label: 'Notifications', url: '/ui/notifications'},
            {label: 'Offcanvas', url: '/ui/offcanvas'},
            {label: 'Placeholders', url: '/ui/placeholders'},
            {label: 'Pagination', url: '/ui/pagination'},
            {label: 'Popovers', url: '/ui/popovers'},
            {label: 'Progress', url: '/ui/progress'},
            {label: 'Srollspy', url: '/ui/scrollspy'},
            {label: 'Spinners', url: '/ui/spinners'},
            {label: 'Tabs', url: '/ui/tabs'},
            {label: 'Tooltips', url: '/ui/tooltips'},
            {label: 'Typography', url: '/ui/typography'},
            {label: 'Utilities', url: '/ui/utilities'},

        ]
    },
    {
        label: 'Miscellaneous',
        icon: LucideHousePlug,
        isCollapsed: true,
        children: [
            {label: 'PDF Viewer', url: '/miscellaneous/pdf-viewer'},
            {label: 'Sweet Alerts', url: '/miscellaneous/sweet-alerts'},
            {label: 'Password Meter', url: '/miscellaneous/password-meter'},
            {label: 'Clipboard', url: '/miscellaneous/clipboard'},
            {label: 'Tour', url: '/miscellaneous/tour'},
        ]
    },
    {
        label: 'Widgets',
        icon: LucideDessert,
        url: '/widgets',
    },
    {
        label: 'Charts',
        icon: LucideChartNoAxesCombined,
        isCollapsed: true,
        children: [
            {
                label: 'Apex Charts',
                isCollapsed: true,
                children: [
                    {label: 'Area', url: '/charts/apex/area'},
                    {label: 'Bar', url: '/charts/apex/bar'},
                    {label: 'Bubble', url: '/charts/apex/bubble'},
                    {label: 'Candlestick', url: '/charts/apex/candlestick'},
                    {label: 'Column', url: '/charts/apex/column'},
                    {label: 'Heatmap', url: '/charts/apex/heatmap'},
                    {label: 'Line', url: '/charts/apex/line'},
                    {label: 'Mixed', url: '/charts/apex/mixed'},
                    {label: 'Timeline', url: '/charts/apex/timeline'},
                    {label: 'Boxplot', url: '/charts/apex/boxplot'},
                    {label: 'Treemap', url: '/charts/apex/treemap'},
                    {label: 'Pie', url: '/charts/apex/pie'},
                    {label: 'Radar', url: '/charts/apex/radar'},
                    {label: 'RadialBar', url: '/charts/apex/radialbar'},
                    {label: 'Scatter', url: '/charts/apex/scatter'},
                    {label: 'Polar Area', url: '/charts/apex/polar-area'},
                    {label: 'Sparklines', url: '/charts/apex/sparklines'},
                    {label: 'Range', url: '/charts/apex/range'},
                    {label: 'Funnel', url: '/charts/apex/funnel'},
                    {label: 'Slope', url: '/charts/apex/slope'},
                ]
            },
            {
                label: 'Chart JS',
                children: [
                    { label: 'Area', url: '/charts/chartjs/area' },
                    {  label: 'Bar', url: '/charts/chartjs/bar' },
                    {  label: 'Line', url: '/charts/chartjs/line' },
                    {  label: 'Other', url: '/charts/chartjs/other' },
                ],
            },
            {label: 'Apex Tree', url: '/charts/apextree'},
            {label: 'Apex Sankey', url: '/charts/apexsankey'},
        ]
    },
    {
        label: 'Forms',
        icon: LucideFileInput,
        isCollapsed: true,
        children: [
            {label: 'Basic Elements', url: '/forms/basic-elements'},
            {label: 'Pickers', url: '/forms/pickers'},
            {label: 'Select', url: '/forms/select'},
            {label: 'Validation', url: '/forms/validation'},
            {label: 'Wizard', url: '/forms/wizard'},
            {label: 'File uploads', url: '/forms/file-uploads'},
            {label: 'Text Editors', url: '/forms/text-editors'},
            {label: 'Slider', url: '/forms/range-slider'},
            {label: 'Layouts', url: '/forms/layouts'},
            {label: 'Other Plugins', url: '/forms/other-plugins'},
        ]
    },
    {
        label: 'Tables',
        icon: LucideTable,
        isCollapsed: true,
        children: [
            {label: 'Static Tables', url: '/tables/static'},
            {label: 'Custom Tables', url: '/tables/custom'},
            {
                label: 'Tanstack',
                isCollapsed: true,
                children: [
                    {label: 'Table With Search', url: '/tanstack/table-with-search'},
                    {label: 'Table With Delete Button', url: '/tanstack/table-with-delete-button'},
                    {label: 'Table With Pagination', url: '/tanstack/table-with-pagination'},
                    {label: 'Table With Sort', url: '/tanstack/table-with-sort'},
                    {label: 'Table With Checkbox', url: '/tanstack/table-with-checkbox'},
                    {label: 'Table With Filters', url: '/tanstack/table-with-filters'},

                ]
            },

        ]
    },
    {
        label: 'Icons',
        icon: LucideSparkles,
        isCollapsed: true,
        children: [
            {label: 'Tabler', url: '/icons/tabler'},
            {label: 'Lucide', url: '/icons/lucide'},
            {label: 'Flags', url: '/icons/flags'},
        ],
    },
    {
        label: 'Maps',
        icon: LucideMapPinned,
        isCollapsed: true,
        children: [
            {label: 'Vector Maps', url: '/maps/vector'},
            {label: 'Leaflet Maps', url: '/maps/leaflet'},
        ]
    },
    {label: 'Menu Items', isTitle: true},
    {
        label: 'Menu Levels',
        icon: LucideListTree,
        isCollapsed: true,
        children: [
            {
                label: 'Second Level',
                isCollapsed: true,
                children: [
                    {label: 'Item 2.1', url: 'javascript: void(0);'},
                    {label: 'Item 2.2', url: 'javascript: void(0);'}
                ]
            },
            {
                label: 'Third Level',
                isCollapsed: true,
                children: [
                    {label: 'Item 1', url: 'javascript: void(0);'},
                    {
                        label: 'Item 2',
                        isCollapsed: true,
                        children: [
                            {label: 'Item 3.1', url: 'javascript: void(0);'},
                            {label: 'Item 3.2', url: 'javascript: void(0);'}
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'Disabled Menu',
        icon: LucideEyeOff,
        url: '#!',
        isDisabled: true
    },

];

export const horizontalMenuItems: MenuItemType[] = [
    {
        label: 'Dashboards',
        icon: LucideCircleGauge,
        children: [
            {label: 'Dashboard 1', url: '/dashboard'},
            {label: 'Dashboard 2', url: '/dashboard2'},

        ]
    },
    {
        label: 'Apps',
        icon: LucideFileBox,
        children: [
            {
                label: 'Calendar',
                icon: LucideCalendar,
                url: '/apps/calendar',
            },
            {
                label: 'Chat',
                icon: LucideMessageSquareDot,
                url: '/apps/chat',
            },
            {
                label: 'File Manager',
                icon: LucideFolderOpenDot,
                url: '/apps/file-manager',
            },
            {
                label: 'Ecommerce',
                icon: LucideShoppingBag,
                isCollapsed: true,
                children: [
                    {
                        label: 'Products',
                        isCollapsed: true,
                        children: [
                            {label: 'Products', url: '/ecommerce/products'},
                            {label: 'Products Grid', url: '/ecommerce/products/grid'},
                            {label: 'Product Details', url: '/ecommerce/products/WB-10245'},
                            {label: 'Add Product', url: '/ecommerce/products/add'},
                        ]
                    },
                    {label: 'Categories', url: '/ecommerce/categories'},
                    {
                        label: 'Orders',
                        isCollapsed: true,
                        children: [
                            {label: 'Orders', url: '/ecommerce/orders'},
                            {label: 'Order Details', url: '/ecommerce/orders/WB20103'},
                        ]
                    },
                    {label: 'Customers', url: '/ecommerce/customers'},
                    {
                        label: 'Sellers',
                        isCollapsed: true,
                        children: [
                            {label: 'Sellers', url: '/ecommerce/sellers'},
                            {label: 'Seller Details', url: '/ecommerce/sellers/2'},
                        ]
                    },
                    {label: 'Reviews', url: '/ecommerce/reviews'},

                ]
            },
            {
                label: 'Email',
                icon: LucideInbox,
                badge: {
                    text: 'New',
                    variant: 'danger',
                },
                isCollapsed: true,
                children: [
                    {label: 'Inbox', url: '/apps/email/inbox'},
                    {label: 'Details', url: '/apps/email/detail'},
                    {label: 'Compose', url: '/apps/email/compose'},
                    {label: 'Email Templates', url: '/apps/email/templates'},
                ]
            },
            {
                label: 'Users',
                icon: LucideUsers,
                isCollapsed: true,
                children: [
                    {label: 'Contacts', url: '/users/contacts'},
                    {label: 'Roles', url: '/users/roles'},
                    {label: 'Permissions', url: '/users/permissions'},
                    {label: 'Profile', url: '/users/profile'},
                ]
            },
            {
                label: 'Invoice',
                icon: LucideReceiptText,
                isCollapsed: true,
                children: [
                    {label: 'Invoices', url: '/invoices'},
                    {label: 'New Invoice', url: '/invoices/new'},
                    {label: 'Single Invoice', url: '/invoice/INS-0120010'},
                ]
            },
        ]
    },
    {
        label: 'Pages',
        icon: LucideNotebookText,
        children: [
            {
                label: 'General Pages',
                icon: LucideNotebookText,
                isCollapsed: true,
                children: [
                    {label: 'FAQ', url: '/pages/faq'},
                    {label: 'Pricing', url: '/pages/pricing'},
                    {label: 'Empty Page', url: '/pages/empty-page'},
                    {label: 'Timeline', url: '/pages/timeline'},
                    {label: 'Sitemap', url: '/pages/sitemap' },
                    {label: 'Search Results', url: '/pages/search-results'},
                    {label: 'Coming Soon', url: '/coming-soon'},
                    {label: 'Terms & Conditions', url: '/pages/terms-and-conditions'},
                ]
            },
            {
                label: 'Miscellaneous',
                icon: LucideHousePlug,
                isCollapsed: true,
                children: [
                    {label: 'PDF Viewer', url: '/miscellaneous/pdf-viewer'},
                    {label: 'Sweet Alerts', url: '/miscellaneous/sweet-alerts'},
                    {label: 'Password Meter', url: '/miscellaneous/password-meter'},
                    {label: 'Clipboard', url: '/miscellaneous/clipboard'},
                    {label: 'Tour', url: '/miscellaneous/tour'},
                ]
            },
            {
                label: 'Basic',
                icon: LucideShieldUser,
                children: [
                    {label: 'Sign In', url: '/auth/sign-in'},
                    {label: 'Sign Up', url: '/auth/sign-up'},
                    {label: 'Reset Password', url: '/auth/reset-pw'},
                    {label: 'New Password', url: '/auth/new-pw'},
                    {label: 'Two Factor', url: '/auth/two-factor'},
                    {label: 'Lock Screen', url: '/auth/lock-screen'},
                    {label: 'Success Mail', url: '/auth/success-mail'},
                    {label: 'Login with PIN', url: '/auth/login-pin'},
                    {label: 'Delete Account', url: '/auth/delete-account'},
                ]
            },
            {
                label: 'Cover',
                icon: LucideHexagon,
                children: [
                    {label: 'Sign In', url: '/auth-2/sign-in'},
                    {label: 'Sign Up', url: '/auth-2/sign-up'},
                    {label: 'Reset Password', url: '/auth-2/reset-pw'},
                    {label: 'New Password', url: '/auth-2/new-pw'},
                    {label: 'Two Factor', url: '/auth-2/two-factor'},
                    {label: 'Lock Screen', url: '/auth-2/lock-screen'},
                    {label: 'Success Mail', url: '/auth-2/success-mail'},
                    {label: 'Login with PIN', url: '/auth-2/login-pin'},
                    {label: 'Delete Account', url: '/auth-2/delete-account'},
                ]
            },
            {
                label: 'Error Pages',
                icon: LucideShieldAlert,
                children: [
                    {label: '400', url: '/error/400'},
                    {label: '401', url: '/error/401'},
                    {label: '403', url: '/error/403'},
                    {label: '404', url: '/error/404'},
                    {label: '408', url: '/error/408'},
                    {label: '500', url: '/error/500'},
                    {label: 'Maintenance', url: '/maintenance'},
                ]
            }
        ]
    },
    {
        label: 'Components',
        icon: LucideComponent,
        children: [
            {
                label: 'Base UI One',
                icon: LucidePencilRuler,
                isCollapsed: true,
                children: [
                    {label: 'Accordions', url: '/ui/accordions'},
                    {label: 'Alerts', url: '/ui/alerts'},
                    {label: 'Images', url: '/ui/images'},
                    {label: 'Badges', url: '/ui/badges'},
                    {label: 'Breadcrumb', url: '/ui/breadcrumb'},
                    {label: 'Buttons', url: '/ui/buttons'},
                    {label: 'Cards', url: '/ui/cards'},
                    {label: 'Carousel', url: '/ui/carousel'},
                    {label: 'Collapse', url: '/ui/collapse'},
                    {label: 'Colors', url: '/ui/colors'},
                    {label: 'Dropdowns', url: '/ui/dropdowns'},
                    {label: 'Videos', url: '/ui/videos'},
                    {label: 'Grid Options', url: '/ui/grid-options'},
                ]
            },
            {
                label: 'Base UI Two',
                icon: LucidePencilRuler,
                isCollapsed: true,
                children: [
                    {label: 'Links', url: '/ui/links'},
                    {label: 'List Group', url: '/ui/list-groups'},
                    {label: 'Modals', url: '/ui/modals'},
                    {label: 'Notifications', url: '/ui/notifications'},
                    {label: 'Offcanvas', url: '/ui/offcanvas'},
                    {label: 'Placeholders', url: '/ui/placeholders'},
                    {label: 'Pagination', url: '/ui/pagination'},
                    {label: 'Popovers', url: '/ui/popovers'},
                    {label: 'Progress', url: '/ui/progress'},
                    {label: 'Srollspy', url: '/ui/scrollspy'},
                    {label: 'Spinners', url: '/ui/spinners'},
                    {label: 'Tabs', url: '/ui/tabs'},
                    {label: 'Tooltips', url: '/ui/tooltips'},
                    {label: 'Typography', url: '/ui/typography'},
                    {label: 'Utilities', url: '/ui/utilities'},
                ]
            },
            {
                label: 'Widgets',
                icon: LucideDessert,
                url: '/widgets',
            },

            {
                label: 'Apex Charts 1',
                icon: LucideChartBar,
                isCollapsed: true,
                children: [
                    {label: 'Area', url: '/charts/apex/area'},
                    {label: 'Bar', url: '/charts/apex/bar'},
                    {label: 'Bubble', url: '/charts/apex/bubble'},
                    {label: 'Candlestick', url: '/charts/apex/candlestick'},
                    {label: 'Column', url: '/charts/apex/column'},
                    {label: 'Heatmap', url: '/charts/apex/heatmap'},
                    {label: 'Line', url: '/charts/apex/line'},
                    {label: 'Mixed', url: '/charts/apex/mixed'},
                    {label: 'Timeline', url: '/charts/apex/timeline'},
                    {label: 'Boxplot', url: '/charts/apex/boxplot'},
                    {label: 'Treemap', url: '/charts/apex/treemap'},
                ]
            },
            {
                label: 'Apex Charts 2',
                icon: LucideChartBar,
                isCollapsed: true,
                children: [
                    {label: 'Pie', url: '/charts/apex/pie'},
                    {label: 'Radar', url: '/charts/apex/radar'},
                    {label: 'RadialBar', url: '/charts/apex/radialbar'},
                    {label: 'Scatter', url: '/charts/apex/scatter'},
                    {label: 'Polar Area', url: '/charts/apex/polar-area'},
                    {label: 'Sparklines', url: '/charts/apex/sparklines'},
                    {label: 'Range', url: '/charts/apex/range'},
                    {label: 'Funnel', url: '/charts/apex/funnel'},
                    {label: 'Slope', url: '/charts/apex/slope'},
                    {label: 'Apex Tree', url: '/charts/apextree'},
                    {label: 'Apex Sankey', url: '/charts/apexsankey'},
                ]
            },
            {
                label: 'Chart JS',
                children: [
                    { label: 'Area', url: '/charts/chartjs/area' },
                    {  label: 'Bar', url: '/charts/chartjs/bar' },
                    {  label: 'Line', url: '/charts/chartjs/line' },
                    {  label: 'Other', url: '/charts/chartjs/other' },
                ],
            },
            {
                label: 'Forms',
                icon: LucideFileInput,
                isCollapsed: true,
                children: [
                    {label: 'Basic Elements', url: '/forms/basic-elements'},
                    {label: 'Pickers', url: '/forms/pickers'},
                    {label: 'Select', url: '/forms/select'},
                    {label: 'Validation', url: '/forms/validation'},
                    {label: 'Wizard', url: '/forms/wizard'},
                    {label: 'File uploads', url: '/forms/file-uploads'},
                    {label: 'Text Editors', url: '/forms/text-editors'},
                    {label: 'Range Slider', url: '/forms/range-slider'},
                    {label: 'Layouts', url: '/forms/layouts'},
                    {label: 'Other Plugins', url: '/forms/other-plugins'},
                ]
            },
            {
                label: 'Icons',
                icon: LucideSparkles,
                isCollapsed: true,
                children: [
                    {label: 'Tabler', url: '/icons/tabler'},
                    {label: 'Lucide', url: '/icons/lucide'},
                    {label: 'Flags', url: '/icons/flags'},
                ],
            },
            {
                label: 'Maps',
                icon: LucideMapPinned,
                isCollapsed: true,
                children: [
                    {label: 'Vector Maps', url: '/maps/vector'},
                    {label: 'Leaflet Maps', url: '/maps/leaflet'},
                ]
            },
        ]
    },
    {
        label: 'Tables',
        icon: LucideTable,
        isCollapsed: true,
        children: [
            {icon: LucideTable2, label: 'Static Tables', url: '/tables/static'},
            {icon: LucideTableConfig, label: 'Custom Tables', url: '/tables/custom'},
            {
                icon: LucideTable2,
                label: 'Tanstack Tables',
                isCollapsed: true,
                children: [
                    {label: 'Table With Search', url: '/tanstack/table-with-search'},
                    {label: 'Table With Delete Button', url: '/tanstack/table-with-delete-button'},
                    {label: 'Table With Pagination', url: '/tanstack/table-with-pagination'},
                    {label: 'Table With Sort', url: '/tanstack/table-with-sort'},
                    {label: 'Table With Checkbox', url: '/tanstack/table-with-checkbox'},
                    {label: 'Table With Filters', url: '/tanstack/table-with-filters'},
                ]
            },
        ]
    },
    {
        label: 'Layouts',
        icon: LucideProportions,
        children: [
            {
                label: 'Layout Options',
                icon: LucideProportions,
                children: [
                    {label: 'Scrollable', url: '/layouts/scrollable'},
                    {label: 'Compact', url: '/layouts/compact'},
                    {label: 'Boxed', url: '/layouts/boxed'},
                    {label: 'Horizontal', url: '/layouts/horizontal'},
                    {label: 'Preloader', url: '/layouts/preloader'},
                ]
            },
            {
                label: 'Sidebars',
                icon: LucidePanelRightClose,
                children: [
                    {label: 'Light Menu', url: '/layouts/sidebars/light'},
                    {label: 'Gradient Menu', url: '/layouts/sidebars/gradient'},
                    {label: 'Gray Menu', url: '/layouts/sidebars/gray'},
                    {label: 'Image Menu', url: '/layouts/sidebars/image'},
                    {label: 'Compact Menu', url: '/layouts/sidebars/compact'},
                    {label: 'Icon View Menu', url: '/layouts/sidebars/icon-view'},
                    {label: 'On Hover Menu', url: '/layouts/sidebars/on-hover'},
                    {label: 'On Hover Active', url: '/layouts/sidebars/on-hover-active'},
                    {label: 'Offcanvas Menu', url: '/layouts/sidebars/offcanvas'},
                    {label: 'No Icons with Lines', url: '/layouts/sidebars/no-icons-with-lines'},
                    {label: 'Sidebar with Lines', url: '/layouts/sidebars/with-lines'},
                ]
            },
            {
                label: 'Topbars',
                icon: LucidePanelTop,
                children: [
                    {label: 'Dark Topbar', url: '/layouts/topbars/dark'},
                    {label: 'Gray Topbar', url: '/layouts/topbars/gray'},
                    {label: 'Gradient Topbar', url: '/layouts/topbars/gradient'},
                ]
            }
        ]
    },
    {
        label: 'Landing',
        icon: LucideEarth,
        url: '/landing'
    }
];
