import {Component} from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {StatisticWidget} from '@/app/views/dashboards/dashboard-2/components/statistic-widget';
import {stats} from '@/app/views/dashboards/dashboard-2/data';
import {ProjectOverview} from '@/app/views/dashboards/dashboard-2/components/project-overview';
import {TaskProgress} from '@/app/views/dashboards/dashboard-2/components/task-progress';
import {ChatCard} from '@app/components/chat-card';
import {ActiveProjectsOverview} from '@/app/views/dashboards/dashboard-2/components/active-projects-overview';
import {ProjectByCountry} from '@/app/views/dashboards/dashboard-2/components/project-by-country';

@Component({
    selector: 'app-dashboard-2',
    imports: [
        PageTitle,
        StatisticWidget,
        ProjectOverview,
        TaskProgress,
        ChatCard,
        ActiveProjectsOverview,
        ProjectByCountry,
    ],
    templateUrl: './dashboard-2.html',
})
export class Dashboard2 {
    protected readonly stats = stats;
}
