package org.springframework.boot.materiales_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.pregunta.request.CreatePreguntaDTO;
import org.springframework.boot.materiales_service.dto.pregunta.request.UpdatePreguntaDTO;
import org.springframework.boot.materiales_service.dto.pregunta.response.PreguntaDTO;
import org.springframework.boot.materiales_service.model.Pregunta;
import org.springframework.boot.materiales_service.repository.PreguntaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PreguntaServiceImpl implements PreguntaService {

    @Autowired
    private PreguntaRepository preguntaRepository;

    @Override
    public List<PreguntaDTO> findAll() {
        return preguntaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PreguntaDTO findById(Integer id) {
        return preguntaRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public PreguntaDTO save(CreatePreguntaDTO preguntaDto) {
        Pregunta pregunta = convertToEntity(preguntaDto);
        Pregunta guardada = preguntaRepository.save(pregunta);
        return convertToDTO(guardada);
    }

    @Override
    public PreguntaDTO update(Integer id, UpdatePreguntaDTO preguntaDto) {
        return preguntaRepository.findById(id)
                .map(pregunta -> {
                    if (preguntaDto.getExamenId() != null) {
                        pregunta.setExamenId(preguntaDto.getExamenId());
                    }
                    if (preguntaDto.getTextoPregunta() != null) {
                        pregunta.setTextoPregunta(preguntaDto.getTextoPregunta());
                    }
                    if (preguntaDto.getOpcionA() != null) {
                        pregunta.setOpcionA(preguntaDto.getOpcionA());
                    }
                    if (preguntaDto.getOpcionB() != null) {
                        pregunta.setOpcionB(preguntaDto.getOpcionB());
                    }
                    if (preguntaDto.getOpcionC() != null) {
                        pregunta.setOpcionC(preguntaDto.getOpcionC());
                    }
                    if (preguntaDto.getOpcionD() != null) {
                        pregunta.setOpcionD(preguntaDto.getOpcionD());
                    }
                    if (preguntaDto.getRespuestaCorrecta() != null) {
                        pregunta.setRespuestaCorrecta(preguntaDto.getRespuestaCorrecta());
                    }
                    return convertToDTO(preguntaRepository.save(pregunta));
                })
                .orElse(null);
    }

    @Override
    public void delete(Integer id) {
        preguntaRepository.deleteById(id);
    }

    @Override
    public List<PreguntaDTO> findByExamenId(Integer examenId) {
        return preguntaRepository.findByExamenId(examenId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private PreguntaDTO convertToDTO(Pregunta pregunta) {
        PreguntaDTO dto = new PreguntaDTO();
        dto.setId(pregunta.getId());
        dto.setExamenId(pregunta.getExamenId());
        dto.setTextoPregunta(pregunta.getTextoPregunta());
        dto.setOpcionA(pregunta.getOpcionA());
        dto.setOpcionB(pregunta.getOpcionB());
        dto.setOpcionC(pregunta.getOpcionC());
        dto.setOpcionD(pregunta.getOpcionD());
        dto.setRespuestaCorrecta(pregunta.getRespuestaCorrecta());
        return dto;
    }

    private Pregunta convertToEntity(CreatePreguntaDTO dto) {
        Pregunta pregunta = new Pregunta();
        pregunta.setExamenId(dto.getExamenId());
        pregunta.setTextoPregunta(dto.getTextoPregunta());
        pregunta.setOpcionA(dto.getOpcionA());
        pregunta.setOpcionB(dto.getOpcionB());
        pregunta.setOpcionC(dto.getOpcionC());
        pregunta.setOpcionD(dto.getOpcionD());
        pregunta.setRespuestaCorrecta(dto.getRespuestaCorrecta());
        return pregunta;
    }
}
