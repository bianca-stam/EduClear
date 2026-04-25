package org.example.cursoservice.repository;

import org.example.cursoservice.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CursoRepository extends JpaRepository<Curso,Integer> {
    @Query("""
        SELECT DISTINCT c
        FROM Curso c
        JOIN Asignatura a ON a.cursoId = c.id
        WHERE a.profesorId = :profesorId
    """)
    List<Curso> findCursosByProfesorId(Integer profesorId);

    @Query("""
        SELECT DISTINCT c
        FROM Curso c
        JOIN Asignatura a ON a.cursoId = c.id
        JOIN MatriculaAsignatura m ON m.asignaturaId = a.id
        WHERE m.alumnoId = :alumnoId
    """)
    List<Curso> findCursosByAlumnoId(Integer alumnoId);

}
