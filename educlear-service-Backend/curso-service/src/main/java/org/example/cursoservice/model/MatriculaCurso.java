package org.example.cursoservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "matriculas_curso")
@IdClass(MatriculaCursoId.class)
public class MatriculaCurso {

    @Id
    @Column(name = "curso_id")
    private Integer cursoId;

    @Id
    @Column(name = "alumno_id")
    private Integer alumnoId;
}
