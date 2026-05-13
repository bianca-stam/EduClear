package org.springframework.boot.materiales_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.boot.materiales_service.model.ArchivoContenido;

import java.util.List;

public interface ArchivoContenidoRepository extends JpaRepository<ArchivoContenido, Integer> {
    List<ArchivoContenido> findByTemaId(Integer temaId);
}
