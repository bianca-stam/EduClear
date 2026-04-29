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
    if (segments.length >= 4) {
      const temaName = this.formatName(segments[3]);
      this.currentTitle = temaName;
      this.breadcrumbItems.push({ label: temaName, url: `/cursos/${segments[1]}/${segments[2]}/${segments[3]}` });
    }
    if (segments.length >= 6) {
      // The 5th segment is the type (tarea/examen) and the 6th is the name
      const typeName = segments[4]; // 'tarea' or 'examen'
      const entregaName = this.formatName(segments[5]);
      this.currentTitle = entregaName;
      // We can also push the type (e.g. Tareas) into breadcrumb, or directly the item.
      // Usually it's better to just push the delivery item
      this.breadcrumbItems.push({ label: entregaName, url: `/cursos/${segments[1]}/${segments[2]}/${segments[3]}/${segments[4]}/${segments[5]}` });
    }
  }

  formatName(segment: string) {
    const decoded = decodeURIComponent(segment);
    return decoded.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}
