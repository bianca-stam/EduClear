-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         12.2.2-MariaDB - MariaDB Server
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.14.0.7165
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para bdeduclear
SET FOREIGN_KEY_CHECKS=0;

-- Volcando estructura para tabla bdeduclear.curso
-- 1. USUARIOS Y ROLES
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('alumno', 'profesor', 'admin') NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL
);

-- 2. ESTRUCTURA ACADÉMICA (Soporte para Panel de Profesor)
CREATE TABLE cursos (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE asignaturas (
    id_asignatura INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    curso_id INT,
    profesor_id INT, -- Control de permisos: solo este profesor puede editar contenidos aquí
    FOREIGN KEY (curso_id) REFERENCES cursos(id_curso) ON DELETE CASCADE,
    FOREIGN KEY (profesor_id) REFERENCES usuarios(id_usuario)
);

CREATE TABLE matriculas_asignatura (
    asignatura_id INT,
    alumno_id INT,
    PRIMARY KEY (asignatura_id, alumno_id),
    FOREIGN KEY (asignatura_id) REFERENCES asignaturas(id_asignatura) ON DELETE CASCADE,
    FOREIGN KEY (alumno_id) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- 3. TEMARIO Y CONTENIDOS (ARCHIVOS EN BINARIO)
CREATE TABLE temas (
    id_tema INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    asignatura_id INT,
    FOREIGN KEY (asignatura_id) REFERENCES asignaturas(id_asignatura) ON DELETE CASCADE
);

CREATE TABLE archivos_contenido (
    id_contenido INT AUTO_INCREMENT PRIMARY KEY,
    tema_id INT,
    nombre_archivo VARCHAR(255) NOT NULL,
    tipo_mime VARCHAR(100) NOT NULL, -- Ej: 'application/pdf', crucial para el frontend
    peso_bytes INT,
    archivo_blob LONGBLOB NOT NULL, -- El archivo guardado en binario
    FOREIGN KEY (tema_id) REFERENCES temas(id_tema) ON DELETE CASCADE
);

-- 4. EXÁMENES Y PREGUNTAS
CREATE TABLE examenes (
    id_examen INT AUTO_INCREMENT PRIMARY KEY,
    tema_id INT,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_apertura DATETIME,
    fecha_cierre DATETIME, -- El frontend usará esto para calcular el contador
    FOREIGN KEY (tema_id) REFERENCES temas(id_tema) ON DELETE CASCADE
);

CREATE TABLE preguntas (
    id_pregunta INT AUTO_INCREMENT PRIMARY KEY,
    examen_id INT,
    texto_pregunta TEXT NOT NULL,
    opcion_a VARCHAR(255) NOT NULL,
    opcion_b VARCHAR(255) NOT NULL,
    opcion_c VARCHAR(255) NOT NULL,
    opcion_d VARCHAR(255) NOT NULL,
    respuesta_correcta ENUM('A', 'B', 'C', 'D') NOT NULL,
    FOREIGN KEY (examen_id) REFERENCES examenes(id_examen) ON DELETE CASCADE
);

CREATE TABLE intentos_examen (
    id_intento INT AUTO_INCREMENT PRIMARY KEY,
    examen_id INT,
    alumno_id INT,
    fecha_inicio DATETIME NOT NULL,
    fecha_envio DATETIME,
    calificacion_final DECIMAL(4,2), 
    estado ENUM('en_curso', 'enviado', 'calificado') DEFAULT 'en_curso',
    FOREIGN KEY (examen_id) REFERENCES examenes(id_examen) ON DELETE CASCADE,
    FOREIGN KEY (alumno_id) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE respuestas_alumno (
    id_respuesta INT AUTO_INCREMENT PRIMARY KEY,
    intento_id INT,
    pregunta_id INT,
    opcion_seleccionada ENUM('A', 'B', 'C', 'D'),
    FOREIGN KEY (intento_id) REFERENCES intentos_examen(id_intento) ON DELETE CASCADE,
    FOREIGN KEY (pregunta_id) REFERENCES preguntas(id_pregunta) ON DELETE CASCADE
);

-- 5. TAREAS Y ENTREGAS (ARCHIVOS EN BINARIO)
CREATE TABLE tareas (
    id_tarea INT AUTO_INCREMENT PRIMARY KEY,
    tema_id INT,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_apertura DATETIME,
    fecha_cierre DATETIME, 
    FOREIGN KEY (tema_id) REFERENCES temas(id_tema) ON DELETE CASCADE
);

CREATE TABLE entregas_tarea (
    id_entrega_tarea INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT,
    alumno_id INT,
    estado_entrega ENUM('no_entregado', 'borrador', 'enviado') DEFAULT 'no_entregado',
    calificacion DECIMAL(4,2),
    FOREIGN KEY (tarea_id) REFERENCES tareas(id_tarea) ON DELETE CASCADE,
    FOREIGN KEY (alumno_id) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE archivos_entrega (
    id_archivo_tarea INT AUTO_INCREMENT PRIMARY KEY,
    entrega_id INT,
    nombre_archivo VARCHAR(255) NOT NULL,
    tipo_mime VARCHAR(100) NOT NULL,
    peso_bytes INT,
    archivo_blob LONGBLOB NOT NULL, -- El archivo entregado guardado en binario
    FOREIGN KEY (entrega_id) REFERENCES entregas_tarea(id_entrega_tarea) ON DELETE CASCADE
);

-- 1. USUARIOS
TRUNCATE TABLE usuarios;
INSERT INTO usuarios (id_usuario, email, contrasena, rol, nombre_completo) VALUES
(1, 'admin@educlear.com', '$2a$10$JrlV6xm5KVZVVxwzCRW8yOJ8KnYB2KeoUIRBHJdX0UNrqrW.fAdTa', 'admin', 'Super Administrador'),
(2, 'profesor@educlear.com', '$2a$10$JrlV6xm5KVZVVxwzCRW8yOJ8KnYB2KeoUIRBHJdX0UNrqrW.fAdTa', 'profesor', 'Marcos López (DAM)'),
(3, 'profesor1@educlear.com', '$2a$10$JrlV6xm5KVZVVxwzCRW8yOJ8KnYB2KeoUIRBHJdX0UNrqrW.fAdTa', 'profesor', 'Beatriz Sanz (ASIR)'),
(4, 'ana@educlear.com', '$2a$10$JrlV6xm5KVZVVxwzCRW8yOJ8KnYB2KeoUIRBHJdX0UNrqrW.fAdTa', 'alumno', 'Ana García'),
(5, 'luis@educlear.com', '$2a$10$JrlV6xm5KVZVVxwzCRW8yOJ8KnYB2KeoUIRBHJdX0UNrqrW.fAdTa', 'alumno', 'Luis Ruiz'),
(6, 'elena@educlear.com', '$2a$10$JrlV6xm5KVZVVxwzCRW8yOJ8KnYB2KeoUIRBHJdX0UNrqrW.fAdTa', 'alumno', 'Elena Belmonte'),
(7, 'juan@educlear.com', '$2a$10$JrlV6xm5KVZVVxwzCRW8yOJ8KnYB2KeoUIRBHJdX0UNrqrW.fAdTa', 'alumno', 'Juan Naranjo');

-- 2. CURSOS
TRUNCATE TABLE cursos;
INSERT INTO cursos (id_curso, nombre, descripcion) VALUES
(1, '1º Desarrollo de Aplicaciones Multiplataforma (DAM)', 'Ciclo formativo centrado en el desarrollo de software para diversos dispositivos y sistemas.'),
(2, '1º Administración de Sistemas Informáticos en Red (ASIR)', 'Especialidad en configuración, administración y mantenimiento de sistemas y redes.');

-- 3. ASIGNATURAS (4 por curso)
TRUNCATE TABLE asignaturas;
INSERT INTO asignaturas (id_asignatura, nombre, curso_id, profesor_id) VALUES
-- Curso 1 (DAM) - Profesor Marcos
(1, 'Programación Java', 1, 2),
(2, 'Bases de Datos SQL', 1, 2),
(3, 'Lenguajes de Marcas', 1, 2),
(4, 'Entornos de Desarrollo', 1, 2),
-- Curso 2 (ASIR) - Profesora Beatriz
(5, 'Implantación de Sistemas Operativos', 2, 3),
(6, 'Planificación y Administración de Redes', 2, 3),
(7, 'Fundamentos de Hardware', 2, 3),
(8, 'Gestión de Bases de Datos', 2, 3);

-- 4. MATRÍCULAS
TRUNCATE TABLE matriculas_asignatura;
INSERT INTO matriculas_asignatura (asignatura_id, alumno_id) VALUES
(1,4),(2,4),(3,4),(4,4), -- Ana en DAM
(1,5),(2,5),(3,5),(4,5), -- Pablo en DAM
(5,6),(6,6),(7,6),(8,6), -- Elena en ASIR
(5,7),(6,7),(7,7),(8,7); -- Juan en ASIR

-- 5. TEMAS (3 por asignatura = 24 temas)
TRUNCATE TABLE temas;
INSERT INTO temas (id_tema, titulo, descripcion, asignatura_id) VALUES
-- DAM: Programación
(1, 'Introducción a Java', 'Sintaxis básica y tipos de datos.', 1),
(2, 'Estructuras de Control', 'Bucles y condicionales.', 1),
(3, 'Programación Orientada a Objetos', 'Clases, objetos y herencia.', 1),
-- DAM: BBDD
(4, 'Modelo Relacional', 'Conceptos de tablas y relaciones.', 2),
(5, 'Lenguaje SQL DDL', 'Creación y modificación de tablas.', 2),
(6, 'Consultas DML', 'SELECT, INSERT, UPDATE y DELETE.', 2),
-- ASIR: ISO
(7, 'Arquitectura de SO', 'Kernel, procesos y memoria.', 5),
(8, 'Sistemas Windows', 'Administración de Windows Server.', 5),
(9, 'Sistemas Linux', 'Gestión de usuarios y permisos en Bash.', 5),
-- ASIR: Redes
(10, 'Modelo OSI y TCP/IP', 'Capas de red y protocolos.', 6),
(11, 'Direccionamiento IPv4', 'Subnetting y máscaras de red.', 6),
(12, 'Configuración de Switches', 'VLANs y seguridad de puerto.', 6);
-- (Se pueden añadir más temas siguiendo el patrón hasta el 24)

-- 6. ARCHIVOS DE CONTENIDO (2 PDFs por tema)
TRUNCATE TABLE archivos_contenido;
INSERT INTO archivos_contenido (tema_id, nombre_archivo, tipo_mime, peso_bytes, archivo_blob) VALUES
(1, 'Introduccion_Java.pdf', 'application/pdf', 1024, 0x00),
(1, 'Ejercicios_Sintaxis.pdf', 'application/pdf', 2048, 0x00),
(9, 'Comandos_Linux.pdf', 'application/pdf', 5000, 0x00),
(9, 'Gestion_Permisos.pdf', 'application/pdf', 3500, 0x00),
(10, 'Capas_OSI.pdf', 'application/pdf', 8000, 0x00),
(10, 'Protocolos_Red.pdf', 'application/pdf', 12000, 0x00);

-- 7. TAREAS (2 por tema)
TRUNCATE TABLE tareas;
INSERT INTO tareas (id_tema, titulo, descripcion, fecha_apertura, fecha_cierre) VALUES
(1, 'Práctica 1: Hola Mundo', 'Escribe tu primer programa en Java.', '2026-05-01', '2026-05-15'),
(1, 'Práctica 2: Variables', 'Uso de int, double y String.', '2026-05-01', '2026-05-15'),
(9, 'Laboratorio: Permisos Bash', 'Configura un entorno con 3 usuarios.', '2026-05-10', '2026-05-20'),
(9, 'Script de Respaldo', 'Crea un .sh para comprimir /etc.', '2026-05-10', '2026-05-20');

-- 8. EXÁMENES (1 por tema)
TRUNCATE TABLE examenes;
INSERT INTO examenes (id_tema, titulo, descripcion, fecha_apertura, fecha_cierre) VALUES
(1, 'Examen Parcial: Java Básico', 'Conceptos de sintaxis.', '2026-05-20 09:00', '2026-05-20 11:00'),
(9, 'Test de Comandos Linux', 'Evaluación de administración Shell.', '2026-05-25 10:00', '2026-05-25 12:00'),
(10, 'Prueba de Redes: OSI', 'Preguntas sobre capas físicas y lógicas.', '2026-06-01 08:00', '2026-06-01 10:00');

-- 9. PREGUNTAS
TRUNCATE TABLE preguntas;
INSERT INTO preguntas (examen_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta) VALUES
(1, '¿Qué comando compila un archivo Java?', 'java', 'javac', 'jar', 'exe', 'B'),
(2, '¿Qué comando cambia el dueño de un archivo?', 'chmod', 'chown', 'ls', 'cd', 'B');

-- 10. CASUÍSTICA DE ENTREGAS Y EXÁMENES
-- Ana (DAM) ha entregado todo y tiene buena nota
INSERT INTO entregas_tarea (tarea_id, alumno_id, estado_entrega, calificacion) VALUES
(1, 4, 'enviado', 9.50),
(2, 4, 'enviado', 8.75);

-- Pablo (DAM) tiene una en borrador y otra enviada
INSERT INTO entregas_tarea (tarea_id, alumno_id, estado_entrega, calificacion) VALUES
(1, 5, 'enviado', 5.00),
(2, 5, 'borrador', NULL);

-- Elena (ASIR) entregó pero no está calificado
INSERT INTO entregas_tarea (tarea_id, alumno_id, estado_entrega, calificacion) VALUES
(3, 6, 'enviado', NULL);

-- Juan (ASIR) no ha entregado nada (no se inserta o estado no_entregado)
INSERT INTO entregas_tarea (tarea_id, alumno_id, estado_entrega, calificacion) VALUES
(3, 7, 'no_entregado', NULL);

-- Intentos de examen
INSERT INTO intentos_examen (examen_id, alumno_id, fecha_inicio, fecha_envio, calificacion_final, estado) VALUES
(1, 4, '2026-05-20 09:05:00', '2026-05-20 10:30:00', 10.00, 'calificado'), -- Ana perfecta
(1, 5, '2026-05-20 09:10:00', '2026-05-20 11:00:00', 3.50, 'calificado'),  -- Pablo suspendió
(2, 6, '2026-05-25 10:00:00', NULL, NULL, 'en_curso');

SET FOREIGN_KEY_CHECKS=1;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */; 
