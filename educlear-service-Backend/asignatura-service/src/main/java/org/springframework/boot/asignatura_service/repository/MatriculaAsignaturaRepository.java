package org.springframework.boot.asignatura_service.repository;

import org.springframework.boot.asignatura_service.model.MatriculaAsignatura;
import org.springframework.boot.asignatura_service.model.MatriculaAsignaturaId;
// Asegúrate de importar la clase MatriculaAsignaturaId si la pusiste en otro archivo, 
// o dejarla en el mismo paquete.
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatriculaAsignaturaRepository extends JpaRepository<MatriculaAsignatura, MatriculaAsignaturaId> {
}