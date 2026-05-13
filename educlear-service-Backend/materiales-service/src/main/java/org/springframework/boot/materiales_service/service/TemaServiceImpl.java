package org.springframework.boot.materiales_service.service;

import org.springframework.boot.materiales_service.config.AsignaturaClient;
import org.springframework.boot.materiales_service.dto.tema.CreateTemaDTO;
import org.springframework.boot.materiales_service.dto.tema.PromedioTemaDTO;
import org.springframework.boot.materiales_service.dto.tema.TemaDTO;
import org.springframework.boot.materiales_service.dto.tema.UpdateTemaDTO;
import org.springframework.boot.materiales_service.model.*;
import org.springframework.boot.materiales_service.repository.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TemaServiceImpl implements TemaService {

    private final TemaRepository temaRepository;
    private final TareaRepository tareaRepository;
    private final ExamenRepository examenRepository;
    private final EntregaTareaRepository entregaTareaRepository;
    private final IntentoExamenRepository intentoExamenRepository;
    private final AsignaturaClient asignaturaClient;

    public TemaServiceImpl(TemaRepository temaRepository,
            TareaRepository tareaRepository,
            ExamenRepository examenRepository,
            EntregaTareaRepository entregaTareaRepository,
            IntentoExamenRepository intentoExamenRepository,
            AsignaturaClient asignaturaClient) {
        this.temaRepository = temaRepository;
        this.tareaRepository = tareaRepository;
        this.examenRepository = examenRepository;
        this.entregaTareaRepository = entregaTareaRepository;
        this.intentoExamenRepository = intentoExamenRepository;
        this.asignaturaClient = asignaturaClient;
    }

    @Override
    public TemaDTO create(CreateTemaDTO dto) {

        Tema tema = new Tema();
        tema.setTitulo(dto.getTitulo());
        tema.setDescripcion(dto.getDescripcion());
        tema.setAsignaturaId(dto.getAsignaturaId());

        Tema guardado = temaRepository.save(tema);

        return toDTO(guardado);
    }

    @Override
    public TemaDTO findById(Integer id) {

        Tema tema = temaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tema no encontrado"));

        return toDTO(tema);
    }

    @Override
    public List<TemaDTO> findAll() {

        return temaRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TemaDTO update(Integer id, UpdateTemaDTO dto) {

        Tema tema = temaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tema no encontrado"));

        if (dto.getTitulo() != null) {
            tema.setTitulo(dto.getTitulo());
        }

        if (dto.getDescripcion() != null) {
            tema.setDescripcion(dto.getDescripcion());
        }

        Tema actualizado = temaRepository.save(tema);

        return toDTO(actualizado);
    }

    @Override
    public void delete(Integer id) {

        if (!temaRepository.existsById(id)) {
            throw new RuntimeException("Tema no encontrado");
        }

        temaRepository.deleteById(id);
    }

    // ===== PROMEDIO POR ALUMNO =====
    @Override
    public List<PromedioTemaDTO> getPromediosPorAlumno(Integer alumnoId) {

        // 1. Obtener asignaturas del alumno
        List<Integer> asignaturasIds = asignaturaClient.getAsignaturasByAlumno(alumnoId);

        // 2. Obtener solo temas de esas asignaturas
        List<Tema> temas = temaRepository.findByAsignaturaIdIn(asignaturasIds);

        List<PromedioTemaDTO> resultado = new ArrayList<>();

        for (Tema tema : temas) {
            List<BigDecimal> calificaciones = new ArrayList<>();

            // 1. Calificaciones de tareas
            List<Integer> tareaIds = tareaRepository.findByTemaId(tema.getId())
                    .stream().map(Tarea::getId).collect(Collectors.toList());

            if (!tareaIds.isEmpty()) {
                entregaTareaRepository.findByTareaIdInAndAlumnoId(tareaIds, alumnoId)
                        .stream()
                        .filter(e -> e.getCalificacion() != null)
                        .map(EntregaTarea::getCalificacion)
                        .forEach(calificaciones::add);
            }

            // 2. Calificaciones de exámenes
            List<Integer> examenIds = examenRepository.findByTemaId(tema.getId())
                    .stream().map(Examen::getId).collect(Collectors.toList());

            if (!examenIds.isEmpty()) {
                intentoExamenRepository.findByExamenIdInAndAlumnoId(examenIds, alumnoId)
                        .stream()
                        .filter(i -> i.getCalificacionFinal() != null)
                        .map(IntentoExamen::getCalificacionFinal)
                        .forEach(calificaciones::add);
            }

            // 3. Calcular promedio
            PromedioTemaDTO dto = new PromedioTemaDTO();
            dto.setTemaId(tema.getId());
            dto.setTituloTema(tema.getTitulo());

            if (!calificaciones.isEmpty()) {
                BigDecimal suma = calificaciones.stream()
                        .reduce(BigDecimal.ZERO, BigDecimal::add);
                dto.setPromedio(suma.divide(
                        BigDecimal.valueOf(calificaciones.size()), 2, RoundingMode.HALF_UP));
            }
            // Si no hay calificaciones, promedio queda null (omitido por @JsonInclude)
            resultado.add(dto);
        }

        return resultado;
    }

    @Override
    public List<PromedioTemaDTO> getPromediosPorAlumnoYAsignatura(Integer alumnoId, Integer asignaturaId) {

        // SOLO temas de la asignatura
        List<Tema> temas = temaRepository.findByAsignaturaId(asignaturaId);

        List<PromedioTemaDTO> resultado = new ArrayList<>();

        for (Tema tema : temas) {
            List<BigDecimal> calificaciones = new ArrayList<>();

            // 1. TAREAS
            List<Integer> tareaIds = tareaRepository.findByTemaId(tema.getId())
                    .stream()
                    .map(Tarea::getId)
                    .collect(Collectors.toList());

            if (!tareaIds.isEmpty()) {
                entregaTareaRepository.findByTareaIdInAndAlumnoId(tareaIds, alumnoId)
                        .stream()
                        .filter(e -> e.getCalificacion() != null)
                        .map(EntregaTarea::getCalificacion)
                        .forEach(calificaciones::add);
            }

            // 2. EXÁMENES
            List<Integer> examenIds = examenRepository.findByTemaId(tema.getId())
                    .stream()
                    .map(Examen::getId)
                    .collect(Collectors.toList());

            if (!examenIds.isEmpty()) {
                intentoExamenRepository.findByExamenIdInAndAlumnoId(examenIds, alumnoId)
                        .stream()
                        .filter(i -> i.getCalificacionFinal() != null)
                        .map(IntentoExamen::getCalificacionFinal)
                        .forEach(calificaciones::add);
            }

            // 3. PROMEDIO
            PromedioTemaDTO dto = new PromedioTemaDTO();
            dto.setTemaId(tema.getId());
            dto.setTituloTema(tema.getTitulo());

            if (!calificaciones.isEmpty()) {
                BigDecimal suma = calificaciones.stream()
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

                dto.setPromedio(
                        suma.divide(
                                BigDecimal.valueOf(calificaciones.size()),
                                2,
                                RoundingMode.HALF_UP));
            }

            resultado.add(dto);
        }

        return resultado;
    }

    @Override
    public List<TemaDTO> findByAsignaturaId(Integer asignaturaId) {
        return temaRepository.findByAsignaturaId(asignaturaId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ===== MAPPER =====
    private TemaDTO toDTO(Tema tema) {

        TemaDTO dto = new TemaDTO();
        dto.setIdTema(tema.getId());
        dto.setTitulo(tema.getTitulo());
        dto.setDescripcion(tema.getDescripcion());
        dto.setAsignaturaId(tema.getAsignaturaId());

        return dto;
    }
}
