package org.springframework.boot.asignatura_service.repository;

import org.springframework.boot.asignatura_service.model.Asignatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AsignaturaRepository extends JpaRepository<Asignatura, Integer> {
    @Query("""
            SELECT DISTINCT a.cursoId
            FROM Asignatura a
            WHERE a.profesorId = :profesorId
            """)
    List<Integer> findCursoIdsByProfesorId(Integer profesorId);

    List<Asignatura> findByCursoId(Integer cursoId);

    List<Asignatura> findByCursoIdIn(List<Integer> cursoIds);
}
