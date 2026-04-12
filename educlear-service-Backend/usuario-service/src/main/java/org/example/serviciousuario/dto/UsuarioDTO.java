package org.example.serviciousuario.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.example.serviciousuario.model.Rol;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UsuarioDTO {
    private Integer id;
    private String username;
    private String email;
    private Rol rol;
    private Integer cursoId;
    private Object datosCurso;
}
