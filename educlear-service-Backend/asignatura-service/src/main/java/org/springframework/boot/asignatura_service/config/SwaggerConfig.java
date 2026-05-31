package org.springframework.boot.asignatura_service.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("EduClear - Asignatura Service API")
                        .version("1.0.0")
                        .description("Documentación de los endpoints del microservicio de asignaturas. " +
                                "Gestiona asignaturas, asignación de profesores y consulta de alumnos por curso."));
    }
}
