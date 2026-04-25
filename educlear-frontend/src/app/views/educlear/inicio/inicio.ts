import { Component, inject } from '@angular/core';
import { PageTitle, BreadcrumbItem } from "@app/components/page-title";
import { RouterOutlet, Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs';

@Component({
  selector: 'app-inicio',
  imports: [PageTitle, RouterOutlet],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})
export class Inicio {
  private router = inject(Router);

  currentTitle = 'Cursos';
  breadcrumbItems: BreadcrumbItem[] = [];

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumbs(this.router.url);
    });
    this.updateBreadcrumbs(this.router.url);
  }

  updateBreadcrumbs(url: string) {
    const segments = url.split('?')[0].split('/').filter(s => s);
    this.breadcrumbItems = [];

    if (segments.length >= 1) {
      this.currentTitle = 'Cursos';
      this.breadcrumbItems.push({ label: 'Cursos', url: '/cursos' });
    }
    if (segments.length >= 2) {
      const cursoName = this.formatName(segments[1]);
      this.currentTitle = cursoName;
      this.breadcrumbItems.push({ label: cursoName, url: `/cursos/${segments[1]}` });
    }
    if (segments.length >= 3) {
      const asignaturaName = this.formatName(segments[2]);
      this.currentTitle = asignaturaName;
      this.breadcrumbItems.push({ label: asignaturaName, url: `/cursos/${segments[1]}/${segments[2]}` });
    }
  }

  formatName(segment: string) {
    const decoded = decodeURIComponent(segment);
    return decoded.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}
