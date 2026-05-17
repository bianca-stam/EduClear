export type RolUsuario = 'alumno' | 'profesor' | 'admin';

export interface DbUsuario {
  id_usuario: number;
  email: string;
  contrasena: string;
  rol: RolUsuario;
  nombre_completo: string;
}

export interface DbCurso {
  id_curso: number;
  nombre: string;
  descripcion: string;
}

export interface DbAsignatura {
  id_asignatura: number;
  nombre: string;
  curso_id: number;
  profesor_id: number;
}

export interface DbMatriculaAsignatura {
  asignatura_id: number;
  alumno_id: number;
}

export interface DbTema {
  id_tema: number;
  titulo: string;
  descripcion: string;
  asignatura_id: number;
}

export interface DbArchivoContenido {
  id_contenido: number;
  tema_id: number;
  nombre_archivo: string;
  tipo_mime: string;
  peso_bytes: number;
  archivo_blob?: string;
}

export interface DbExamen {
  id_examen: number;
  tema_id: number;
  titulo: string;
  descripcion: string;
  fecha_apertura: string;
  fecha_cierre: string;
}

export type OpcionRespuesta = 'A' | 'B' | 'C' | 'D';

export interface DbPregunta {
  id_pregunta: number;
  examen_id: number;
  texto_pregunta: string;
  opcion_a: string;
  opcion_b: string;
  opcion_c: string;
  opcion_d: string;
  respuesta_correcta: OpcionRespuesta;
}

export type EstadoIntento = 'en_curso' | 'enviado' | 'calificado';

export interface DbIntentoExamen {
  id_intento: number;
  examen_id: number;
  alumno_id: number;
  fecha_inicio: string;
  fecha_envio: string | null;
  calificacion_final: number | null;
  estado: EstadoIntento;
}

export interface DbRespuestaAlumno {
  id_respuesta: number;
  intento_id: number;
  pregunta_id: number;
  opcion_seleccionada: OpcionRespuesta;
}

export interface DbTarea {
  id_tarea: number;
  tema_id: number;
  titulo: string;
  descripcion: string;
  fecha_apertura: string;
  fecha_cierre: string;
}

export type EstadoEntrega = 'no_entregado' | 'borrador' | 'enviado';

export interface DbEntregaTarea {
  id_entrega_tarea: number;
  tarea_id: number;
  alumno_id: number;
  estado_entrega: EstadoEntrega;
  calificacion: number | null;
}

export interface DbArchivoEntrega {
  id_archivo_tarea: number;
  entrega_id: number;
  nombre_archivo: string;
  tipo_mime: string;
  peso_bytes: number;
  archivo_blob?: string;
}

// Respustas de ciertas llamadas a la API

export interface DbCalificacionesAlumno {
  promedio: number | null;
  temaId: number;
  tituloTema: string;
}
