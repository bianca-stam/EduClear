package org.example.cursoservice.config;

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
                        .title("EduClear - Curso Service API")
                        .version("1.0.0")
                        .description("Documentación de los endpoints del microservicio de cursos. " +
                                "Gestiona la estructura de cursos académicos y las matrículas de alumnos."));
    }
}
