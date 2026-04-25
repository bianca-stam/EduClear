package org.springframework.boot.materiales_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.boot.materiales_service.model.EntregaTarea;

public interface EntregaTareaRepository extends JpaRepository<EntregaTarea, Integer> {
}
