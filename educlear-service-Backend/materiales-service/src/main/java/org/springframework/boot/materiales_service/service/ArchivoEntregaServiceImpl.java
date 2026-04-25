package org.springframework.boot.materiales_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.archivos.ArchivoEntregaDTO;
import org.springframework.boot.materiales_service.dto.archivos.CreateArchivoEntregaDTO;
import org.springframework.boot.materiales_service.dto.archivos.UpdateArchivoEntregaDTO;
import org.springframework.boot.materiales_service.model.ArchivoEntrega;
import org.springframework.boot.materiales_service.repository.ArchivoEntregaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArchivoEntregaServiceImpl implements ArchivoEntregaService {

    @Autowired
    private ArchivoEntregaRepository archivoEntregaRepository;

    @Override
    public List<ArchivoEntregaDTO> findAll() {
        return archivoEntregaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ArchivoEntregaDTO findById(Integer id) {
        return archivoEntregaRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public ArchivoEntregaDTO save(CreateArchivoEntregaDTO archivoEntregaDto) {
        ArchivoEntrega archivoEntrega = convertToEntity(archivoEntregaDto);
        ArchivoEntrega guardado = archivoEntregaRepository.save(archivoEntrega);
        return convertToDTO(guardado);
    }

    @Override
    public ArchivoEntregaDTO update(Integer id, UpdateArchivoEntregaDTO archivoEntregaDto) {
        return archivoEntregaRepository.findById(id)
                .map(archivoEntrega -> {
                    if (archivoEntregaDto.getEntregaId() != null) {
                        archivoEntrega.setEntregaId(archivoEntregaDto.getEntregaId());
                    }
                    if (archivoEntregaDto.getNombreArchivo() != null) {
                        archivoEntrega.setNombreArchivo(archivoEntregaDto.getNombreArchivo());
                    }
                    if (archivoEntregaDto.getTipoMime() != null) {
                        archivoEntrega.setTipoMime(archivoEntregaDto.getTipoMime());
                    }
                    if (archivoEntregaDto.getPesoBytes() != null) {
                        archivoEntrega.setPesoBytes(archivoEntregaDto.getPesoBytes());
                    }
                    if (archivoEntregaDto.getArchivoBlob() != null) {
                        archivoEntrega.setArchivoBlob(archivoEntregaDto.getArchivoBlob());
                    }
                    return convertToDTO(archivoEntregaRepository.save(archivoEntrega));
                })
                .orElse(null);
    }

    @Override
    public void delete(Integer id) {
        archivoEntregaRepository.deleteById(id);
    }

    private ArchivoEntregaDTO convertToDTO(ArchivoEntrega archivoEntrega) {
        ArchivoEntregaDTO dto = new ArchivoEntregaDTO();
        dto.setId(archivoEntrega.getId());
        dto.setEntregaId(archivoEntrega.getEntregaId());
        dto.setNombreArchivo(archivoEntrega.getNombreArchivo());
        dto.setTipoMime(archivoEntrega.getTipoMime());
        dto.setPesoBytes(archivoEntrega.getPesoBytes());
        dto.setArchivoBlob(archivoEntrega.getArchivoBlob());
        return dto;
    }

    private ArchivoEntrega convertToEntity(CreateArchivoEntregaDTO dto) {
        ArchivoEntrega archivoEntrega = new ArchivoEntrega();
        archivoEntrega.setEntregaId(dto.getEntregaId());
        archivoEntrega.setNombreArchivo(dto.getNombreArchivo());
        archivoEntrega.setTipoMime(dto.getTipoMime());
        archivoEntrega.setPesoBytes(dto.getPesoBytes());
        archivoEntrega.setArchivoBlob(dto.getArchivoBlob());
        return archivoEntrega;
    }
}
