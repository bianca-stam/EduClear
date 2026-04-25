package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.dto.examen.request.CreateExamenDTO;
import org.springframework.boot.materiales_service.dto.examen.request.UpdateExamenDTO;
import org.springframework.boot.materiales_service.dto.examen.response.ExamenDTO;

import java.util.List;

public interface ExamenService {
    List<ExamenDTO> findAll();
    ExamenDTO findById(Integer id);
    ExamenDTO save(CreateExamenDTO examen);
    ExamenDTO update(Integer id, UpdateExamenDTO examen);
    void delete(Integer id);
}
