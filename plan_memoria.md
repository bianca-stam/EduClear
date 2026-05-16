# Plan: Creación de la Memoria del Proyecto EduClear

Este plan detalla los pasos para generar un documento de memoria profesional que cubra todos los aspectos del proyecto, con especial énfasis en el backend, la arquitectura de microservicios y la integración con el frontend y el despliegue.

## 1. Estructura del Documento
Definir el índice detallado del documento:
- Portada
- Índice
- Introducción
- Análisis de Requisitos
- Arquitectura del Sistema
- Desarrollo Backend (Responsabilidad del Usuario)
- Desarrollo Frontend (Responsabilidad del Compañero)
- Despliegue e Infraestructura (Responsabilidad de la Compañera)
- Conclusiones y Trabajo Futuro

## 2. Detalle del Backend (Microservicios)
Para cada microservicio, documentar:
- **usuario-service**: Gestión de perfiles, autenticación y roles (Profesor/Alumno).
- **curso-service**: Organización de niveles educativos y grupos.
- **asignatura-service**: Gestión de materias dentro de los cursos.
- **materiales-service**: Manejo de archivos, tareas, exámenes y calificaciones.
- **gateway-educlear**: Punto de entrada único y enrutamiento.

## 3. Diagramas y Visualizaciones
- Crear un diagrama de arquitectura de microservicios.
- Diagrama de Entidad-Relación (basado en `basedatoseduclear.sql`).
- Diagramas de flujo de datos principales (ej. entrega de tarea).

## 4. Recopilación de Información Técnica
- Extraer detalles técnicos específicos de los archivos `pom.xml`, `application.yml` y controladores.
- Documentar las principales decisiones de diseño (ej. uso de REST, JPA/Hibernate, comunicación entre servicios).

## 5. Integración con Frontend y Docker
- Describir cómo el frontend consume las APIs del Gateway.
- Resumen del proceso de Dockerización y despliegue en AWS.
