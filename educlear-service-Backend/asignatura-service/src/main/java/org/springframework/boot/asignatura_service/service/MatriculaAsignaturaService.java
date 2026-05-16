package org.springframework.boot.asignatura_service.service;

import org.springframework.boot.asignatura_service.dto.MatriculaAsignaturaDTO;
import org.springframework.boot.asignatura_service.model.MatriculaAsignatura;
import java.util.List;

public interface MatriculaAsignaturaService {
    List<MatriculaAsignaturaDTO> obtenerTodas();
    MatriculaAsignaturaDTO guardar(MatriculaAsignatura matricula);
    List<Integer> getAsignaturaIdsByAlumno(Integer alumnoId);
    List<Integer> getAlumnoIdsByAsignatura(Integer asignaturaId);
}