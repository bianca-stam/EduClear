package org.example.cursoservice.service;

import org.example.cursoservice.dto.CreateCursoDto;
import org.example.cursoservice.dto.CursoDto;
import org.example.cursoservice.dto.MatriculaCursoDTO;

import java.util.List;

public interface CursoService {
    List<CursoDto> findAll();

    CursoDto findById(Integer id);

    CursoDto save(CreateCursoDto curso);

    void delete(Integer id);

    List<CursoDto> findByIds(List<Integer> ids);

    List<CursoDto> findCursosByProfesor(Integer profesorId);

    List<CursoDto> findCursosByAlumno(Integer alumnoId);

    CursoDto update(Integer id, CreateCursoDto dto);

    // ── Matrícula de alumnos ────────────────────────────────────────
    MatriculaCursoDTO matricular(Integer cursoId, Integer alumnoId);

    void desmatricular(Integer cursoId, Integer alumnoId);

    List<Integer> getAlumnoIdsByCurso(Integer cursoId);

    List<Integer> getCursoIdsByAlumno(Integer alumnoId);
}
