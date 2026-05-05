package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.dto.archivos.ArchivoEntregaDTO;
import org.springframework.boot.materiales_service.dto.archivos.CreateArchivoEntregaDTO;
import org.springframework.boot.materiales_service.dto.archivos.UpdateArchivoEntregaDTO;

import java.util.List;

public interface ArchivoEntregaService {
    List<ArchivoEntregaDTO> findAll();
    ArchivoEntregaDTO findById(Integer id);
    List<ArchivoEntregaDTO> findByEntregaId(Integer entregaId);
    ArchivoEntregaDTO save(CreateArchivoEntregaDTO archivoEntrega);
    ArchivoEntregaDTO update(Integer id, UpdateArchivoEntregaDTO archivoEntrega);
    void delete(Integer id);
}
