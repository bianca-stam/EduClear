package org.springframework.boot.materiales_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.boot.materiales_service.model.EntregaTarea;

import java.util.List;
import java.util.Optional;

public interface EntregaTareaRepository extends JpaRepository<EntregaTarea, Integer> {
    List<EntregaTarea> findByTareaIdInAndAlumnoId(List<Integer> tareaIds, Integer alumnoId);
    boolean existsByAlumnoIdAndTareaId(Integer alumnoId, Integer tareaId);

    // Endpoint 1: todas las entregas de las tareas de una asignatura
    List<EntregaTarea> findByTareaIdIn(List<Integer> tareaIds);

    // Endpoint 2 y 3: entregas de una tarea específica
    List<EntregaTarea> findByTareaId(Integer tareaId);

    // Endpoint 3: entrega específica alumno+tarea
    Optional<EntregaTarea> findByTareaIdAndAlumnoId(Integer tareaId, Integer alumnoId);
}
