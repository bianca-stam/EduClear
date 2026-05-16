package org.springframework.boot.materiales_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.config.AsignaturaClient;
import org.springframework.boot.materiales_service.dto.UsuarioDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.request.CreateEntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.request.UpdateEntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.response.ArchivoEntregaInfoDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.response.EntregaAsignaturaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.response.EntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.response.EstadoEntregaAlumnoDTO;
import org.springframework.boot.materiales_service.enums.EstadoEntrega;
import org.springframework.boot.materiales_service.model.ArchivoEntrega;
import org.springframework.boot.materiales_service.model.EntregaTarea;
import org.springframework.boot.materiales_service.model.Tarea;
import org.springframework.boot.materiales_service.model.Tema;
import org.springframework.boot.materiales_service.repository.ArchivoEntregaRepository;
import org.springframework.boot.materiales_service.repository.EntregaTareaRepository;
import org.springframework.boot.materiales_service.repository.TareaRepository;
import org.springframework.boot.materiales_service.repository.TemaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EntregaTareaServiceImpl implements EntregaTareaService {

    @Autowired
    private EntregaTareaRepository entregaTareaRepository;

    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    private TemaRepository temaRepository;

    @Autowired
    private ArchivoEntregaRepository archivoEntregaRepository;

    @Autowired
    private AsignaturaClient asignaturaClient;

    @Override
    public List<EntregaTareaDTO> findAll() {
        return entregaTareaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EntregaTareaDTO findById(Integer id) {
        return entregaTareaRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public EntregaTareaDTO save(CreateEntregaTareaDTO entregaTareaDto) {
        EntregaTarea entregaTarea = convertToEntity(entregaTareaDto);
        EntregaTarea guardada = entregaTareaRepository.save(entregaTarea);
        return convertToDTO(guardada);
    }

    @Override
    public EntregaTareaDTO update(Integer id, UpdateEntregaTareaDTO entregaTareaDto) {
        return entregaTareaRepository.findById(id)
                .map(entregaTarea -> {
                    if (entregaTareaDto.getTareaId() != null) {
                        entregaTarea.setTareaId(entregaTareaDto.getTareaId());
                    }
                    if (entregaTareaDto.getAlumnoId() != null) {
                        entregaTarea.setAlumnoId(entregaTareaDto.getAlumnoId());
                    }
                    if (entregaTareaDto.getEstadoEntrega() != null) {
                        entregaTarea.setEstadoEntrega(entregaTareaDto.getEstadoEntrega());
                    }
                    if (entregaTareaDto.getCalificacion() != null) {
                        entregaTarea.setCalificacion(entregaTareaDto.getCalificacion());
                    }
                    return convertToDTO(entregaTareaRepository.save(entregaTarea));
                })
                .orElse(null);
    }

    @Override
    public void delete(Integer id) {
        entregaTareaRepository.deleteById(id);
    }

    @Override
    public boolean existsByAlumnoIdAndTareaId(Integer alumnoId, Integer tareaId) {
        return entregaTareaRepository.existsByAlumnoIdAndTareaId(alumnoId, tareaId);
    }

    // ============================================================
    // ENDPOINT 1: GET /asignatura/{asignaturaId}
    // Retorna todas las entregas de todas las tareas de la asignatura,
    // con nombres de tarea y alumno ya resueltos.
    // ============================================================
    @Override
    public List<EntregaAsignaturaDTO> findByAsignaturaId(Integer asignaturaId) {
        // 1. Obtener todos los temas de la asignatura
        List<Tema> temas = temaRepository.findByAsignaturaId(asignaturaId);
        List<Integer> temaIds = temas.stream().map(Tema::getId).collect(Collectors.toList());

        // 2. Obtener todas las tareas de esos temas
        List<Tarea> tareas = tareaRepository.findByTemaIdIn(temaIds);
        List<Integer> tareaIds = tareas.stream().map(Tarea::getId).collect(Collectors.toList());
        Map<Integer, String> nombreTareaPorId = tareas.stream()
                .collect(Collectors.toMap(Tarea::getId, Tarea::getTitulo));

        // 3. Obtener todas las entregas de esas tareas
        List<EntregaTarea> entregas = entregaTareaRepository.findByTareaIdIn(tareaIds);

        // 4. Construir el DTO con nombres resueltos
        List<EntregaAsignaturaDTO> resultado = new ArrayList<>();
        for (EntregaTarea entrega : entregas) {
            EntregaAsignaturaDTO dto = new EntregaAsignaturaDTO();
            dto.setIdEntregaTarea(entrega.getId());
            dto.setTareaId(entrega.getTareaId());
            dto.setTareaNombre(nombreTareaPorId.getOrDefault(entrega.getTareaId(), "Tarea desconocida"));
            dto.setAlumnoId(entrega.getAlumnoId());
            dto.setEstadoEntrega(entrega.getEstadoEntrega());
            dto.setCalificacion(entrega.getCalificacion());

            // Resolver nombre del alumno via usuario-service
            UsuarioDTO alumno = asignaturaClient.getUsuarioById(entrega.getAlumnoId());
            dto.setAlumnoNombre(alumno != null ? alumno.getUsername() : "Alumno " + entrega.getAlumnoId());

            // Adjuntar metadatos de archivos (sin el blob)
            List<ArchivoEntrega> archivos = archivoEntregaRepository.findByEntregaId(entrega.getId());
            dto.setArchivos(archivos.stream().map(this::convertArchivoToInfoDTO).collect(Collectors.toList()));

            resultado.add(dto);
        }
        return resultado;
    }

    // ============================================================
    // ENDPOINT 2: GET /tarea/{tareaId}/estado-alumnos
    // Lista todos los alumnos matriculados en la asignatura de la tarea,
    // indicando explícitamente si han entregado o no.
    // ============================================================
    @Override
    public List<EstadoEntregaAlumnoDTO> getEstadoEntregasAlumnosByTareaId(Integer tareaId) {
        // 1. Obtener la tarea para conocer su tema y luego su asignatura
        Tarea tarea = tareaRepository.findById(tareaId).orElse(null);
        if (tarea == null) return new ArrayList<>();

        Tema tema = temaRepository.findById(tarea.getTemaId()).orElse(null);
        if (tema == null) return new ArrayList<>();

        Integer asignaturaId = tema.getAsignaturaId();

        // 2. Obtener todos los alumnos matriculados en esa asignatura
        List<Integer> alumnoIds = asignaturaClient.getAlumnosByAsignatura(asignaturaId);

        // 3. Obtener las entregas existentes para esta tarea, indexadas por alumnoId
        List<EntregaTarea> entregas = entregaTareaRepository.findByTareaId(tareaId);
        Map<Integer, EntregaTarea> entregaPorAlumno = entregas.stream()
                .collect(Collectors.toMap(EntregaTarea::getAlumnoId, e -> e));

        // 4. Construir la lista con todos los alumnos
        List<EstadoEntregaAlumnoDTO> resultado = new ArrayList<>();
        for (Integer alumnoId : alumnoIds) {
            EstadoEntregaAlumnoDTO dto = new EstadoEntregaAlumnoDTO();
            dto.setAlumnoId(alumnoId);

            // Resolver nombre del alumno
            UsuarioDTO alumno = asignaturaClient.getUsuarioById(alumnoId);
            dto.setAlumnoNombre(alumno != null ? alumno.getUsername() : "Alumno " + alumnoId);

            EntregaTarea entrega = entregaPorAlumno.get(alumnoId);
            if (entrega != null) {
                dto.setIdEntregaTarea(entrega.getId());
                dto.setEstadoEntrega(entrega.getEstadoEntrega());
                dto.setCalificacion(entrega.getCalificacion());
            } else {
                dto.setEstadoEntrega(EstadoEntrega.no_entregado);
            }
            resultado.add(dto);
        }
        return resultado;
    }

    // ============================================================
    // ENDPOINT 3: GET /tarea/{tareaId}/alumno/{alumnoId}
    // Retorna la entrega específica de un alumno para una tarea.
    // ============================================================
    @Override
    public EntregaTareaDTO findByTareaIdAndAlumnoId(Integer tareaId, Integer alumnoId) {
        Optional<EntregaTarea> entrega = entregaTareaRepository.findByTareaIdAndAlumnoId(tareaId, alumnoId);
        return entrega.map(this::convertToDTO).orElse(null);
    }

    // ============================================================
    // Helpers privados
    // ============================================================
    private EntregaTareaDTO convertToDTO(EntregaTarea entregaTarea) {
        EntregaTareaDTO dto = new EntregaTareaDTO();
        dto.setId(entregaTarea.getId());
        dto.setTareaId(entregaTarea.getTareaId());
        dto.setAlumnoId(entregaTarea.getAlumnoId());
        dto.setEstadoEntrega(entregaTarea.getEstadoEntrega());
        dto.setCalificacion(entregaTarea.getCalificacion());
        return dto;
    }

    private EntregaTarea convertToEntity(CreateEntregaTareaDTO dto) {
        EntregaTarea entregaTarea = new EntregaTarea();
        entregaTarea.setTareaId(dto.getTareaId());
        entregaTarea.setAlumnoId(dto.getAlumnoId());
        entregaTarea.setEstadoEntrega(dto.getEstadoEntrega());
        entregaTarea.setCalificacion(dto.getCalificacion());
        return entregaTarea;
    }

    private ArchivoEntregaInfoDTO convertArchivoToInfoDTO(ArchivoEntrega archivo) {
        ArchivoEntregaInfoDTO dto = new ArchivoEntregaInfoDTO();
        dto.setId(archivo.getId());
        dto.setNombreArchivo(archivo.getNombreArchivo());
        dto.setTipoMime(archivo.getTipoMime());
        dto.setPesoBytes(archivo.getPesoBytes());
        return dto;
    }
}
