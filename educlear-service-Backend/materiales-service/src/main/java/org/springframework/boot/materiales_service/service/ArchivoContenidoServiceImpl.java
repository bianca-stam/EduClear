package org.springframework.boot.materiales_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.archivos.ArchivoContenidoDTO;
import org.springframework.boot.materiales_service.dto.archivos.CreateArchivoContenidoDTO;
import org.springframework.boot.materiales_service.dto.archivos.UpdateArchivoContenidoDTO;
import org.springframework.boot.materiales_service.model.ArchivoContenido;
import org.springframework.boot.materiales_service.repository.ArchivoContenidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArchivoContenidoServiceImpl implements ArchivoContenidoService {

    @Autowired
    private ArchivoContenidoRepository archivoContenidoRepository;

    @Override
    public List<ArchivoContenidoDTO> findAll() {
        return archivoContenidoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ArchivoContenidoDTO findById(Integer id) {
        return archivoContenidoRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public ArchivoContenidoDTO save(CreateArchivoContenidoDTO archivoContenidoDto) {
        ArchivoContenido archivoContenido = convertToEntity(archivoContenidoDto);
        ArchivoContenido guardado = archivoContenidoRepository.save(archivoContenido);
        return convertToDTO(guardado);
    }

    @Override
    public ArchivoContenidoDTO update(Integer id, UpdateArchivoContenidoDTO archivoContenidoDto) {
        return archivoContenidoRepository.findById(id)
                .map(archivoContenido -> {
                    if (archivoContenidoDto.getTemaId() != null) {
                        archivoContenido.setTemaId(archivoContenidoDto.getTemaId());
                    }
                    if (archivoContenidoDto.getNombreArchivo() != null) {
                        archivoContenido.setNombreArchivo(archivoContenidoDto.getNombreArchivo());
                    }
                    if (archivoContenidoDto.getTipoMime() != null) {
                        archivoContenido.setTipoMime(archivoContenidoDto.getTipoMime());
                    }
                    if (archivoContenidoDto.getPesoBytes() != null) {
                        archivoContenido.setPesoBytes(archivoContenidoDto.getPesoBytes());
                    }
                    if (archivoContenidoDto.getArchivoBlob() != null) {
                        archivoContenido.setArchivoBlob(archivoContenidoDto.getArchivoBlob());
                    }
                    return convertToDTO(archivoContenidoRepository.save(archivoContenido));
                })
                .orElse(null);
    }

    @Override
    public void delete(Integer id) {
        archivoContenidoRepository.deleteById(id);
    }

    private ArchivoContenidoDTO convertToDTO(ArchivoContenido archivoContenido) {
        ArchivoContenidoDTO dto = new ArchivoContenidoDTO();
        dto.setId(archivoContenido.getId());
        dto.setTemaId(archivoContenido.getTemaId());
        dto.setNombreArchivo(archivoContenido.getNombreArchivo());
        dto.setTipoMime(archivoContenido.getTipoMime());
        dto.setPesoBytes(archivoContenido.getPesoBytes());
        dto.setArchivoBlob(archivoContenido.getArchivoBlob());
        return dto;
    }

    private ArchivoContenido convertToEntity(CreateArchivoContenidoDTO dto) {
        ArchivoContenido archivoContenido = new ArchivoContenido();
        archivoContenido.setTemaId(dto.getTemaId());
        archivoContenido.setNombreArchivo(dto.getNombreArchivo());
        archivoContenido.setTipoMime(dto.getTipoMime());
        archivoContenido.setPesoBytes(dto.getPesoBytes());
        archivoContenido.setArchivoBlob(dto.getArchivoBlob());
        return archivoContenido;
    }
}
