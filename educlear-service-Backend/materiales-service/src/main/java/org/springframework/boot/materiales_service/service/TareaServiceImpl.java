package org.springframework.boot.materiales_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.tarea.request.CreateTareaDTO;
import org.springframework.boot.materiales_service.dto.tarea.request.UpdateTareaDTO;
import org.springframework.boot.materiales_service.dto.tarea.response.TareaDTO;
import org.springframework.boot.materiales_service.model.Tarea;
import org.springframework.boot.materiales_service.repository.TareaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TareaServiceImpl implements TareaService {

    @Autowired
    private TareaRepository tareaRepository;

    @Override
    public List<TareaDTO> findAll() {
        return tareaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TareaDTO findById(Integer id) {
        return tareaRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public TareaDTO save(CreateTareaDTO tareaDto) {
        Tarea tarea = convertToEntity(tareaDto);
        Tarea guardada = tareaRepository.save(tarea);
        return convertToDTO(guardada);
    }

    @Override
    public TareaDTO update(Integer id, UpdateTareaDTO tareaDto) {
        return tareaRepository.findById(id)
                .map(tarea -> {
                    if (tareaDto.getTemaId() != null) {
                        tarea.setTemaId(tareaDto.getTemaId());
                    }
                    if (tareaDto.getTitulo() != null) {
                        tarea.setTitulo(tareaDto.getTitulo());
                    }
                    if (tareaDto.getDescripcion() != null) {
                        tarea.setDescripcion(tareaDto.getDescripcion());
                    }
                    if (tareaDto.getFechaApertura() != null) {
                        tarea.setFechaApertura(tareaDto.getFechaApertura());
                    }
                    if (tareaDto.getFechaCierre() != null) {
                        tarea.setFechaCierre(tareaDto.getFechaCierre());
                    }
                    return convertToDTO(tareaRepository.save(tarea));
                })
                .orElse(null);
    }

    public void delete(Integer id) {
        tareaRepository.deleteById(id);
    }

    @Override
    public List<TareaDTO> findByTemaId(Integer temaId) {
        return tareaRepository.findByTemaId(temaId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TareaDTO convertToDTO(Tarea tarea) {
        TareaDTO dto = new TareaDTO();
        dto.setId(tarea.getId());
        dto.setTemaId(tarea.getTemaId());
        dto.setTitulo(tarea.getTitulo());
        dto.setDescripcion(tarea.getDescripcion());
        dto.setFechaApertura(tarea.getFechaApertura());
        dto.setFechaCierre(tarea.getFechaCierre());
        return dto;
    }

    private Tarea convertToEntity(CreateTareaDTO dto) {
        Tarea tarea = new Tarea();
        tarea.setTemaId(dto.getTemaId());
        tarea.setTitulo(dto.getTitulo());
        tarea.setDescripcion(dto.getDescripcion());
        tarea.setFechaApertura(dto.getFechaApertura());
        tarea.setFechaCierre(dto.getFechaCierre());
        return tarea;
    }
}
