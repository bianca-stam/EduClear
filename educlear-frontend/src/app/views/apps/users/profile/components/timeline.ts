import { Component } from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-timeline',
    imports: [
        NgIcon,
        RouterLink
    ],
  template: `

      <form action="#" class="mb-3">
          <textarea rows="3" class="form-control" placeholder="Write something..."></textarea>
          <div class="d-flex py-2 justify-content-between">
              <div>
                  <button class="btn btn-sm btn-icon btn-light me-1"><ng-icon name="tablerUser" class="fs-md"/></button>
                  <button class="btn btn-sm btn-icon btn-light me-1"><ng-icon name="tablerMapPin" class="fs-md"/></button>
                  <button class="btn btn-sm btn-icon btn-light me-1"><ng-icon name="tablerCamera" class="fs-md"/></button>
                  <button class="btn btn-sm btn-icon btn-light"><ng-icon name="tablerMoodSmile" class="fs-md"/></button>
              </div>
              <button type="submit" class="btn btn-sm btn-dark">Post</button>
          </div>
      </form>



      <div class="border border-light border-dashed rounded p-2 mb-3">
          <div class="d-flex align-items-center mb-2">
              <img class="me-2 avatar-md rounded-circle" src="assets/images/users/user-3.jpg" alt="Generic placeholder image">
              <div class="w-100">
                  <h5 class="m-0">Jeremy Tomlinson</h5>
                  <p class="text-muted mb-0"><small>about 2 minutes ago</small></p>
              </div>
          </div>
          <p>Story based around the idea of time lapse, animation to post soon!</p>

          <img src="assets/images/stock/small-1.jpg" alt="post-img" class="rounded me-1" height="60" />
          <img src="assets/images/stock/small-2.jpg" alt="post-img" class="rounded me-1" height="60" />
          <img src="assets/images/stock/small-3.jpg" alt="post-img" class="rounded" height="60" />

          <div class="mt-2">
              <a href="javascript: void(0);" class="btn btn-sm btn-link text-muted"><ng-icon name="tablerArrowBackUp" class="fs-sm me-1"/> Reply</a>
              <a href="javascript: void(0);" class="btn btn-sm btn-link text-muted"><ng-icon name="tablerHeart" class="fs-sm me-1"/> Like</a>
              <a href="javascript: void(0);" class="btn btn-sm btn-link text-muted"><ng-icon name="tablerShare3" class="fs-sm me-1"/> Share</a>
          </div>
      </div>


      <div class="border border-light border-dashed rounded p-2 mb-3">
          <div class="d-flex align-items-center mb-2">
              <img class="me-2 avatar-sm rounded-circle" src="assets/images/users/user-4.jpg" alt="Generic placeholder image">
              <div class="w-100">
                  <h5 class="m-0">Sophia Martinez</h5>
                  <p class="text-muted mb-0"><small>about 30 minutes ago</small></p>
              </div>
          </div>

          <div class="fs-16 text-center mt-3 mb-4 fst-italic">
              <ng-icon name="tablerQuote" class="fs-20"/>
              Just finished a weekend project! Built a small weather app using React and OpenWeather API.
              Feeling excited to share the results with everyone soon. 🚀
          </div>

          <div class="bg-light-subtle m-n2 p-2 border-top border-bottom border-dashed">
              <div class="d-flex align-items-start">
                  <img class="me-2 avatar-sm rounded-circle" src="assets/images/users/user-1.jpg" alt="Generic placeholder image">
                  <div class="w-100">
                      <h5 class="mt-0 mb-1">
                          Liam Johnson <small class="text-muted">10 minutes ago</small>
                      </h5>
                      That sounds awesome! Can't wait to see how you designed the UI.
                      <br/>
                      <a href="javascript:void(0);" class="text-muted font-13 d-inline-block mt-2">
                          <ng-icon name="tablerArrowBackUp" /> Reply
                      </a>

                      <div class="d-flex align-items-start mt-3">
                          <a class="pe-2" [routerLink]="[]">
                              <img src="assets/images/users/user-2.jpg" class="avatar-sm rounded-circle" alt="Generic placeholder image">
                          </a>
                          <div class="w-100">
                              <h5 class="mt-0 mb-1">
                                  Olivia Carter <small class="text-muted">15 minutes ago</small>
                              </h5>
                              I recently built something similar with Vue. Let's collaborate sometime!
                          </div>
                      </div>
                  </div>
              </div>

              <div class="d-flex align-items-start mt-2">
                  <a class="pe-2" [routerLink]="[]">
                      <img src="assets/images/users/user-3.jpg" class="rounded-circle" alt="Generic placeholder image" height="31">
                  </a>
                  <div class="w-100">
                      <input type="text" id="simpleinput" class="form-control form-control-sm" placeholder="Add a comment...">
                  </div>
              </div>
          </div>

          <div class="mt-3">
              <a href="javascript:void(0);" class="btn btn-sm btn-link text-danger">
                  <ng-icon name="tablerHeart" class="me-1 fs-sm"/> Like (45)
              </a>
              <a href="javascript:void(0);" class="btn btn-sm btn-link text-muted">
                  <ng-icon name="tablerShare3" class="me-1 fs-sm"/> Share
              </a>
          </div>
      </div>


      <div class="border border-light border-dashed rounded p-2 mb-3">
          <div class="d-flex align-items-center mb-2">
              <img class="me-2 avatar-sm rounded-circle" src="assets/images/users/user-2.jpg" alt="Profile photo of Anika Roy">
              <div class="w-100">
                  <h5 class="m-0">Anika Roy</h5>
                  <p class="text-muted mb-0"><small>2 hours ago</small></p>
              </div>
          </div>

          <p>Sharing a couple of timelapses from my recent Iceland trip. Let me know which one you like most!</p>

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
      </div>

      <div class="d-flex align-items-center justify-content-center gap-2 p-3">
          <strong>Loading...</strong>
          <div class="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true"></div>
      </div>

  `,
  styles: ``
})
export class Timeline {

}
