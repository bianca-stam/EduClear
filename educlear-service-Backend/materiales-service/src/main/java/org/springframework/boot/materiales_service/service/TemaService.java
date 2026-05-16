package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.dto.tema.CreateTemaDTO;
import org.springframework.boot.materiales_service.dto.tema.PromedioTemaDTO;
import org.springframework.boot.materiales_service.dto.tema.TemaDTO;
import org.springframework.boot.materiales_service.dto.tema.UpdateTemaDTO;

import java.util.List;

public interface TemaService {
    TemaDTO create(CreateTemaDTO dto);

    TemaDTO findById(Integer id);

    List<TemaDTO> findAll();

    TemaDTO update(Integer id, UpdateTemaDTO dto);

    void delete(Integer id);

    List<PromedioTemaDTO> getPromediosPorAlumno(Integer alumnoId);

    List<PromedioTemaDTO> getPromediosPorAlumnoYAsignatura(Integer alumnoId, Integer asignaturaId);

    List<TemaDTO> findByAsignaturaId(Integer asignaturaId);
}
