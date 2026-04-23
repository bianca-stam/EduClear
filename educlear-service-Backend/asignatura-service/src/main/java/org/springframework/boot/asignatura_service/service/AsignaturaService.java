package org.springframework.boot.asignatura_service.service;

import org.springframework.boot.asignatura_service.dto.AsignaturaDTO;
import org.springframework.boot.asignatura_service.model.Asignatura;

import java.util.List;

public interface AsignaturaService {
    List<AsignaturaDTO> findAll();
    AsignaturaDTO findById(Integer id);
    AsignaturaDTO save(Asignatura asignatura);
}
