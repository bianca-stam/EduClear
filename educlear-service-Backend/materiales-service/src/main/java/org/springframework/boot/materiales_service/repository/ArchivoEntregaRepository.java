package org.springframework.boot.materiales_service.repository;

import org.springframework.boot.materiales_service.model.ArchivoEntrega;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArchivoEntregaRepository extends JpaRepository<ArchivoEntrega, Integer> {
    List<ArchivoEntrega> findByEntregaId(Integer entregaId);
}
