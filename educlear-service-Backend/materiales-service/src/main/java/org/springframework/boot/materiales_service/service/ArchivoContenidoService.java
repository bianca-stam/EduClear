package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.dto.archivos.ArchivoContenidoDTO;
import org.springframework.boot.materiales_service.dto.archivos.CreateArchivoContenidoDTO;
import org.springframework.boot.materiales_service.dto.archivos.UpdateArchivoContenidoDTO;

import java.util.List;

public interface ArchivoContenidoService {
    List<ArchivoContenidoDTO> findAll();
    ArchivoContenidoDTO findById(Integer id);
    ArchivoContenidoDTO save(CreateArchivoContenidoDTO archivoContenido);
    ArchivoContenidoDTO update(Integer id, UpdateArchivoContenidoDTO archivoContenido);
    void delete(Integer id);
    List<ArchivoContenidoDTO> findByTemaId(Integer temaId);
}
