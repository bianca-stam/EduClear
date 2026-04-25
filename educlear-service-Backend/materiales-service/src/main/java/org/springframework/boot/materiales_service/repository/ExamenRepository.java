package org.springframework.boot.materiales_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.boot.materiales_service.model.Examen;

public interface ExamenRepository extends JpaRepository<Examen, Integer> {
}
