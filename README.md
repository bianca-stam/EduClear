# EduClear

Plataforma educativa basada en microservicios, desarrollada con Spring Boot y Angular.

## Tecnologías

- **Frontend:** Angular 20
- **Backend:** Spring Boot 3 (Java 21)
- **Base de datos:** MariaDB
- **Contenedores:** Docker + Docker Compose

## Microservicios

| Servicio | Puerto | Descripción |
|---|---|---|
| `usuario-service` | 8080 | Gestión de usuarios |
| `curso-service` | 8081 | Gestión de cursos |
| `frontend` | 80 | Aplicación Angular |
| `mariadb` | 3306 | Base de datos |

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Git

## Instalación y puesta en marcha

### 1. Clona el repositorio

```bash
git clone https://github.com/bianca-stam/EduClear.git
cd EduClear
```

### 2. Configura las variables de entorno

Copia el archivo de ejemplo y rellena tus propios valores:

```bash
cp .env.example .env
```

Edita el `.env` con tus datos:

```
DB_NAME=nombre_de_la_base_de_datos
DB_USER=usuario_para_la_base_de_datos
DB_PASSWORD=contraseña_para_este_usuario
```

### 3. Arranca el proyecto

Abre la app de Docker Desktop, espera a que arranque y escribe el siguiente comando en la raíz del proyecto:

```bash
docker compose up --build
```

La **primera** vez tardará unos minutos mientras descarga las imágenes y compila el proyecto. Después, para arrancarlo solo tienes que usar este otro comando:

```bash
docker compose up -d
```

Cuando acabes, termina la sesión con este otro comando:

```bash
docker compose down
```


## URLs

Una vez arrancado, la aplicación estará disponible en:

- **Frontend** → http://localhost
- **Usuario Service** → http://localhost:8080
- **Curso Service** → http://localhost:8081

## Comandos útiles

```bash
# Arrancar en segundo plano
docker compose up -d

# Ver logs en tiempo real
docker compose logs -f

# Ver logs de un servicio concreto
docker compose logs -f usuario-service

# Parar los contenedores
docker compose down

# Parar y eliminar volúmenes (borra datos de la BD)
docker compose down -v

# Reconstruir un servicio concreto
docker compose build usuario-service --no-cache
```

## Estructura del proyecto

```
EduClear/
├── docker-compose.yml
├── .env                          ← no se sube a GitHub
├── .env.example                  ← plantilla para configurar el entorno
├── educlear-frontend/            ← aplicación Angular
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
└── educlear-service-Backend/
    ├── usuario-service/          ← microservicio de usuarios
    │   ├── Dockerfile
    │   └── src/
    └── curso-service/            ← microservicio de cursos
        ├── Dockerfile
        └── src/
```
