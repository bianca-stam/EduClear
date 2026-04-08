import { Component } from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {TaskOverview} from '@/app/views/apps/users/profile/components/task-overview';

@Component({
  selector: 'app-about',
    imports: [
        NgIcon,
        TaskOverview
    ],
  template: `
      <p>I'm an Admin Template Author dedicated to building clean, efficient, and highly customizable dashboards for
          developers and businesses. My goal is to create UI solutions that are modern, scalable, and easy to
          integrate.</p>

      <p>I specialize in crafting developer-friendly admin panels and UI kits using frameworks like Bootstrap, Tailwind
          CSS, React, Vue, Angular, Laravel, and Next.js. My templates are designed to accelerate development and
          provide a strong foundation for web apps, SaaS platforms, and enterprise tools.</p>

      <p class="mb-0">I focus on delivering well-structured, pixel-perfect layouts with a user-centric approach—ensuring
          responsive design, clean code, and seamless user experiences. Whether you're building a CRM, analytics
          dashboard, or backend system, my templates are made to help you build faster and smarter.</p>

      <h4 class="card-title my-3 text-uppercase fs-sm"><ng-icon name="tablerBriefcase"/> Professional Experience:</h4>

      <div class="timeline">

          <div class="timeline-item d-flex align-items-stretch">
              <div class="timeline-time pe-3 text-muted">2023 – Present</div>
              <div class="timeline-dot bg-primary"></div>
              <div class="timeline-content ps-3 pb-4">
                  <h5 class="mb-1">Lead UI Developer</h5>
                  <p class="mb-1 text-muted">Developing scalable and reusable UI components for SaaS dashboards using
                      React, Tailwind CSS, and TypeScript.</p>
                  <span class="text-muted fw-semibold">at CraftCode Studio</span>
              </div>
          </div>


          <div class="timeline-item d-flex align-items-stretch">
              <div class="timeline-time pe-3 text-muted">2021 – 2023</div>
              <div class="timeline-dot bg-success"></div>
              <div class="timeline-content ps-3 pb-4">
                  <h5 class="mb-1">Frontend Engineer</h5>
                  <p class="mb-1 text-muted">Built modern, responsive admin templates and UI kits using Vue, Bootstrap
                      5, and Laravel Blade.</p>
                  <span class="text-muted fw-semibold">at CodeNova</span>
              </div>
          </div>


          <div class="timeline-item d-flex align-items-stretch">
              <div class="timeline-time pe-3 text-muted">2019 – 2021</div>
              <div class="timeline-dot bg-warning"></div>
              <div class="timeline-content ps-3 pb-4">
                  <h5 class="mb-1">UI/UX Designer & Developer</h5>
                  <p class="mb-1 text-muted">Designed and developed dashboard layouts and admin panel concepts, focusing
                      on accessibility and performance.</p>
                  <span class="text-muted fw-semibold">as Freelancer</span>
              </div>
          </div>


          <div class="timeline-item d-flex align-items-stretch">
              <div class="timeline-time pe-3 text-muted">2017 – 2019</div>
              <div class="timeline-dot bg-info"></div>
              <div class="timeline-content ps-3 pb-4">
                  <h5 class="mb-1">Web Designer</h5>
                  <p class="mb-1 text-muted">Created responsive HTML/CSS templates and themes for clients in eCommerce
                      and portfolio niches.</p>
                  <span class="text-muted fw-semibold">at PixelFrame Agency</span>
              </div>
          </div>


          <div class="timeline-item d-flex align-items-stretch">
              <div class="timeline-time pe-3 text-muted">2015 – 2017</div>
              <div class="timeline-dot bg-secondary"></div>
              <div class="timeline-content ps-3">
                  <h5 class="mb-1">Junior Frontend Developer</h5>
                  <p class="mb-1 text-muted">Maintained and updated legacy UI projects, gaining hands-on experience in
                      HTML, CSS, jQuery, and Bootstrap 3.</p>
                  <span class="text-muted fw-semibold">at DevLaunch</span>
              </div>
          </div>
      </div>

      <h4 class="card-title my-3 text-uppercase fs-sm"><ng-icon name="tablerChecklist" /> Tasks Overview:</h4>

    <app-task-overview/>
  `,
  styles: ``
})
export class About {

}
