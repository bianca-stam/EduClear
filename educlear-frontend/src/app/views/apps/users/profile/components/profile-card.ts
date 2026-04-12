import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {
    LucideAngularModule,
    LucideDribbble,
    LucideFacebook,
    LucideInstagram,
    LucideLinkedin,
    LucideYoutube
} from 'lucide-angular';

@Component({
  selector: 'app-profile-card',
    imports: [
        RouterLink,
        NgIcon,
        NgbDropdown,
        NgbDropdownToggle,
        NgbDropdownMenu,
        NgbDropdownItem,
        LucideAngularModule
    ],
  template: `
      <div class="card card-top-sticky">
          <div class="card-body">
              <div class="d-flex align-items-center mb-4">
                  <div class="me-3 position-relative">
                      <img src="assets/images/users/user-3.jpg" alt="avatar" class="rounded-circle" width="72"
                           height="72">
                  </div>
                  <div>
                      <h5 class="mb-0 d-flex align-items-center">
                          <a [routerLink]="[]" class="link-reset">Geneva Lee</a>
                          <img src="assets/images/flags/us.svg" alt="US" class="ms-2 rounded-circle" height="16">
                      </h5>
                      <p class="text-muted mb-2">Senior Developer</p>
                      <span class="badge text-bg-light badge-label">Team Lead</span>
                  </div>
                  <div class="ms-auto">
                      <div ngbDropdown placement="bottom-end">
                          <a [routerLink]="[]" class="btn btn-icon btn-ghost-light text-muted drop-arrow-none"
                             ngbDropdownToggle>
                              <ng-icon name="tablerDotsVertical" class="fs-xl"/>
                          </a>
                          <ul class="dropdown-menu-end" ngbDropdownMenu>
                              <li><a ngbDropdownItem href="javascript:void(0);">Edit Profile</a></li>
                              <li><a ngbDropdownItem class="text-danger" href="javascript:void(0);">Report</a></li>
                          </ul>
                      </div>
                  </div>
              </div>

              <div class="">
                  <div class="d-flex align-items-center gap-2 mb-2">
                      <div
                          class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
                          <ng-icon name="tablerBriefcase" class="fs-xl"/>
                      </div>
                      <p class="mb-0 fs-sm">UI/UX Designer & Full-Stack Developer</p>
                  </div>
                  <div class="d-flex align-items-center gap-2 mb-2">
                      <div
                          class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
                          <ng-icon name="tablerSchool" class="fs-xl"/>
                      </div>
                      <p class="mb-0 fs-sm">Studied at <span class="text-dark fw-semibold">Stanford University</span>
                      </p>
                  </div>
                  <div class="d-flex align-items-center gap-2 mb-2">
                      <div
                          class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
                          <ng-icon name="tablerMapPin" class="fs-xl"/>
                      </div>
                      <p class="mb-0 fs-sm">Lives in <span class="text-dark fw-semibold">San Francisco, CA</span></p>
                  </div>
                  <div class="d-flex align-items-center gap-2 mb-2">
                      <div
                          class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
                          <ng-icon name="tablerUsers" class="fs-xl"/>
                      </div>
                      <p class="mb-0 fs-sm">Followed by <span class="text-dark fw-semibold">25.3k People</span></p>
                  </div>
                  <div class="d-flex align-items-center gap-2 mb-2">
                      <div
                          class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
                          <ng-icon name="tablerMail" class="fs-xl"/>
                      </div>
                      <p class="mb-0 fs-sm">Email <a href="mailto:hello@example.com" class="text-primary fw-semibold">hello&commat;example
                          .com</a>
                      </p>
                  </div>
                  <div class="d-flex align-items-center gap-2 mb-2">
                      <div
                          class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
                          <ng-icon name="tablerLink" class="fs-xl"/>
                      </div>
                      <p class="mb-0 fs-sm">Website <a href="https://www.example.dev" class="text-primary fw-semibold">www.example.dev</a>
                      </p>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                      <div
                          class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
                          <ng-icon name="tablerWorld" class="fs-xl"/>
                      </div>
                      <p class="mb-0 fs-sm">Languages <span
                          class="text-dark fw-semibold">English, Hindi, Japanese</span>
                      </p>
                  </div>

                  <div class="d-flex justify-content-center gap-2 mt-4 mb-2">
                      <a href="javascript:void(0)" class="btn btn-icon rounded-circle btn-primary" title="Facebook">
                          <lucide-angular [img]="LucideFacebook" class="fs-xl"/>
                      </a>
                      <a href="javascript:void(0)" class="btn btn-icon rounded-circle btn-info" title="Twitter-x">
                          <ng-icon name="tablerBrandX" class="fs-xl"></ng-icon>
                      </a>
                      <a href="javascript:void(0)" class="btn btn-icon rounded-circle btn-danger" title="Instagram">
                          <lucide-angular [img]="LucideInstagram" class="fs-xl"/>
                      </a>
                      <a href="javascript:void(0)" class="btn btn-icon rounded-circle btn-success" title="WhatsApp">
                          <lucide-angular [img]="LucideDribbble" class="fs-xl"/>
                      </a>
                      <a href="javascript:void(0)" class="btn btn-icon rounded-circle btn-secondary" title="LinkedIn">
                          <lucide-angular [img]="LucideLinkedin" class="fs-xl"/>
                      </a>
                      <a href="javascript:void(0)" class="btn btn-icon rounded-circle btn-danger" title="YouTube">
                          <lucide-angular [img]="LucideYoutube" class="fs-xl"/>
                      </a>
                  </div>
              </div>
              <h4 class="card-title mb-3 mt-4">Skills</h4>

              <div class="d-flex flex-wrap gap-1">
                  @for (skill of skills; track $index) {
                      <a class="btn btn-light btn-sm" [routerLink]="[]">{{ skill }}</a>
                  }
              </div>
          </div>
      </div>
  `,
  styles: ``
})
export class ProfileCard {

    protected readonly RouterLink = RouterLink;
    protected readonly LucideFacebook = LucideFacebook;
    protected readonly LucideInstagram = LucideInstagram;
    protected readonly LucideDribbble = LucideDribbble;
    protected readonly LucideLinkedin = LucideLinkedin;
    protected readonly LucideYoutube = LucideYoutube;

    skills: string[] = [
        "Product Design",
        "UI/UX",
        "Tailwind CSS",
        "Bootstrap",
        "React.js",
        "Next.js",
        "Vue.js",
        "Figma",
        "Design Systems",
        "Template Authoring",
        "Responsive Design",
        "Component Libraries"
    ];
}
