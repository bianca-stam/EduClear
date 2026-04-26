package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.dto.pregunta.request.CreatePreguntaDTO;
import org.springframework.boot.materiales_service.dto.pregunta.request.UpdatePreguntaDTO;
import org.springframework.boot.materiales_service.dto.pregunta.response.PreguntaDTO;

import java.util.List;

public interface PreguntaService {
    List<PreguntaDTO> findAll();
    PreguntaDTO findById(Integer id);
    PreguntaDTO save(CreatePreguntaDTO pregunta);
    PreguntaDTO update(Integer id, UpdatePreguntaDTO pregunta);
    void delete(Integer id);
}
