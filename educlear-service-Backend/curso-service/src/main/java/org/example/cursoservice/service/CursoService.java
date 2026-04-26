package org.example.cursoservice.service;

import org.example.cursoservice.dto.CreateCursoDto;
import org.example.cursoservice.dto.CursoDto;

import java.util.List;

public interface CursoService {
    List<CursoDto> findAll();

    CursoDto findById(Integer id);

    CursoDto save(CreateCursoDto curso);

    void delete(Integer id);

    List<CursoDto> findByIds(List<Integer> ids);

    List<CursoDto> findCursosByProfesor(Integer profesorId);

    List<CursoDto> findCursosByAlumno(Integer alumnoId);

}
