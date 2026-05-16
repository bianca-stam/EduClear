package org.springframework.boot.materiales_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.examen.request.CreateExamenDTO;
import org.springframework.boot.materiales_service.dto.examen.request.UpdateExamenDTO;
import org.springframework.boot.materiales_service.dto.examen.response.ExamenDTO;
import org.springframework.boot.materiales_service.model.Examen;
import org.springframework.boot.materiales_service.repository.ExamenRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExamenServiceImpl implements ExamenService {

    @Autowired
    private ExamenRepository examenRepository;

    @Override
    public List<ExamenDTO> findAll() {
        return examenRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ExamenDTO findById(Integer id) {
        return examenRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public ExamenDTO save(CreateExamenDTO examenDto) {
        Examen examen = convertToEntity(examenDto);
        Examen guardado = examenRepository.save(examen);
        return convertToDTO(guardado);
    }

    @Override
    public ExamenDTO update(Integer id, UpdateExamenDTO examenDto) {
        return examenRepository.findById(id)
                .map(examen -> {
                    if (examenDto.getTemaId() != null) {
                        examen.setTemaId(examenDto.getTemaId());
                    }
                    if (examenDto.getTitulo() != null) {
                        examen.setTitulo(examenDto.getTitulo());
                    }
                    if (examenDto.getDescripcion() != null) {
                        examen.setDescripcion(examenDto.getDescripcion());
                    }
                    if (examenDto.getFechaApertura() != null) {
                        examen.setFechaApertura(examenDto.getFechaApertura());
                    }
                    if (examenDto.getFechaCierre() != null) {
                        examen.setFechaCierre(examenDto.getFechaCierre());
                    }
                    return convertToDTO(examenRepository.save(examen));
                })
                .orElse(null);
    }

    @Override
    public void delete(Integer id) {
        examenRepository.deleteById(id);
    }

    @Override
    public List<ExamenDTO> findByTemaId(Integer temaId) {
        return examenRepository.findByTemaId(temaId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ExamenDTO convertToDTO(Examen examen) {
        ExamenDTO dto = new ExamenDTO();
        dto.setId(examen.getId());
        dto.setTemaId(examen.getTemaId());
        dto.setTitulo(examen.getTitulo());
        dto.setDescripcion(examen.getDescripcion());
        dto.setFechaApertura(examen.getFechaApertura());
        dto.setFechaCierre(examen.getFechaCierre());
        return dto;
    }

    private Examen convertToEntity(CreateExamenDTO dto) {
        Examen examen = new Examen();
        examen.setTemaId(dto.getTemaId());
        examen.setTitulo(dto.getTitulo());
        examen.setDescripcion(dto.getDescripcion());
        examen.setFechaApertura(dto.getFechaApertura());
        examen.setFechaCierre(dto.getFechaCierre());
        return examen;
    }
}
