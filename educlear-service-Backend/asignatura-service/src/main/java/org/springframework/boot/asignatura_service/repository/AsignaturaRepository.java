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

    @Query("""
            SELECT DISTINCT a.cursoId
            FROM Asignatura a
            JOIN MatriculaAsignatura m ON a.id = m.asignaturaId
            WHERE m.alumnoId = :alumnoId
            """)
    List<Integer> findCursoIdsByAlumnoId(Integer alumnoId);
}
