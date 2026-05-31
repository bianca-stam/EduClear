import {Routes} from '@angular/router';
import { Inicio } from './educlear/inicio/inicio';
import { Cursos } from './educlear/cursos/cursos';
import { Asignaturas } from './educlear/asignaturas/asignaturas';
import { cursoSeleccionadoGuard } from '@core/guards/curso-seleccionado.guard';
import { Asignatura } from './educlear/asignaturas/asignatura/asignatura';
import { asignaturaSeleccionadaGuard } from '@core/guards/asignatura-seleccionada.guard';
import { Tema } from './educlear/tema/tema';
import { adminProfesorGuard } from '@core/guards/admin-profesor.guard';

export const VIEWS_ROUTES: Routes = [
    // ── EduClear (Cursos, Asignaturas, Temas) ──────────────────────────────
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

    // ── Gestión & Edición (Admin/Profesor) ──────────────────────────────────
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
