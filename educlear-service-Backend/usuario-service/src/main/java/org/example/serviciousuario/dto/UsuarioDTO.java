package org.example.serviciousuario.dto;

import lombok.Data;
import org.example.serviciousuario.model.Rol;

@Data
public class UsuarioDTO {
    private Integer id;
    private String username;
    private String email;
    private Rol rol;
    private Integer cursoId;
    private Object datosCurso;
}
