package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.dto.respuestaAlumno.request.CreateRespuestaAlumnoDTO;
import org.springframework.boot.materiales_service.dto.respuestaAlumno.request.UpdateRespuestaAlumnoDTO;
import org.springframework.boot.materiales_service.dto.respuestaAlumno.response.RespuestaAlumnoDTO;

import java.util.List;

public interface RespuestaAlumnoService {
    List<RespuestaAlumnoDTO> findAll();
    RespuestaAlumnoDTO findById(Integer id);
    RespuestaAlumnoDTO save(CreateRespuestaAlumnoDTO respuestaAlumno);
    RespuestaAlumnoDTO update(Integer id, UpdateRespuestaAlumnoDTO respuestaAlumno);
    void delete(Integer id);
}
