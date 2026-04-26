package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.dto.tema.CreateTemaDTO;
import org.springframework.boot.materiales_service.dto.tema.TemaDTO;
import org.springframework.boot.materiales_service.dto.tema.UpdateTemaDTO;
import org.springframework.boot.materiales_service.model.Tema;
import org.springframework.boot.materiales_service.repository.TemaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TemaServiceImpl implements TemaService{

    private final TemaRepository temaRepository;

    public TemaServiceImpl(TemaRepository temaRepository) {
        this.temaRepository = temaRepository;
    }

    @Override
    public TemaDTO create(CreateTemaDTO dto) {

        Tema tema = new Tema();
        tema.setTitulo(dto.getTitulo());
        tema.setDescripcion(dto.getDescripcion());
        tema.setAsignaturaId(dto.getAsignaturaId());

        Tema guardado = temaRepository.save(tema);

        return toDTO(guardado);
    }

    @Override
    public TemaDTO findById(Integer id) {

        Tema tema = temaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tema no encontrado"));

        return toDTO(tema);
    }

    @Override
    public List<TemaDTO> findAll() {

        return temaRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TemaDTO update(Integer id, UpdateTemaDTO dto) {

        Tema tema = temaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tema no encontrado"));

        if (dto.getTitulo() != null) {
            tema.setTitulo(dto.getTitulo());
        }

        if (dto.getDescripcion() != null) {
            tema.setDescripcion(dto.getDescripcion());
        }

        Tema actualizado = temaRepository.save(tema);

        return toDTO(actualizado);
    }

    @Override
    public void delete(Integer id) {

        if (!temaRepository.existsById(id)) {
            throw new RuntimeException("Tema no encontrado");
        }

        temaRepository.deleteById(id);
    }


    // ===== MAPPER =====
    private TemaDTO toDTO(Tema tema) {

        TemaDTO dto = new TemaDTO();
        dto.setId(tema.getId());
        dto.setTitulo(tema.getTitulo());
        dto.setDescripcion(tema.getDescripcion());
        dto.setAsignaturaId(tema.getAsignaturaId());

        return dto;
    }


}
