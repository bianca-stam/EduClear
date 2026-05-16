package org.springframework.boot.materiales_service.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * DTO local que mapea la respuesta del usuario-service (GET /api/usuarios/{id}).
 */
@Getter
@Setter
public class UsuarioDTO {
    private Integer id;
    private String username;
    private String email;
    private String rol;
    private String token;
}
