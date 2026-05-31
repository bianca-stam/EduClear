package org.example.serviciousuario.config;

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
                        .title("EduClear - Usuario Service API")
                        .version("1.0.0")
                        .description("Documentación de los endpoints del microservicio de usuarios. " +
                                "Gestiona autenticación, roles (Admin, Profesor, Alumno) y perfiles de usuario."));
    }
}
