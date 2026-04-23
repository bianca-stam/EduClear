package org.springframework.boot.asignatura_service.model;

import lombok.Data;
import java.io.Serializable;

@Data // Genera getters, setters, equals y hashCode (vital para claves compuestas)
public class MatriculaAsignaturaId implements Serializable {
    private Integer asignaturaId;
    private Integer alumnoId;
}