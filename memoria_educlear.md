# Memoria del Proyecto: EduClear

**Asignatura:** [Nombre de la Asignatura]  
**Autores:**  
- [Nombre del Usuario] (Backend Developer)  
- [Nombre del Compañero] (Frontend Developer)  
- [Nombre de la Compañera] (Docker & Cloud Architect)  
**Fecha:** 16 de Mayo de 2026

---

## 1. Introducción
EduClear es una plataforma educativa integral diseñada bajo una arquitectura de microservicios. Su objetivo es facilitar la gestión académica permitiendo a profesores y alumnos interactuar a través de cursos, asignaturas, tareas y exámenes. La plataforma destaca por su escalabilidad, modularidad y facilidad de despliegue mediante contenedores.

## 2. Tecnologías Utilizadas

### 2.1. Backend
- **Lenguaje:** Java 21 (LTS)
- **Framework:** Spring Boot 3 / 4
- **Persistencia:** Spring Data JPA + Hibernate
- **Seguridad:** JWT (JSON Web Tokens) para autenticación sin estado.
- **Gestión de Dependencias:** Maven
- **Base de Datos:** MariaDB

### 2.2. Frontend
- **Framework:** Angular 20
- **Estilos:** CSS/SCSS + componentes responsivos.

### 2.3. Infraestructura y Despliegue
- **Contenedores:** Docker & Docker Compose
- **Cloud:** Amazon Web Services (AWS)
- **Gateway:** Spring Cloud Gateway para el enrutamiento de peticiones.

---

## 3. Arquitectura del Sistema
El sistema se basa en un ecosistema de microservicios que se comunican de forma desacoplada:

1.  **Gateway (Port 8080):** Actúa como punto de entrada único, redirigiendo las peticiones al servicio correspondiente.
2.  **Usuario Service (Port 8081):** Gestiona la autenticación, autorización y perfiles de usuario.
3.  **Curso Service (Port 8082):** Administra la estructura de cursos y niveles.
4.  **Asignatura Service (Port 8083):** Gestiona las materias vinculadas a cada curso.
5.  **Materiales Service (Port 8084):** El núcleo pedagógico; gestiona temas, archivos, tareas, exámenes y notas.

---

## 4. Desarrollo del Backend (Responsabilidad de [Tu Nombre])

En esta sección se detalla la lógica de negocio y la implementación técnica de los servicios.

### 4.1. Microservicio de Materiales
Es el servicio más complejo, encargado de la gestión de contenidos. Implementa:
- **Gestión de Temas:** CRUD completo para organizar el contenido por materias.
- **Sistema de Archivos:** Permite subir y descargar materiales de apoyo.
- **Tareas y Entregas:** Lógica para que los profesores creen tareas y los alumnos entreguen archivos, con su correspondiente calificación.
- **Exámenes:** Generación de preguntas y evaluación automática de resultados.
- **Dashboard:** Un endpoint agregado que recopila el promedio de notas por alumno y tema, facilitando la visualización del progreso.

### 4.2. Modelo de Datos
La persistencia se gestiona mediante una base de datos relacional MariaDB. El esquema se divide en cinco bloques lógicos:

1.  **Usuarios y Roles:** Tabla `usuarios` con soporte para roles `alumno`, `profesor` y `admin`.
2.  **Estructura Académica:** Tablas `cursos`, `asignaturas` y `matriculas_asignatura` que definen la jerarquía educativa.
3.  **Contenidos:** Tablas `temas` y `archivos_contenido` (almacenamiento de materiales en formato `LONGBLOB`).
4.  **Evaluación (Exámenes):** Tablas `examenes`, `preguntas`, `intentos_examen` y `respuestas_alumno` para la gestión de tests con calificación automática.
5.  **Tareas:** Tablas `tareas`, `entregas_tarea` y `archivos_entrega` para la recepción y corrección de trabajos prácticos.

### 4.3. Seguridad y Autenticación
Se ha implementado un sistema de seguridad basado en JWT. El flujo consiste en:
1. El usuario se loguea en `usuario-service`.
2. El servicio valida las credenciales y devuelve un token firmado.
3. El frontend adjunta este token en el header `Authorization` de cada petición.
4. El Gateway o los servicios validan la firma del token para autorizar la operación.

### 4.4. Comunicación Inter-servicios
Para garantizar la integridad de los datos, los servicios se comunican mediante peticiones REST (usando `RestTemplate`) para verificar existencias (por ejemplo, validar que un alumno existe antes de permitirle entregar una tarea).

---

## 5. Desarrollo del Frontend (Responsabilidad de [Nombre del Compañero])
*(Sección a completar por el encargado de Frontend)*
- Implementación de la interfaz con Angular.
- Consumo de servicios REST a través del Gateway.
- Gestión de estados y rutas protegidas.

---

## 6. Despliegue e Infraestructura (Responsabilidad de [Nombre de la Compañera])
*(Sección a completar por la encargada de Despliegue)*
- **Dockerización:** Creación de `Dockerfile` específicos para cada servicio y Angular.
- **Orquestación:** Uso de `docker-compose.yml` para levantar todo el entorno (Base de datos, Gateway, Microservicios, Frontend).
- **AWS:** Configuración de instancias EC2 y servicios de red para el acceso público.

---

## 7. Conclusiones
La elección de una arquitectura de microservicios ha permitido un desarrollo paralelo eficiente entre los miembros del equipo. EduClear representa una solución robusta y escalable para entornos educativos modernos.
