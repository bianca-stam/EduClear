package org.springframework.boot.asignatura_service.service;

import org.springframework.boot.asignatura_service.dto.AsignaturaDTO;
import org.springframework.boot.asignatura_service.model.Asignatura;

import java.util.List;

public interface AsignaturaService {
    List<AsignaturaDTO> findAll();
    AsignaturaDTO findById(Integer id);
    AsignaturaDTO save(Asignatura asignatura);
    List<Integer> obtenerCursoIdsPorProfesor(Integer profesorId);
    List<Integer> obtenerCursoIdsPorAlumno(Integer alumnoId);
    List<AsignaturaDTO> findByCursoId(Integer cursoId);
    Long contarAlumnosMatriculados(Integer asignaturaId);
}
