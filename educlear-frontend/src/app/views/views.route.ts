import {Routes} from '@angular/router';
import {Widgets} from '@/app/views/widgets/widgets';
import { Inicio } from './educlear/inicio/inicio';
import { Cursos } from './educlear/cursos/cursos';
import { Asignaturas } from './educlear/asignaturas/asignaturas';
import { cursoSeleccionadoGuard } from '@core/guards/curso-seleccionado.guard';
import { Asignatura } from './educlear/asignaturas/asignatura/asignatura';
import { asignaturaSeleccionadaGuard } from '@core/guards/asignatura-seleccionada.guard';
import { Tema } from './educlear/tema/tema';
import { adminProfesorGuard } from '@core/guards/admin-profesor.guard';

export const VIEWS_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./dashboards/dashboards.routes').then((mod) => mod.DASHBOARDS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./layouts/layout.routes').then((mod) => mod.LAYOUT_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./ui/ui.route').then((mod) => mod.UI_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./maps/maps.route').then((mod) => mod.MAPS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./tables/tables.route').then((mod) => mod.TABLES_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./forms/forms.route').then((mod) => mod.FORMS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./miscellaneous/miscellaneous.route').then((mod) => mod.MISCELLANEOUS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./pages/pages.route').then((mod) => mod.PAGES_ROUTES)
    },

    {
        path: '',
        loadChildren: () => import('./invoices/invoices.route').then((mod) => mod.INVOICES_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./apps/apps.route').then((mod) => mod.APPS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./ecommerce/ecommerce.route').then((mod) => mod.ECOMMERCE_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./crm/crm.routes').then((mod) => mod.CRM_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./icons/icons.route').then((mod) => mod.ICONS_ROUTES)
    },
    {
        path: 'widgets',
        component: Widgets,
        data: {title: "Widgets"},
    },
    {
        path: '',
        loadChildren: () => import('./charts/charts.route').then((mod) => mod.CHARTS_ROUTES)
    },
    {
        path: 'cursos',
        component: Inicio,
        data: {title: "Cursos"},
        children: [
            {
                path: '',
                component: Cursos,
                data: {title: "Cursos"},
            },
            {
                path: ':nombreCurso',
                component: Asignaturas,
                canActivate: [cursoSeleccionadoGuard],
                data: {title: "Asignaturas"},
            },
            {
                path: ':nombreCurso/:nombreAsignatura',
                component: Asignatura,
                canActivate: [asignaturaSeleccionadaGuard],
                data: {title: "Asignatura"},
                children: [
                    {
                        path: ':nombreTema',
                        component: Tema,
                        data: {title: "Tema"},
                    },
                    {
                        path: ':nombreTema/tarea/:nombreTarea',
                        loadComponent: () => import('./educlear/entregas/tareas/tareas').then(m => m.Tareas),
                        data: {title: "Tarea"},
                    },
                    {
                        path: ':nombreTema/examen/:nombreExamen',
                        loadComponent: () => import('./educlear/entregas/examenes/examenes').then(m => m.Examenes),
                        data: {title: "Examen"},
                    }
                ]
            }
        ]
    },
    {
        path: 'area-personal',
        loadComponent: () => import('./educlear/area-personal/area-personal').then(m => m.AreaPersonal),
        data: {title: "Área personal"}
    },
    {
        path: 'edicion',
        canActivate: [adminProfesorGuard],
        children: [
            {
                path: 'curso/nuevo',
                loadComponent: () => import('./educlear/edicion/editar-curso/editar-curso').then(m => m.EditarCurso),
                data: {title: "Nuevo curso"}
            },
            {
                path: 'curso/:id',
                loadComponent: () => import('./educlear/edicion/editar-curso/editar-curso').then(m => m.EditarCurso),
                data: {title: "Editar curso"}
            },
            {
                path: 'asignatura/nueva',
                loadComponent: () => import('./educlear/edicion/editar-asignatura/editar-asignatura').then(m => m.EditarAsignatura),
                data: {title: "Nueva asignatura"}
            },
            {
                path: 'asignatura/:id',
                loadComponent: () => import('./educlear/edicion/editar-asignatura/editar-asignatura').then(m => m.EditarAsignatura),
                data: {title: "Editar asignatura"}
            },
            {
                path: 'tema/nuevo',
                loadComponent: () => import('./educlear/edicion/editar-tema/editar-tema').then(m => m.EditarTema),
                data: {title: "Nuevo tema"}
            },
            {
                path: 'tema/:id',
                loadComponent: () => import('./educlear/edicion/editar-tema/editar-tema').then(m => m.EditarTema),
                data: {title: "Editar tema"}
            },
            {
                path: 'tarea/nueva',
                loadComponent: () => import('./educlear/edicion/editar-tarea/editar-tarea').then(m => m.EditarTarea),
                data: {title: "Nueva tarea"}
            },
            {
                path: 'tarea/:id',
                loadComponent: () => import('./educlear/edicion/editar-tarea/editar-tarea').then(m => m.EditarTarea),
                data: {title: "Editar tarea"}
            },
            {
                path: 'examen/nuevo',
                loadComponent: () => import('./educlear/edicion/editar-examen/editar-examen').then(m => m.EditarExamen),
                data: {title: "Nuevo examen"}
            },
            {
                path: 'examen/:id',
                loadComponent: () => import('./educlear/edicion/editar-examen/editar-examen').then(m => m.EditarExamen),
                data: {title: "Editar examen"}
            }
        ]
    }
];
