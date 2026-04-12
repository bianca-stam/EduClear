
export type SitemapItem  = {
    title: string;
    icon: string;
    items: ({
        label: string;
        icon: string;
        link: any[];
        children: {
            label: string;
            link: any[];
        }[];
    } | {
        label: string;
        icon: string;
        link: any[];
        children?: undefined;
    })[];
}
