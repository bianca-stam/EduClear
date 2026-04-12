import { Component } from '@angular/core';
import {PageTitle} from '@app/components/page-title';
import {SocialSidebar} from '@/app/views/apps/social-feed/components/social-sidebar';
import {Feeds} from '@/app/views/apps/social-feed/components/feeds';
import {Activity} from '@/app/views/apps/social-feed/components/activity';
import {Trending} from '@/app/views/apps/social-feed/components/trending';
import {Requests} from '@/app/views/apps/social-feed/components/requests';
import {FeaturedVideo} from '@/app/views/apps/social-feed/components/featured-video';

@Component({
  selector: 'app-social-feed',
    imports: [
        PageTitle,
        SocialSidebar,
        Feeds,
        Activity,
        Trending,
        Requests,
        FeaturedVideo
    ],
  templateUrl: './social-feed.html',
  styles: ``
})
export class SocialFeed {

}
