package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.dto.tema.request.CreateTemaDTO;
import org.springframework.boot.materiales_service.dto.tema.request.UpdateTemaDTO;
import org.springframework.boot.materiales_service.dto.tema.response.TemaDTO;

import java.util.List;

public interface TemaService {
    List<TemaDTO> findAll();
    TemaDTO findById(Integer id);
    TemaDTO save(CreateTemaDTO tema);
    TemaDTO update(Integer id, UpdateTemaDTO tema);
    void delete(Integer id);
}
