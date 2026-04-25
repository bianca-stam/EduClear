package org.example.cursoservice.service;

import org.example.cursoservice.dto.CreateCursoDto;
import org.example.cursoservice.dto.CursoDto;
import org.example.cursoservice.model.Curso;

import java.util.List;

public interface CursoService {
    List<CursoDto> findAll();
    CursoDto findById(Integer id);
    CursoDto save(CreateCursoDto curso);
    void delete(Integer id);

    // Cursos que imparte un profesor
    List<CursoDto> findCursosByProfesor(Integer profesorId);

    // Cursos en los que está matriculado un alumno
    List<CursoDto> findCursosByAlumno(Integer alumnoId);

}
