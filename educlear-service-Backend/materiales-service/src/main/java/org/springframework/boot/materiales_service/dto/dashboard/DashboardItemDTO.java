package org.springframework.boot.materiales_service.dto.dashboard;

import lombok.Data;
import org.springframework.boot.materiales_service.dto.AsignaturaDTO;
import org.springframework.boot.materiales_service.dto.CursoDTO;
import org.springframework.boot.materiales_service.dto.tema.TemaDTO;
import org.springframework.boot.materiales_service.dto.tarea.response.TareaDTO;
import org.springframework.boot.materiales_service.dto.examen.response.ExamenDTO;

import java.time.LocalDateTime;

@Data
public class DashboardItemDTO {
    private String tipo; // "examen" o "tarea"
    private Integer id;
    private String titulo;
    private String descripcion;
    private LocalDateTime fecha_apertura;
    private LocalDateTime fecha_cierre;
    private String curso_nombre;
    private String asignatura_nombre;
    private String tema_nombre;

    // Referencias completas
    private CursoDTO cursoRef;
    private AsignaturaDTO asignaturaRef;
    private TemaDTO temaRef;
    private TareaDTO tareaRef;
    private ExamenDTO examenRef;
}
