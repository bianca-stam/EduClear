package org.springframework.boot.asignatura_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data // Genera getters, setters, equals y hashCode (vital para claves compuestas)
@NoArgsConstructor
@AllArgsConstructor
public class MatriculaAsignaturaId implements Serializable {
    private Integer asignaturaId;
    private Integer alumnoId;
}