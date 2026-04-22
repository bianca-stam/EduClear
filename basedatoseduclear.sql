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

-- 1. USUARIOS (1 Profesor y 2 Alumnos)
INSERT INTO usuarios (email, contrasena, rol, nombre_completo) VALUES
('profesor@educlear.com', '123', 'profesor', 'Carlos Docente'),
('ana@educlear.com', '123', 'alumno', 'Ana Estudiante'),
('luis@educlear.com', '123', 'alumno', 'Luis Alumno');

-- 2. CURSOS
INSERT INTO cursos (nombre, descripcion) VALUES
('Desarrollo Web 1º', 'Primer año de ciclo formativo'),
('Diseño Gráfico 2º', 'Segundo año, especialización'),
('Marketing Digital', 'Curso intensivo de marketing');

-- 3. ASIGNATURAS (Vinculadas a los cursos y al Profesor Carlos [ID 1])
INSERT INTO asignaturas (nombre, curso_id, profesor_id) VALUES
('Programación Básica', 1, 1),
('Bases de Datos', 1, 1),
('Experiencia de Usuario (UX)', 2, 1);

-- 4. MATRÍCULAS (Ana [ID 2] y Luis [ID 3] se matriculan en algunas asignaturas)
INSERT INTO matriculas_asignatura (asignatura_id, alumno_id) VALUES
(1, 2), -- Ana en Programación
(1, 3), -- Luis en Programación
(2, 2); -- Ana en Bases de Datos

-- 5. TEMAS
INSERT INTO temas (titulo, descripcion, asignatura_id) VALUES
('Tema 1: Lógica Básica', 'Conceptos de variables y bucles', 1),
('Tema 2: Funciones', 'Reutilización de código', 1),
('Tema 1: Modelo Relacional', 'Tablas y claves', 2);

-- 6. ARCHIVOS DE CONTENIDO (Teoría subida por el profesor)
INSERT INTO archivos_contenido (tema_id, nombre_archivo, tipo_mime, peso_bytes, archivo_blob) VALUES
(1, 'diapositivas_logica.pdf', 'application/pdf', 1048576, 0x00),
(2, 'ejercicios_funciones.pdf', 'application/pdf', 512000, 0x00),
(3, 'esquema_tablas.png', 'image/png', 256000, 0x00);

-- 7. EXÁMENES
INSERT INTO examenes (tema_id, titulo, descripcion, fecha_apertura, fecha_cierre) VALUES
(1, 'Test Inicial de Lógica', '10 preguntas básicas', '2026-05-01 08:00:00', '2026-05-01 23:59:00'),
(2, 'Examen de Funciones', 'Test sobre parámetros y retornos', '2026-05-15 08:00:00', '2026-05-15 10:00:00'),
(3, 'Prueba de SQL', 'Conceptos teóricos de BBDD', '2026-06-01 08:00:00', '2026-06-01 23:59:00');

-- 8. PREGUNTAS (Para el primer examen [ID 1])
INSERT INTO preguntas (examen_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta) VALUES
(1, '¿Qué es una variable?', 'Un color', 'Un espacio en memoria', 'Un animal', 'Un coche', 'B'),
(1, '¿Para qué sirve un IF?', 'Para crear bucles', 'Para evaluar una condición', 'Para imprimir texto', 'Para borrar la base de datos', 'B'),
(1, '¿Cuál es el símbolo de asignación común?', '==', '===', '=', '!=', 'C');

-- 9. INTENTOS DE EXAMEN
INSERT INTO intentos_examen (examen_id, alumno_id, fecha_inicio, fecha_envio, calificacion_final, estado) VALUES
(1, 2, '2026-05-01 09:00:00', '2026-05-01 09:45:00', 8.50, 'calificado'), -- Ana hizo el examen y lo entregó
(1, 3, '2026-05-01 10:00:00', '2026-05-01 10:50:00', 6.00, 'calificado'), -- Luis también
(2, 2, '2026-05-15 08:10:00', NULL, NULL, 'en_curso'); -- Ana está haciendo el segundo examen ahora mismo

-- 10. RESPUESTAS ALUMNO (Lo que marcó Ana [Intento ID 1] en sus 3 preguntas)
INSERT INTO respuestas_alumno (intento_id, pregunta_id, opcion_seleccionada) VALUES
(1, 1, 'B'), -- Correcta
(1, 2, 'B'), -- Correcta
(1, 3, 'A'); -- Se equivocó en esta

-- 11. TAREAS
INSERT INTO tareas (tema_id, titulo, descripcion, fecha_apertura, fecha_cierre) VALUES
(1, 'Calculadora Básica', 'Sube el código de tu calculadora', '2026-05-01 00:00:00', '2026-05-07 23:59:59'),
(2, 'Refactorización', 'Mejora el código usando funciones', '2026-05-08 00:00:00', '2026-05-14 23:59:59'),
(3, 'Diseño de BBDD', 'Crea el esquema de una tienda', '2026-05-15 00:00:00', '2026-05-21 23:59:59');

-- 12. ENTREGAS DE TAREA
INSERT INTO entregas_tarea (tarea_id, alumno_id, estado_entrega, calificacion) VALUES
(1, 2, 'enviado', 9.00), -- Ana entregó y sacó un 9
(1, 3, 'enviado', 7.50), -- Luis entregó y sacó un 7.5
(2, 2, 'borrador', NULL); -- Ana ha subido un archivo pero aún no le ha dado al botón de entrega final

-- 13. ARCHIVOS DE ENTREGA (Los archivos que subieron los alumnos)
INSERT INTO archivos_entrega (entrega_id, nombre_archivo, tipo_mime, peso_bytes, archivo_blob) VALUES
(1, 'calculadora_ana.zip', 'application/zip', 2048000, 0x00),
(2, 'calculadora_luis_v2.zip', 'application/zip', 2150000, 0x00),
(3, 'intento_refactor_ana.js', 'text/javascript', 5000, 0x00);

SET FOREIGN_KEY_CHECKS=1;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
