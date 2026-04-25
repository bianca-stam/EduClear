import {
  DbArchivoContenido,
  DbArchivoEntrega,
  DbAsignatura,
  DbCurso,
  DbEntregaTarea,
  DbExamen,
  DbIntentoExamen,
  DbMatriculaAsignatura,
  DbPregunta,
  DbRespuestaAlumno,
  DbTarea,
  DbTema,
  DbUsuario
} from '../models/db-models';

export const MOCK_USUARIOS: DbUsuario[] = [
  { id_usuario: 1, email: 'profesor@educlear.com', contrasena: '$2a$10$JrlV6xm5KVZVVxwzCRW8yOJ8KnYB2KeoUIRBHJdX0UNrqrW.fAdTa', rol: 'profesor', nombre_completo: 'Carlos Docente' },
  { id_usuario: 2, email: 'ana@educlear.com', contrasena: '$2a$10$JrlV6xm5KVZVVxwzCRW8yOJ8KnYB2KeoUIRBHJdX0UNrqrW.fAdTa', rol: 'alumno', nombre_completo: 'Ana Estudiante' },
  { id_usuario: 3, email: 'luis@educlear.com', contrasena: '$2a$10$JrlV6xm5KVZVVxwzCRW8yOJ8KnYB2KeoUIRBHJdX0UNrqrW.fAdTa', rol: 'alumno', nombre_completo: 'Luis Alumno' }
];

export const MOCK_CURSOS: DbCurso[] = [
  { id_curso: 1, nombre: 'Desarrollo Web 1º', descripcion: 'Primer año de ciclo formativo' },
  { id_curso: 2, nombre: 'Diseño Gráfico 2º', descripcion: 'Segundo año, especialización' },
  { id_curso: 3, nombre: 'Marketing Digital', descripcion: 'Curso intensivo de marketing' }
];

export const MOCK_ASIGNATURAS: DbAsignatura[] = [
  { id_asignatura: 1, nombre: 'Programación Básica', curso_id: 1, profesor_id: 1 },
  { id_asignatura: 2, nombre: 'Bases de Datos', curso_id: 1, profesor_id: 1 },
  { id_asignatura: 3, nombre: 'Experiencia de Usuario (UX)', curso_id: 2, profesor_id: 1 }
];

export const MOCK_MATRICULAS: DbMatriculaAsignatura[] = [
  { asignatura_id: 1, alumno_id: 2 },
  { asignatura_id: 1, alumno_id: 3 },
  { asignatura_id: 2, alumno_id: 2 },
  { asignatura_id: 3, alumno_id: 2 }
];

export const MOCK_TEMAS: DbTema[] = [
  { id_tema: 1, titulo: 'Tema 1: Lógica Básica', descripcion: 'Conceptos de variables y bucles', asignatura_id: 1 },
  { id_tema: 2, titulo: 'Tema 2: Funciones', descripcion: 'Reutilización de código', asignatura_id: 1 },
  { id_tema: 3, titulo: 'Tema 1: Modelo Relacional', descripcion: 'Tablas y claves', asignatura_id: 2 }
];

export const MOCK_ARCHIVOS_CONTENIDO: DbArchivoContenido[] = [
  { id_contenido: 1, tema_id: 1, nombre_archivo: 'diapositivas_logica.pdf', tipo_mime: 'application/pdf', peso_bytes: 1048576 },
  { id_contenido: 2, tema_id: 2, nombre_archivo: 'ejercicios_funciones.pdf', tipo_mime: 'application/pdf', peso_bytes: 512000 },
  { id_contenido: 3, tema_id: 3, nombre_archivo: 'esquema_tablas.png', tipo_mime: 'image/png', peso_bytes: 256000 }
];

export const MOCK_EXAMENES: DbExamen[] = [
  { id_examen: 1, tema_id: 1, titulo: 'Test Inicial de Lógica', descripcion: '10 preguntas básicas', fecha_apertura: '2026-05-01 08:00:00', fecha_cierre: '2026-05-01 23:59:00' },
  { id_examen: 2, tema_id: 2, titulo: 'Examen de Funciones', descripcion: 'Test sobre parámetros y retornos', fecha_apertura: '2026-05-15 08:00:00', fecha_cierre: '2026-05-15 10:00:00' },
  { id_examen: 3, tema_id: 3, titulo: 'Prueba de SQL', descripcion: 'Conceptos teóricos de BBDD', fecha_apertura: '2026-06-01 08:00:00', fecha_cierre: '2026-06-01 23:59:00' }
];

export const MOCK_PREGUNTAS: DbPregunta[] = [
  { id_pregunta: 1, examen_id: 1, texto_pregunta: '¿Qué es una variable?', opcion_a: 'Un color', opcion_b: 'Un espacio en memoria', opcion_c: 'Un animal', opcion_d: 'Un coche', respuesta_correcta: 'B' },
  { id_pregunta: 2, examen_id: 1, texto_pregunta: '¿Para qué sirve un IF?', opcion_a: 'Para crear bucles', opcion_b: 'Para evaluar una condición', opcion_c: 'Para imprimir texto', opcion_d: 'Para borrar la base de datos', respuesta_correcta: 'B' },
  { id_pregunta: 3, examen_id: 1, texto_pregunta: '¿Cuál es el símbolo de asignación común?', opcion_a: '==', opcion_b: '===', opcion_c: '=', opcion_d: '!=', respuesta_correcta: 'C' }
];

export const MOCK_INTENTOS: DbIntentoExamen[] = [
  { id_intento: 1, examen_id: 1, alumno_id: 2, fecha_inicio: '2026-05-01 09:00:00', fecha_envio: '2026-05-01 09:45:00', calificacion_final: 8.50, estado: 'calificado' },
  { id_intento: 2, examen_id: 1, alumno_id: 3, fecha_inicio: '2026-05-01 10:00:00', fecha_envio: '2026-05-01 10:50:00', calificacion_final: 6.00, estado: 'calificado' },
  { id_intento: 3, examen_id: 2, alumno_id: 2, fecha_inicio: '2026-05-15 08:10:00', fecha_envio: null, calificacion_final: null, estado: 'en_curso' }
];

export const MOCK_RESPUESTAS_ALUMNO: DbRespuestaAlumno[] = [
  { id_respuesta: 1, intento_id: 1, pregunta_id: 1, opcion_seleccionada: 'B' },
  { id_respuesta: 2, intento_id: 1, pregunta_id: 2, opcion_seleccionada: 'B' },
  { id_respuesta: 3, intento_id: 1, pregunta_id: 3, opcion_seleccionada: 'A' }
];

export const MOCK_TAREAS: DbTarea[] = [
  { id_tarea: 1, tema_id: 1, titulo: 'Calculadora Básica', descripcion: 'Sube el código de tu calculadora', fecha_apertura: '2026-05-01 00:00:00', fecha_cierre: '2026-05-07 23:59:59' },
  { id_tarea: 2, tema_id: 2, titulo: 'Refactorización', descripcion: 'Mejora el código usando funciones', fecha_apertura: '2026-05-08 00:00:00', fecha_cierre: '2026-05-14 23:59:59' },
  { id_tarea: 3, tema_id: 3, titulo: 'Diseño de BBDD', descripcion: 'Crea el esquema de una tienda', fecha_apertura: '2026-05-15 00:00:00', fecha_cierre: '2026-05-21 23:59:59' }
];

export const MOCK_ENTREGAS_TAREA: DbEntregaTarea[] = [
  { id_entrega_tarea: 1, tarea_id: 1, alumno_id: 2, estado_entrega: 'enviado', calificacion: 9.00 },
  { id_entrega_tarea: 2, tarea_id: 1, alumno_id: 3, estado_entrega: 'enviado', calificacion: 7.50 },
  { id_entrega_tarea: 3, tarea_id: 2, alumno_id: 2, estado_entrega: 'borrador', calificacion: null }
];

export const MOCK_ARCHIVOS_ENTREGA: DbArchivoEntrega[] = [
  { id_archivo_tarea: 1, entrega_id: 1, nombre_archivo: 'calculadora_ana.zip', tipo_mime: 'application/zip', peso_bytes: 2048000 },
  { id_archivo_tarea: 2, entrega_id: 2, nombre_archivo: 'calculadora_luis_v2.zip', tipo_mime: 'application/zip', peso_bytes: 2150000 },
  { id_archivo_tarea: 3, entrega_id: 3, nombre_archivo: 'intento_refactor_ana.js', tipo_mime: 'text/javascript', peso_bytes: 5000 }
];
