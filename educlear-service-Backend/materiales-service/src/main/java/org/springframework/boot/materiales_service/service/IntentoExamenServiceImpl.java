package org.springframework.boot.materiales_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.intentoExamen.request.CreateIntentoExamenDTO;
import org.springframework.boot.materiales_service.dto.intentoExamen.request.UpdateIntentoExamenDTO;
import org.springframework.boot.materiales_service.dto.intentoExamen.response.IntentoExamenDTO;
import org.springframework.boot.materiales_service.model.IntentoExamen;
import org.springframework.boot.materiales_service.repository.IntentoExamenRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IntentoExamenServiceImpl implements IntentoExamenService {

    @Autowired
    private IntentoExamenRepository intentoExamenRepository;

    @Override
    public List<IntentoExamenDTO> findAll() {
        return intentoExamenRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public IntentoExamenDTO findById(Integer id) {
        return intentoExamenRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public IntentoExamenDTO save(CreateIntentoExamenDTO intentoExamenDto) {
        IntentoExamen intentoExamen = convertToEntity(intentoExamenDto);
        IntentoExamen guardado = intentoExamenRepository.save(intentoExamen);
        return convertToDTO(guardado);
    }

    @Override
    public IntentoExamenDTO update(Integer id, UpdateIntentoExamenDTO intentoExamenDto) {
        return intentoExamenRepository.findById(id)
                .map(intentoExamen -> {
                    if (intentoExamenDto.getExamenId() != null) {
                        intentoExamen.setExamenId(intentoExamenDto.getExamenId());
                    }
                    if (intentoExamenDto.getAlumnoId() != null) {
                        intentoExamen.setAlumnoId(intentoExamenDto.getAlumnoId());
                    }
                    if (intentoExamenDto.getFechaInicio() != null) {
                        intentoExamen.setFechaInicio(intentoExamenDto.getFechaInicio());
                    }
                    if (intentoExamenDto.getFechaEnvio() != null) {
                        intentoExamen.setFechaEnvio(intentoExamenDto.getFechaEnvio());
                    }
                    if (intentoExamenDto.getCalificacionFinal() != null) {
                        intentoExamen.setCalificacionFinal(intentoExamenDto.getCalificacionFinal());
                    }
                    if (intentoExamenDto.getEstado() != null) {
                        intentoExamen.setEstado(intentoExamenDto.getEstado());
                    }
                    return convertToDTO(intentoExamenRepository.save(intentoExamen));
                })
                .orElse(null);
    }

    public void delete(Integer id) {
        intentoExamenRepository.deleteById(id);
    }

    @Override
    public boolean existsByAlumnoIdAndExamenId(Integer alumnoId, Integer examenId) {
        return intentoExamenRepository.existsByAlumnoIdAndExamenId(alumnoId, examenId);
    }

    private IntentoExamenDTO convertToDTO(IntentoExamen intentoExamen) {
        IntentoExamenDTO dto = new IntentoExamenDTO();
        dto.setId(intentoExamen.getId());
        dto.setExamenId(intentoExamen.getExamenId());
        dto.setAlumnoId(intentoExamen.getAlumnoId());
        dto.setFechaInicio(intentoExamen.getFechaInicio());
        dto.setFechaEnvio(intentoExamen.getFechaEnvio());
        dto.setCalificacionFinal(intentoExamen.getCalificacionFinal());
        dto.setEstado(intentoExamen.getEstado());
        return dto;
    }

    private IntentoExamen convertToEntity(CreateIntentoExamenDTO dto) {
        IntentoExamen intentoExamen = new IntentoExamen();
        intentoExamen.setExamenId(dto.getExamenId());
        intentoExamen.setAlumnoId(dto.getAlumnoId());
        intentoExamen.setFechaInicio(dto.getFechaInicio());
        intentoExamen.setFechaEnvio(dto.getFechaEnvio());
        intentoExamen.setCalificacionFinal(dto.getCalificacionFinal());
        intentoExamen.setEstado(dto.getEstado());
        return intentoExamen;
    }
}
