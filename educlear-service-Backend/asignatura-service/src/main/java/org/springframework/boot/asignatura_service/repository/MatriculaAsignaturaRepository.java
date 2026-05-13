package org.springframework.boot.asignatura_service.repository;

import org.springframework.boot.asignatura_service.model.MatriculaAsignatura;
import org.springframework.boot.asignatura_service.model.MatriculaAsignaturaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatriculaAsignaturaRepository extends JpaRepository<MatriculaAsignatura, MatriculaAsignaturaId> {

    List<MatriculaAsignatura> findByAlumnoId(Integer alumnoId);
}