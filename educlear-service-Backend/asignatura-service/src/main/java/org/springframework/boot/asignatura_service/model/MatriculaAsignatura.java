package org.springframework.boot.asignatura_service.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;

// Clase para la clave compuesta
@Getter
@Setter
class MatriculaAsignaturaId implements Serializable {
    private Integer asignaturaId;
    private Integer alumnoId;
}

@Getter
@Setter
@Entity
@Table(name="matriculas_asignatura")
@IdClass(MatriculaAsignaturaId.class)
public class MatriculaAsignatura {

    @Id
    @Column(name = "asignatura_id")
    private Integer asignaturaId;

    @Id
    @Column(name = "alumno_id")
    private Integer alumnoId;
}