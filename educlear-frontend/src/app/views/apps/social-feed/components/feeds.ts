import { Component } from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {FeedCard} from '@/app/views/apps/social-feed/components/feed-card';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

type CommentType = {
    avatar: string
    name: string
    message: string
    time: string
    reply?: CommentType[]
}
@Component({
  selector: 'app-feeds',
    imports: [
        NgIcon,
        FeedCard,
        RouterLink,
        NgClass
    ],
  template: `
      <div class="card">
          <div class="card-body">
              <h5 class="mb-2">What's on your mind?</h5>


              <form>
                  <textarea rows="3" class="form-control" placeholder="Share your thoughts..."></textarea>

                  <div class="d-flex pt-2 justify-content-between align-items-center">
                      <div class="d-flex gap-1">
                          <button class="btn btn-sm btn-icon btn-light" title="Tag People">
                              <ng-icon name="tablerUser" class="fs-md"/>
                          </button>
                          <button class="btn btn-sm btn-icon btn-light" title="Add Location">
                              <ng-icon name="tablerMapPin" class="fs-md"/>
                          </button>
                          <button class="btn btn-sm btn-icon btn-light" title="Upload Photo">
                              <ng-icon name="tablerCamera" class="fs-md"/>
                          </button>
                          <button class="btn btn-sm btn-icon btn-light" title="Add Emoji">
                              <ng-icon name="tablerMoodSmile" class="fs-md"/>
                          </button>
                      </div>

                      <button type="button" class="btn btn-dark btn-sm">Post</button>
                  </div>
              </form>
          </div>
      </div>

      <app-feed-card
          name="Jeremy Tomlinson"
          time='about 2 minutes ago'
          description="Story based around the idea of time lapse, animation to post soon!"
          avatar="assets/images/users/user-10.jpg"
      >
          <div class="row g-1">
              <div class="col-md-6">
                  <img src="assets/images/stock/gallery-1.jpg" class="img-fluid w-100 h-100 rounded"
                       style="aspect-ratio: 3/4; object-fit: cover;" alt="Tall Image">
              </div>

              <div class="col-md-6 d-flex flex-column gap-1">
                  <img src="assets/images/stock/gallery-2.jpg" class="img-fluid w-100 rounded"
                       style="aspect-ratio: 4/3; object-fit: cover;" alt="Top Right">
                  <img src="assets/images/stock/gallery-3.jpg" class="img-fluid w-100 rounded"
                       style="aspect-ratio: 4/3; object-fit: cover;" alt="Bottom Right">
              </div>
          </div>
      </app-feed-card>

      <app-feed-card
          avatar='/assets/images/users/user-4.jpg'
          name="Sophia Martinez"
          time="about 30 minutes ago"
      >
          <div class="fs-16 text-center mt-3 mb-4 fst-italic">
              <ng-icon name="tablerQuote" class="fs-20"/>
              Just finished a weekend project! Built a small weather app using React and OpenWeather API.
              Feeling excited to share the results with everyone soon. 🚀
          </div>

          <div class="bg-light-subtle mx-n3 p-3 border-top border-bottom border-dashed">

              @for (comment of comments; track $index) {
                  <div class="d-flex align-items-start" [ngClass]="{ 'mb-2': comments.length > 1 }">
                      <img
                          class="me-2 avatar-sm rounded-circle"
                          [src]="comment.avatar"
                          alt="Generic placeholder image"/>

                      <div class="w-100">
                          <h5 class="mt-0 mb-1">
                              <a routerLink="/users/profile" class="link-reset">{{ comment.name }}</a>
                              <small class="text-muted fw-normal float-end">{{ comment.time }}</small>
                          </h5>

                          {{ comment.message }}
                          <br/>

                          @if (comment.reply?.length) {
                              <a [routerLink]="[]" class="text-muted font-13 d-inline-block mt-2">
                                  <ng-icon name="tablerArrowBackUp" class="me-1"></ng-icon>
                                  Reply
                              </a>

                              @for (reply of comment.reply; track $index) {
                                  <div class="d-flex align-items-start mt-3">
                                      <a class="pe-2" routerLink="/users/profile">
                                          <img
                                              [src]="reply.avatar"
                                              class="avatar-sm rounded-circle"
                                              alt="Generic placeholder image"/>
                                      </a>
                                      <div class="w-100">
                                          <h5 class="mt-0 mb-1">
                                              <a routerLink="/users/profile" class="link-reset">{{ reply.name }}</a>
                                              <small class="text-muted fw-normal float-end">{{ reply.time }}</small>
                                          </h5>
                                          {{ reply.message }}
                                      </div>
                                  </div>
                              }
                          }
                      </div>
                  </div>
              }

              <div class="d-flex align-items-start mt-3">
                  <a class="pe-2" [routerLink]="[]">
                      <img src="assets/images/users/user-3.jpg" class="rounded-circle" alt="Generic placeholder image"
                           height="31"/>
                  </a>
                  <div class="w-100">
                      <input
                          type="text"
                          id="simpleinput"
                          class="form-control form-control-sm"
                          placeholder="Add a comment..."/>
                  </div>
              </div>

          </div>

      </app-feed-card>

      <app-feed-card
          avatar='assets/images/users/user-2.jpg'
          name="Anika Roy"
          time='2 hours ago'
          description="Sharing a couple of timelapses from my recent Iceland trip. Let me know which one you like most!"
      >
          <div class="row g-2">
              <div class="col-md-6">
                  <div class="ratio ratio-16x9 rounded overflow-hidden">
                      <iframe src="https://player.vimeo.com/video/1084537" allowfullscreen></iframe>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="ratio ratio-16x9 rounded overflow-hidden">
                      <iframe src="https://player.vimeo.com/video/76979871" allowfullscreen></iframe>
                  </div>
              </div>
          </div>
      </app-feed-card>

      <app-feed-card
          avatar="assets/images/users/user-6.jpg"
          name='David Kim'
          time='Posted 1 hour ago'
      >
          <h5 class="mb-3">🔥 Quick Poll: What’s your go-to front-end framework in 2025?</h5>
          <p class="text-muted">We’re gathering developer preferences for our next project. Cast your vote below!
              💻</p>


          <form>
              <div class="form-check mb-1">
                  <input class="form-check-input" type="radio" name="framework_poll" id="optionReact">
                  <label class="form-check-label" for="optionReact">React (Meta)</label>
              </div>
              <div class="form-check mb-1">
                  <input class="form-check-input" type="radio" name="framework_poll" id="optionVue">
                  <label class="form-check-label" for="optionVue">Vue.js (Evan You)</label>
              </div>
              <div class="form-check mb-1">
                  <input class="form-check-input" type="radio" name="framework_poll" id="optionAngular">
                  <label class="form-check-label" for="optionAngular">Angular (Google)</label>
              </div>
              <div class="form-check mb-3">
                  <input class="form-check-input" type="radio" name="framework_poll" id="optionSvelte">
                  <label class="form-check-label" for="optionSvelte">Svelte (Emerging Favorite)</label>
              </div>
              <button type="submit" class="btn btn-sm btn-primary">Submit Vote</button>
          </form>
      </app-feed-card>

      <app-feed-card
          avatar="assets/images/users/user-2.jpg"
          name='Anika roy'
          time='Posted 2 hours ago'
      >
          <h5 class="mb-2">📢 You're Invited: <strong>Dev Meetup 2025 – Build with AI</strong></h5>
          <p class="text-muted mb-2">
              Join developers and tech enthusiasts for an inspiring evening of AI-driven development talks, live
              demos, and networking opportunities.
          </p>
          <ul class="list-unstyled mb-3">
              <li class="pb-2"><strong>Date:</strong> Friday, 25th July 2025</li>
              <li class="pb-2"><strong>Time:</strong> 6:00 PM IST</li>
              <li><strong>Location:</strong> Online (Zoom – link to be shared)</li>
          </ul>


          <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-primary">
                  <ng-icon name="tablerBellPlus" class="me-1"/> Interested
              </button>
              <button class="btn btn-sm btn-primary">
                  <ng-icon name="tablerLogin" class="me-1"/> Join Now
              </button>
          </div>
      </app-feed-card>

      <div class="card">
          <div class="card-body text-center">

              <h1 class="mb-2">🏆</h1>
              <h4 class="mb-1 fw-semibold">Congratulations, Anika! 🎉</h4>


              <p class="text-muted fst-italic mb-3">
                  You’ve hit <strong>1,000 followers</strong>! Your content is making waves in the community!
              </p>


              <div class="d-flex justify-content-center mb-3">
                  <div class="me-4 text-center">
                      <h6 class="mb-0">Posts</h6>
                      <span class="fw-bold">135</span>
                  </div>
                  <div class="me-4 text-center">
                      <h6 class="mb-0">Likes</h6>
                      <span class="fw-bold">8,400</span>
                  </div>
                  <div class="text-center">
                      <h6 class="mb-0">Followers</h6>
                      <span class="fw-bold">1,000</span>
                  </div>
              </div>


              <button class="btn btn-sm btn-outline-success me-2">
                  <ng-icon name="tablerShare" class="me-1"/> Share Achievement
              </button>
              <a routerLink="/users/profile" class="btn btn-sm btn-primary">
                  <ng-icon name="tablerTrophy" class="me-1"></ng-icon> View Profile
              </a>
          </div>
      </div>

      <div class="d-flex align-items-center justify-content-center gap-2 p-3 mb-3">
          <strong>Loading...</strong>
          <div class="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true"></div>
      </div>
  `,
  styles: ``
})
export class Feeds {
    comments: CommentType[] = [
        {
            avatar: 'assets/images/users/user-1.jpg',
            message: "That sounds awesome! Can't wait to see how you designed the UI.",
            name: 'Liam Johnson',
            time: '10 minutes ago',
            reply: [
                {
                    avatar: 'assets/images/users/user-2.jpg',
                    message: "I'm excited to see the final result! Let me know when you're ready to share.",
                    name: 'Sophia Martinez',
                    time: '5 minutes ago',
                },
            ],
        },
    ]
}
