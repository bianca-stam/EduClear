package org.example.cursoservice.service;

import org.example.cursoservice.dto.CreateCursoDto;
import org.example.cursoservice.dto.CursoDto;
import org.example.cursoservice.model.Curso;
import org.example.cursoservice.repository.CursoRepository;
import org.example.cursoservice.client.AsignaturaClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CursoServiceImpl implements CursoService {
    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private AsignaturaClient asignaturaClient;

    @Override
    public List<CursoDto> findAll() {
        return cursoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    @Override
    public CursoDto findById(Integer id) {
        return cursoRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public CursoDto save(CreateCursoDto cursoDto) {
        Curso curso = convertToEntity(cursoDto);
        Curso guardado = cursoRepository.save(curso);
        return convertToDTO(guardado);
    }

    @Override
    public void delete(Integer id) {
        cursoRepository.deleteById(id);
    }

    @Override
    public List<CursoDto> findByIds(List<Integer> ids) {
        if (ids == null || ids.isEmpty()) return List.of();
        return cursoRepository.findByIdIn(ids)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CursoDto> findCursosByProfesor(Integer profesorId) {
        List<Integer> cursoIds = asignaturaClient.obtenerCursoIdsPorProfesor(profesorId);
        return findByIds(cursoIds);
    }

    @Override
    public List<CursoDto> findCursosByAlumno(Integer alumnoId) {
        List<Integer> cursoIds = asignaturaClient.obtenerCursoIdsPorAlumno(alumnoId);
        return findByIds(cursoIds);
    }

    private CursoDto convertToDTO(Curso curso) {
        CursoDto dto = new CursoDto();
        dto.setId(curso.getId());
        dto.setNombre(curso.getNombre());
        dto.setDescripcion(curso.getDescripcion());
        return dto;
    }

    private Curso convertToEntity(CreateCursoDto dto) {
        Curso curso = new Curso();
        curso.setNombre(dto.getNombre());
        curso.setDescripcion(dto.getDescripcion());
        return curso;
    }


}
