package org.springframework.boot.materiales_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.intentoExamen.request.CreateIntentoExamenDTO;
import org.springframework.boot.materiales_service.dto.intentoExamen.request.UpdateIntentoExamenDTO;
import org.springframework.boot.materiales_service.dto.intentoExamen.response.IntentoExamenDTO;
import org.springframework.boot.materiales_service.model.IntentoExamen;
import org.springframework.boot.materiales_service.repository.IntentoExamenRepository;
import org.springframework.stereotype.Service;

import org.springframework.boot.materiales_service.model.Pregunta;
import org.springframework.boot.materiales_service.model.RespuestaAlumno;
import org.springframework.boot.materiales_service.model.Examen;
import org.springframework.boot.materiales_service.model.Tema;
import org.springframework.boot.materiales_service.repository.PreguntaRepository;
import org.springframework.boot.materiales_service.repository.RespuestaAlumnoRepository;
import org.springframework.boot.materiales_service.repository.ExamenRepository;
import org.springframework.boot.materiales_service.repository.TemaRepository;
import org.springframework.boot.materiales_service.dto.intentoExamen.response.EstadoIntentoAlumnoDTO;
import org.springframework.boot.materiales_service.dto.UsuarioDTO;
import org.springframework.boot.materiales_service.config.AsignaturaClient;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class IntentoExamenServiceImpl implements IntentoExamenService {

    @Autowired
    private IntentoExamenRepository intentoExamenRepository;

    @Autowired
    private PreguntaRepository preguntaRepository;

    @Autowired
    private RespuestaAlumnoRepository respuestaAlumnoRepository;

    @Autowired
    private ExamenRepository examenRepository;

    @Autowired
    private TemaRepository temaRepository;

    @Autowired
    private AsignaturaClient asignaturaClient;

    @Override
    public List<IntentoExamenDTO> findAll() {
        return intentoExamenRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public IntentoExamenDTO findById(Integer id) {
        return intentoExamenRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public IntentoExamenDTO save(CreateIntentoExamenDTO intentoExamenDto) {
        List<Pregunta> preguntas = preguntaRepository.findByExamenId(intentoExamenDto.getExamenId());
        
        int totalPreguntas = preguntas.size();
        int respuestasCorrectas = 0;

        if (intentoExamenDto.getRespuestas() != null && totalPreguntas > 0) {
            for (CreateIntentoExamenDTO.RespuestaExamenDTO respuestaEnvio : intentoExamenDto.getRespuestas()) {
                Pregunta pregunta = preguntas.stream()
                        .filter(p -> p.getId().equals(respuestaEnvio.getPreguntaId()))
                        .findFirst()
                        .orElse(null);

                if (pregunta != null && pregunta.getRespuestaCorrecta() == respuestaEnvio.getOpcionSeleccionada()) {
                    respuestasCorrectas++;
                }
            }
        }

        BigDecimal calificacion = totalPreguntas > 0 
                ? BigDecimal.valueOf((double) respuestasCorrectas / totalPreguntas * 10).setScale(2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        intentoExamenDto.setCalificacionFinal(calificacion);
        
        IntentoExamen intentoExamen = convertToEntity(intentoExamenDto);
        IntentoExamen guardado = intentoExamenRepository.save(intentoExamen);

        if (intentoExamenDto.getRespuestas() != null) {
            for (CreateIntentoExamenDTO.RespuestaExamenDTO respuestaEnvio : intentoExamenDto.getRespuestas()) {
                RespuestaAlumno respuestaAlumno = new RespuestaAlumno();
                respuestaAlumno.setIntentoId(guardado.getId());
                respuestaAlumno.setPreguntaId(respuestaEnvio.getPreguntaId());
                respuestaAlumno.setOpcionSeleccionada(respuestaEnvio.getOpcionSeleccionada());
                respuestaAlumnoRepository.save(respuestaAlumno);
            }
        }

        return convertToDTO(guardado);
    }

    @Override
    public IntentoExamenDTO update(Integer id, UpdateIntentoExamenDTO intentoExamenDto) {
        return intentoExamenRepository.findById(id)
                .map(intentoExamen -> {
                    if (intentoExamenDto.getExamenId() != null) {
                        intentoExamen.setExamenId(intentoExamenDto.getExamenId());
                    }
                    if (intentoExamenDto.getAlumnoId() != null) {
                        intentoExamen.setAlumnoId(intentoExamenDto.getAlumnoId());
                    }
                    if (intentoExamenDto.getFechaInicio() != null) {
                        intentoExamen.setFechaInicio(intentoExamenDto.getFechaInicio());
                    }
                    if (intentoExamenDto.getFechaEnvio() != null) {
                        intentoExamen.setFechaEnvio(intentoExamenDto.getFechaEnvio());
                    }
                    if (intentoExamenDto.getCalificacionFinal() != null) {
                        intentoExamen.setCalificacionFinal(intentoExamenDto.getCalificacionFinal());
                    }
                    if (intentoExamenDto.getEstado() != null) {
                        intentoExamen.setEstado(intentoExamenDto.getEstado());
                    }
                    return convertToDTO(intentoExamenRepository.save(intentoExamen));
                })
                .orElse(null);
    }

    @Override
    public void delete(Integer id) {
        intentoExamenRepository.deleteById(id);
    }

    @Override
    public boolean existsByAlumnoIdAndExamenId(Integer alumnoId, Integer examenId) {
        return intentoExamenRepository.existsByAlumnoIdAndExamenId(alumnoId, examenId);
    }

    @Override
    public IntentoExamenDTO findByAlumnoIdAndExamenId(Integer alumnoId, Integer examenId) {
        return intentoExamenRepository.findByAlumnoIdAndExamenId(alumnoId, examenId)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public List<EstadoIntentoAlumnoDTO> getEstadoIntentosAlumnosByExamenId(Integer examenId) {
        Examen examen = examenRepository.findById(examenId).orElse(null);
        if (examen == null) return new ArrayList<>();

        Tema tema = temaRepository.findById(examen.getTemaId()).orElse(null);
        if (tema == null) return new ArrayList<>();

        Integer asignaturaId = tema.getAsignaturaId();

        List<Integer> alumnoIds = asignaturaClient.getAlumnosByAsignatura(asignaturaId);

        List<IntentoExamen> intentos = intentoExamenRepository.findByExamenId(examenId);
        Map<Integer, IntentoExamen> intentoPorAlumno = intentos.stream()
                .collect(Collectors.toMap(IntentoExamen::getAlumnoId, i -> i, (i1, i2) -> i1));

        List<EstadoIntentoAlumnoDTO> resultado = new ArrayList<>();
        for (Integer alumnoId : alumnoIds) {
            EstadoIntentoAlumnoDTO dto = new EstadoIntentoAlumnoDTO();
            dto.setAlumnoId(alumnoId);

            UsuarioDTO alumno = asignaturaClient.getUsuarioById(alumnoId);
            dto.setAlumnoNombre(alumno != null ? alumno.getUsername() : "Alumno " + alumnoId);

            IntentoExamen intento = intentoPorAlumno.get(alumnoId);
            if (intento != null) {
                dto.setIdIntentoExamen(intento.getId());
                dto.setEstadoIntento(intento.getEstado().name());
                dto.setCalificacionFinal(intento.getCalificacionFinal());
            } else {
                dto.setEstadoIntento("no_iniciado");
            }
            resultado.add(dto);
        }
        return resultado;
    }

    private IntentoExamenDTO convertToDTO(IntentoExamen intentoExamen) {
        IntentoExamenDTO dto = new IntentoExamenDTO();
        dto.setId(intentoExamen.getId());
        dto.setExamenId(intentoExamen.getExamenId());
        dto.setAlumnoId(intentoExamen.getAlumnoId());
        dto.setFechaInicio(intentoExamen.getFechaInicio());
        dto.setFechaEnvio(intentoExamen.getFechaEnvio());
        dto.setCalificacionFinal(intentoExamen.getCalificacionFinal());
        dto.setEstado(intentoExamen.getEstado());
        return dto;
    }

    private IntentoExamen convertToEntity(CreateIntentoExamenDTO dto) {
        IntentoExamen intentoExamen = new IntentoExamen();
        intentoExamen.setExamenId(dto.getExamenId());
        intentoExamen.setAlumnoId(dto.getAlumnoId());
        intentoExamen.setFechaInicio(dto.getFechaInicio());
        intentoExamen.setFechaEnvio(dto.getFechaEnvio());
        intentoExamen.setCalificacionFinal(dto.getCalificacionFinal());
        intentoExamen.setEstado(dto.getEstado());
        return intentoExamen;
    }
}
