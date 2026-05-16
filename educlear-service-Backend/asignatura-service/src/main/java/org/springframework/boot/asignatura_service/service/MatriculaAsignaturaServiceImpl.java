package org.springframework.boot.asignatura_service.service;

import org.springframework.boot.asignatura_service.dto.MatriculaAsignaturaDTO;
import org.springframework.boot.asignatura_service.model.MatriculaAsignatura;
import org.springframework.boot.asignatura_service.repository.MatriculaAsignaturaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatriculaAsignaturaServiceImpl implements MatriculaAsignaturaService {

    private final MatriculaAsignaturaRepository repository;

    public MatriculaAsignaturaServiceImpl(MatriculaAsignaturaRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<MatriculaAsignaturaDTO> obtenerTodas() {
        return repository.findAll()
                .stream()
                .map(this::convertirADto)
                .collect(Collectors.toList());
    }

    @Override
    public MatriculaAsignaturaDTO guardar(MatriculaAsignatura matricula) {
        MatriculaAsignatura guardada = repository.save(matricula);
        return convertirADto(guardada);
    }

    private MatriculaAsignaturaDTO convertirADto(MatriculaAsignatura matricula) {
        MatriculaAsignaturaDTO dto = new MatriculaAsignaturaDTO();
        dto.setAsignaturaId(matricula.getAsignaturaId());
        dto.setAlumnoId(matricula.getAlumnoId());
        return dto;
    }

    @Override
    public List<Integer> getAsignaturaIdsByAlumno(Integer alumnoId) {
        return repository.findByAlumnoId(alumnoId)
                .stream()
                .map(MatriculaAsignatura::getAsignaturaId)
                .collect(Collectors.toList());
    }

    @Override
    public List<Integer> getAlumnoIdsByAsignatura(Integer asignaturaId) {
        return repository.findByAsignaturaId(asignaturaId)
                .stream()
                .map(MatriculaAsignatura::getAlumnoId)
                .collect(Collectors.toList());
    }
}