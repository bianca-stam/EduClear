package org.example.cursoservice.service;

import org.example.cursoservice.dto.CursoDto;
import org.example.cursoservice.model.Curso;

import java.util.List;

public interface CursoService {
    List<CursoDto> findAll();
    CursoDto findById(Integer id);
    CursoDto save(Curso curso);

}
