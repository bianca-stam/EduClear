import { Component } from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-featured-video',
    imports: [
        NgIcon,
        NgbDropdown,
        NgbDropdownItem,
        NgbDropdownMenu,
        NgbDropdownToggle
    ],
  template: `
      <div class="card">
          <div class="card-header justify-content-between align-items-center border-dashed">
              <h4 class="card-title mb-0">Featured Video For You</h4>
              <div ngbDropdown>
                  <button ngbDropdownToggle class="btn btn-link text-muted drop-arrow-none card-drop p-0">
                      <ng-icon name="tablerDotsVertical" class="fs-lg"></ng-icon>
                  </button>
                  <div ngbDropdownMenu class="dropdown-menu-end">
                      <button ngbDropdownItem>

                          Watch Later
                      </button>
                      <button ngbDropdownItem>
                          Report Video
                      </button>
                  </div>
              </div>
          </div>
          <div class="card-body">
              <div class="ratio ratio-16x9 rounded overflow-hidden">
                  <iframe src="https://player.vimeo.com/video/357274789" allowfullscreen></iframe>
              </div>
          </div>
      </div>
  `,
  styles: ``
})
export class FeaturedVideo {

}
