package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.dto.entregaTarea.request.CreateEntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.request.UpdateEntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.response.EntregaTareaDTO;

import java.util.List;

public interface EntregaTareaService {
    List<EntregaTareaDTO> findAll();
    EntregaTareaDTO findById(Integer id);
    EntregaTareaDTO save(CreateEntregaTareaDTO entregaTarea);
    EntregaTareaDTO update(Integer id, UpdateEntregaTareaDTO entregaTarea);
    void delete(Integer id);
    boolean existsByAlumnoIdAndTareaId(Integer alumnoId, Integer tareaId);
}
