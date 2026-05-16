package org.springframework.boot.materiales_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.boot.materiales_service.model.Tarea;

import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Integer> {
    List<Tarea> findByTemaId(Integer temaId);
    List<Tarea> findByTemaIdIn(List<Integer> temaIds);
}
