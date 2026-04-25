package org.springframework.boot.materiales_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.tema.request.CreateTemaDTO;
import org.springframework.boot.materiales_service.dto.tema.request.UpdateTemaDTO;
import org.springframework.boot.materiales_service.dto.tema.response.TemaDTO;
import org.springframework.boot.materiales_service.model.Tema;
import org.springframework.boot.materiales_service.repository.TemaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TemaServiceImpl implements TemaService {

    @Autowired
    private TemaRepository temaRepository;

    @Override
    public List<TemaDTO> findAll() {
        return temaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TemaDTO findById(Integer id) {
        return temaRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public TemaDTO save(CreateTemaDTO temaDto) {
        Tema tema = convertToEntity(temaDto);
        Tema guardado = temaRepository.save(tema);
        return convertToDTO(guardado);
    }

    @Override
    public TemaDTO update(Integer id, UpdateTemaDTO temaDto) {
        return temaRepository.findById(id)
                .map(tema -> {
                    if (temaDto.getTitulo() != null) {
                        tema.setTitulo(temaDto.getTitulo());
                    }
                    if (temaDto.getDescripcion() != null) {
                        tema.setDescripcion(temaDto.getDescripcion());
                    }
                    if (temaDto.getAsignaturaId() != null) {
                        tema.setAsignaturaId(temaDto.getAsignaturaId());
                    }
                    return convertToDTO(temaRepository.save(tema));
                })
                .orElse(null);
    }

    @Override
    public void delete(Integer id) {
        temaRepository.deleteById(id);
    }

    private TemaDTO convertToDTO(Tema tema) {
        TemaDTO dto = new TemaDTO();
        dto.setId(tema.getId());
        dto.setTitulo(tema.getTitulo());
        dto.setDescripcion(tema.getDescripcion());
        dto.setAsignaturaId(tema.getAsignaturaId());
        return dto;
    }

    private Tema convertToEntity(CreateTemaDTO dto) {
        Tema tema = new Tema();
        tema.setTitulo(dto.getTitulo());
        tema.setDescripcion(dto.getDescripcion());
        tema.setAsignaturaId(dto.getAsignaturaId());
        return tema;
    }
}
