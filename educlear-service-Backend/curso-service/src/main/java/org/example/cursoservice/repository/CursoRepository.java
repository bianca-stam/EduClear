package org.example.cursoservice.repository;

import org.example.cursoservice.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CursoRepository extends JpaRepository<Curso,Integer> {
    List<Curso> findByIdIn(List<Integer> ids);

}
