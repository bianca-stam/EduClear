package org.springframework.boot.asignatura_service.repository;

import org.springframework.boot.asignatura_service.model.Asignatura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AsignaturaRepository extends JpaRepository<Asignatura,Integer> {
}
