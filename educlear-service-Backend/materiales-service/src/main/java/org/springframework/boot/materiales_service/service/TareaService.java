package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.dto.tarea.request.CreateTareaDTO;
import org.springframework.boot.materiales_service.dto.tarea.request.UpdateTareaDTO;
import org.springframework.boot.materiales_service.dto.tarea.response.TareaDTO;

import java.util.List;

public interface TareaService {
    List<TareaDTO> findAll();
    TareaDTO findById(Integer id);
    TareaDTO save(CreateTareaDTO tarea);
    TareaDTO update(Integer id, UpdateTareaDTO tarea);
    void delete(Integer id);
}
