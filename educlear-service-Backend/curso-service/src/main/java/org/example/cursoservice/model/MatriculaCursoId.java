package org.example.cursoservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatriculaCursoId implements Serializable {
    private Integer cursoId;
    private Integer alumnoId;
}
