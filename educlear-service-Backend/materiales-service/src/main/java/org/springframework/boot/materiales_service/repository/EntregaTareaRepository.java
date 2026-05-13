package org.springframework.boot.materiales_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.boot.materiales_service.model.EntregaTarea;

import java.util.List;

public interface EntregaTareaRepository extends JpaRepository<EntregaTarea, Integer> {
    List<EntregaTarea> findByTareaIdInAndAlumnoId(List<Integer> tareaIds, Integer alumnoId);
    boolean existsByAlumnoIdAndTareaId(Integer alumnoId, Integer tareaId);
}
