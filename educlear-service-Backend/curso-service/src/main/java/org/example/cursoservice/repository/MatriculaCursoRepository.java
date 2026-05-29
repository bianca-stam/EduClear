package org.example.cursoservice.repository;

import org.example.cursoservice.model.MatriculaCurso;
import org.example.cursoservice.model.MatriculaCursoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatriculaCursoRepository extends JpaRepository<MatriculaCurso, MatriculaCursoId> {

    List<MatriculaCurso> findByAlumnoId(Integer alumnoId);

    List<MatriculaCurso> findByCursoId(Integer cursoId);
}
