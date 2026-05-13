package org.springframework.boot.materiales_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.boot.materiales_service.model.Tema;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemaRepository extends JpaRepository<Tema, Integer> {
    List<Tema> findByAsignaturaId(Integer asignaturaId);

    List<Tema> findByAsignaturaIdIn(List<Integer> asignaturasIds);
}
