package org.springframework.boot.asignatura_service.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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