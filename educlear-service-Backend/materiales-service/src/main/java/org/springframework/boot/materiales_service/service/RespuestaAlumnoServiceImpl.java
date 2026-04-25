package org.springframework.boot.materiales_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.respuestaAlumno.request.CreateRespuestaAlumnoDTO;
import org.springframework.boot.materiales_service.dto.respuestaAlumno.request.UpdateRespuestaAlumnoDTO;
import org.springframework.boot.materiales_service.dto.respuestaAlumno.response.RespuestaAlumnoDTO;
import org.springframework.boot.materiales_service.model.RespuestaAlumno;
import org.springframework.boot.materiales_service.repository.RespuestaAlumnoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RespuestaAlumnoServiceImpl implements RespuestaAlumnoService {

    @Autowired
    private RespuestaAlumnoRepository respuestaAlumnoRepository;

    @Override
    public List<RespuestaAlumnoDTO> findAll() {
        return respuestaAlumnoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RespuestaAlumnoDTO findById(Integer id) {
        return respuestaAlumnoRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public RespuestaAlumnoDTO save(CreateRespuestaAlumnoDTO respuestaAlumnoDto) {
        RespuestaAlumno respuestaAlumno = convertToEntity(respuestaAlumnoDto);
        RespuestaAlumno guardada = respuestaAlumnoRepository.save(respuestaAlumno);
        return convertToDTO(guardada);
    }

    @Override
    public RespuestaAlumnoDTO update(Integer id, UpdateRespuestaAlumnoDTO respuestaAlumnoDto) {
        return respuestaAlumnoRepository.findById(id)
                .map(respuestaAlumno -> {
                    if (respuestaAlumnoDto.getIntentoId() != null) {
                        respuestaAlumno.setIntentoId(respuestaAlumnoDto.getIntentoId());
                    }
                    if (respuestaAlumnoDto.getPreguntaId() != null) {
                        respuestaAlumno.setPreguntaId(respuestaAlumnoDto.getPreguntaId());
                    }
                    if (respuestaAlumnoDto.getOpcionSeleccionada() != null) {
                        respuestaAlumno.setOpcionSeleccionada(respuestaAlumnoDto.getOpcionSeleccionada());
                    }
                    return convertToDTO(respuestaAlumnoRepository.save(respuestaAlumno));
                })
                .orElse(null);
    }

    @Override
    public void delete(Integer id) {
        respuestaAlumnoRepository.deleteById(id);
    }

    private RespuestaAlumnoDTO convertToDTO(RespuestaAlumno respuestaAlumno) {
        RespuestaAlumnoDTO dto = new RespuestaAlumnoDTO();
        dto.setId(respuestaAlumno.getId());
        dto.setIntentoId(respuestaAlumno.getIntentoId());
        dto.setPreguntaId(respuestaAlumno.getPreguntaId());
        dto.setOpcionSeleccionada(respuestaAlumno.getOpcionSeleccionada());
        return dto;
    }

    private RespuestaAlumno convertToEntity(CreateRespuestaAlumnoDTO dto) {
        RespuestaAlumno respuestaAlumno = new RespuestaAlumno();
        respuestaAlumno.setIntentoId(dto.getIntentoId());
        respuestaAlumno.setPreguntaId(dto.getPreguntaId());
        respuestaAlumno.setOpcionSeleccionada(dto.getOpcionSeleccionada());
        return respuestaAlumno;
    }
}
