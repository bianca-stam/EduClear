package org.springframework.boot.asignatura_service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAsignaturaDTO {
    private String nombre;
    private Integer profesorId;
}
