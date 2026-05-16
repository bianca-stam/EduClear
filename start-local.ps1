$ErrorActionPreference = "Stop"

# Leer variables del .env
Write-Host "Configurando variables de entorno desde .env..." -ForegroundColor Cyan
$env:DB_HOST="localhost"
$env:DB_PORT="3306"
$env:DB_NAME="dbeduclear"
$env:DB_USER="educlear"
$env:DB_PASSWORD="educlear"

Write-Host "1. Iniciando MariaDB en Docker..." -ForegroundColor Green
docker compose up mariadb -d
Start-Sleep -Seconds 5

Write-Host "2. Iniciando Microservicios Backend..." -ForegroundColor Green
# Guardar el directorio actual
$baseDir = Get-Location

# Función para iniciar un microservicio
function Start-Microservice {
    param (
        [string]$name,
        [string]$path
    )
    Write-Host "   Iniciando $name..." -ForegroundColor Yellow
    $args = "-NoExit -Command `"cd '$path'; `$env:DB_HOST='localhost'; `$env:DB_PORT='3306'; `$env:DB_NAME='dbeduclear'; `$env:DB_USER='educlear'; `$env:DB_PASSWORD='educlear'; .\mvnw.cmd spring-boot:run`""
    Start-Process powershell -ArgumentList $args
}

Start-Microservice -name "Usuario Service" -path "$baseDir\educlear-service-Backend\usuario-service"
Start-Microservice -name "Curso Service" -path "$baseDir\educlear-service-Backend\curso-service"
Start-Microservice -name "Asignatura Service" -path "$baseDir\educlear-service-Backend\asignatura-service"
Start-Microservice -name "Materiales Service" -path "$baseDir\educlear-service-Backend\materiales-service"

Write-Host "Esperando 15 segundos antes de iniciar el API Gateway (necesita que los otros servicios esten listos)..." -ForegroundColor Cyan
Start-Sleep -Seconds 15

Start-Microservice -name "API Gateway" -path "$baseDir\educlear-service-Backend\gateway-educlear"

Write-Host "3. Iniciando Frontend Angular..." -ForegroundColor Green
$frontArgs = "-NoExit -Command `"cd '$baseDir\educlear-frontend'; npm start`""
Start-Process powershell -ArgumentList $frontArgs

Write-Host "¡Todo iniciado! Deberías tener 6 ventanas nuevas de PowerShell abiertas." -ForegroundColor Cyan
Write-Host "Para detener todo, simplemente cierra las ventanas y ejecuta 'docker compose stop mariadb'." -ForegroundColor Cyan
