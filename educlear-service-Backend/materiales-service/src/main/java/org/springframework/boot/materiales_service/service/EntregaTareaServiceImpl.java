package org.springframework.boot.materiales_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.entregaTarea.request.CreateEntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.request.UpdateEntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.response.EntregaTareaDTO;
import org.springframework.boot.materiales_service.model.EntregaTarea;
import org.springframework.boot.materiales_service.repository.EntregaTareaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EntregaTareaServiceImpl implements EntregaTareaService {

    @Autowired
    private EntregaTareaRepository entregaTareaRepository;

    @Override
    public List<EntregaTareaDTO> findAll() {
        return entregaTareaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EntregaTareaDTO findById(Integer id) {
        return entregaTareaRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public EntregaTareaDTO save(CreateEntregaTareaDTO entregaTareaDto) {
        EntregaTarea entregaTarea = convertToEntity(entregaTareaDto);
        EntregaTarea guardada = entregaTareaRepository.save(entregaTarea);
        return convertToDTO(guardada);
    }

    @Override
    public EntregaTareaDTO update(Integer id, UpdateEntregaTareaDTO entregaTareaDto) {
        return entregaTareaRepository.findById(id)
                .map(entregaTarea -> {
                    if (entregaTareaDto.getTareaId() != null) {
                        entregaTarea.setTareaId(entregaTareaDto.getTareaId());
                    }
                    if (entregaTareaDto.getAlumnoId() != null) {
                        entregaTarea.setAlumnoId(entregaTareaDto.getAlumnoId());
                    }
                    if (entregaTareaDto.getEstadoEntrega() != null) {
                        entregaTarea.setEstadoEntrega(entregaTareaDto.getEstadoEntrega());
                    }
                    if (entregaTareaDto.getCalificacion() != null) {
                        entregaTarea.setCalificacion(entregaTareaDto.getCalificacion());
                    }
                    return convertToDTO(entregaTareaRepository.save(entregaTarea));
                })
                .orElse(null);
    }

    @Override
    public void delete(Integer id) {
        entregaTareaRepository.deleteById(id);
    }

    private EntregaTareaDTO convertToDTO(EntregaTarea entregaTarea) {
        EntregaTareaDTO dto = new EntregaTareaDTO();
        dto.setId(entregaTarea.getId());
        dto.setTareaId(entregaTarea.getTareaId());
        dto.setAlumnoId(entregaTarea.getAlumnoId());
        dto.setEstadoEntrega(entregaTarea.getEstadoEntrega());
        dto.setCalificacion(entregaTarea.getCalificacion());
        return dto;
    }

    private EntregaTarea convertToEntity(CreateEntregaTareaDTO dto) {
        EntregaTarea entregaTarea = new EntregaTarea();
        entregaTarea.setTareaId(dto.getTareaId());
        entregaTarea.setAlumnoId(dto.getAlumnoId());
        entregaTarea.setEstadoEntrega(dto.getEstadoEntrega());
        entregaTarea.setCalificacion(dto.getCalificacion());
        return entregaTarea;
    }
}
