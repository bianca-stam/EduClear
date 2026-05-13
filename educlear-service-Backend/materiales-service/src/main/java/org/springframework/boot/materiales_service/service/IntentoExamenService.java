package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.dto.intentoExamen.request.CreateIntentoExamenDTO;
import org.springframework.boot.materiales_service.dto.intentoExamen.request.UpdateIntentoExamenDTO;
import org.springframework.boot.materiales_service.dto.intentoExamen.response.IntentoExamenDTO;

import java.util.List;

public interface IntentoExamenService {
    List<IntentoExamenDTO> findAll();
    IntentoExamenDTO findById(Integer id);
    IntentoExamenDTO save(CreateIntentoExamenDTO intentoExamen);
    IntentoExamenDTO update(Integer id, UpdateIntentoExamenDTO intentoExamen);
    void delete(Integer id);
    boolean existsByAlumnoIdAndExamenId(Integer alumnoId, Integer examenId);
}
