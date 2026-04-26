package org.springframework.boot.materiales_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.boot.materiales_service.model.IntentoExamen;

import java.util.List;

public interface IntentoExamenRepository extends JpaRepository<IntentoExamen, Integer> {
    List<IntentoExamen> findByExamenIdInAndAlumnoId(List<Integer> examenIds, Integer alumnoId);
}
