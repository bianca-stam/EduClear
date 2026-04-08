import { Component } from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {BasicTimeline} from '@/app/views/pages/timeline/components/basic-timeline';
import {IconTimeline} from '@/app/views/pages/timeline/components/icon-timeline';
import {BorderTimeline} from '@/app/views/pages/timeline/components/border-timeline';
import {UserTimeline} from '@/app/views/pages/timeline/components/user-timeline';

@Component({
  selector: 'app-timeline',
    imports: [
        PageTitle,
        BasicTimeline,
        IconTimeline,
        BorderTimeline,
        UserTimeline
    ],
  templateUrl: './timeline.html',
  styles: ``
})
export class Timeline {

}
