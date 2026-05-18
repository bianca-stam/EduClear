package org.springframework.boot.asignatura_service.service;

import org.springframework.boot.asignatura_service.dto.AsignaturaDTO;
import org.springframework.boot.asignatura_service.dto.MatriculaAsignaturaDTO;
import org.springframework.boot.asignatura_service.dto.UpdateAsignaturaDTO;
import org.springframework.boot.asignatura_service.dto.UpdateAsignaturaDTO;
import org.springframework.boot.asignatura_service.dto.AsignaturaDetalleDTO;
import org.springframework.boot.asignatura_service.model.Asignatura;

import java.util.List;

public interface AsignaturaService {
    List<AsignaturaDTO> findAll();

    AsignaturaDTO findById(Integer id);

    AsignaturaDTO save(Asignatura asignatura);

    AsignaturaDTO update(Integer id, UpdateAsignaturaDTO dto);

    void delete(Integer id);

    List<Integer> obtenerCursoIdsPorProfesor(Integer profesorId);

    List<Integer> obtenerCursoIdsPorAlumno(Integer alumnoId);

    List<AsignaturaDTO> findByCursoId(Integer cursoId);

    Long contarAlumnosMatriculados(Integer asignaturaId);

    List<AsignaturaDTO> findByAlumnoId(Integer alumnoId);

    List<AsignaturaDetalleDTO> findDetallesByCursoId(Integer cursoId);

    // Matricula a un usuario en todas las asignaturas de un curso
    List<MatriculaAsignaturaDTO> matricularEnCurso(Integer cursoId, Integer usuarioId);
}
