package org.springframework.boot.asignatura_service.service;

import org.springframework.boot.asignatura_service.dto.AsignaturaDTO;
import org.springframework.boot.asignatura_service.dto.MatriculaAsignaturaDTO;
import org.springframework.boot.asignatura_service.dto.UpdateAsignaturaDTO;
import org.springframework.boot.asignatura_service.dto.AsignaturaDetalleDTO;
import org.springframework.boot.asignatura_service.model.Asignatura;
import org.springframework.boot.asignatura_service.model.MatriculaAsignatura;
import org.springframework.boot.asignatura_service.model.MatriculaAsignaturaId;
import org.springframework.boot.asignatura_service.repository.MatriculaAsignaturaRepository;
import org.springframework.boot.asignatura_service.repository.AsignaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service

public class AsignaturaServiceImpl implements AsignaturaService {

    private AsignaturaRepository asignaturaRepository;

    private MatriculaAsignaturaRepository matriculaRepository;

    @Autowired
    private RestTemplate restTemplate;

    public AsignaturaServiceImpl(AsignaturaRepository asignaturaRepository,
                                 MatriculaAsignaturaRepository matriculaRepository) {
        this.asignaturaRepository = asignaturaRepository;
        this.matriculaRepository = matriculaRepository;
    }

    @Override
    public List<AsignaturaDTO> findAll() {
        return asignaturaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AsignaturaDTO findById(Integer id) {
        return asignaturaRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public AsignaturaDTO save(Asignatura asignatura) {
        Asignatura guardada = asignaturaRepository.save(asignatura);
        return convertToDTO(guardada);
    }

    @Override
    public List<Integer> obtenerCursoIdsPorProfesor(Integer profesorId) {
        return asignaturaRepository.findCursoIdsByProfesorId(profesorId);
    }

    @Override
    public List<Integer> obtenerCursoIdsPorAlumno(Integer alumnoId) {
        return asignaturaRepository.findCursoIdsByAlumnoId(alumnoId);
    }

    @Override
    public List<AsignaturaDTO> findByCursoId(Integer cursoId) {
        return asignaturaRepository.findByCursoId(cursoId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AsignaturaDetalleDTO> findDetallesByCursoId(Integer cursoId) {
        List<Asignatura> asignaturas = asignaturaRepository.findByCursoId(cursoId);
        
        return asignaturas.stream().map(a -> {
            AsignaturaDetalleDTO dto = new AsignaturaDetalleDTO();
            dto.setId(a.getId());
            dto.setNombre(a.getNombre());
            dto.setCursoId(a.getCursoId());
            dto.setProfesorId(a.getProfesorId());
            
            dto.setCantidadAlumnos(asignaturaRepository.countAlumnosByAsignaturaId(a.getId()));
            
            if (a.getProfesorId() != null) {
                try {
                    Map response = restTemplate.getForObject(
                            "http://usuario-service:8081/api/usuarios/" + a.getProfesorId(), Map.class);
                    if (response != null && response.containsKey("nombreCompleto")) {
                        dto.setNombreProfesor((String) response.get("nombreCompleto"));
                    }
                } catch (Exception e) {
                    dto.setNombreProfesor("Profesor Desconocido");
                }
            }
            
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public AsignaturaDTO update(Integer id, UpdateAsignaturaDTO dto) {
        Asignatura asignatura = asignaturaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Asignatura no encontrada"));
        if (dto.getNombre() != null && !dto.getNombre().isBlank()) {
            asignatura.setNombre(dto.getNombre());
        }
        if (dto.getProfesorId() != null) {
            asignatura.setProfesorId(dto.getProfesorId());
        }
        return convertToDTO(asignaturaRepository.save(asignatura));
    }

    @Override
    public void delete(Integer id) {
        if (!asignaturaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Asignatura no encontrada");
        }
        asignaturaRepository.deleteById(id);
    }

    @Override
    public Long contarAlumnosMatriculados(Integer asignaturaId) {
        return asignaturaRepository.countAlumnosByAsignaturaId(asignaturaId);
    }

    @Override
    public List<AsignaturaDTO> findByAlumnoId(Integer alumnoId) {
        return asignaturaRepository.findAsignaturasByAlumnoId(alumnoId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<MatriculaAsignaturaDTO> matricularEnCurso(Integer cursoId, Integer usuarioId) {
        // 1. Obtener todas las asignaturas del curso
        List<Asignatura> asignaturas = asignaturaRepository.findByCursoId(cursoId);
        if (asignaturas.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No se encontraron asignaturas para el curso " + cursoId);
        }

        // 2. Crear una matrícula por cada asignatura (ignorando duplicados)
        List<MatriculaAsignatura> nuevas = asignaturas.stream()
                .filter(a -> !matriculaRepository.existsById(
                        new MatriculaAsignaturaId(a.getId(), usuarioId)))
                .map(a -> {
                    MatriculaAsignatura m = new MatriculaAsignatura();
                    m.setAsignaturaId(a.getId());
                    m.setAlumnoId(usuarioId);
                    return m;
                })
                .collect(Collectors.toList());

        List<MatriculaAsignatura> guardadas = matriculaRepository.saveAll(nuevas);

        return guardadas.stream()
                .map(m -> {
                    MatriculaAsignaturaDTO dto = new MatriculaAsignaturaDTO();
                    dto.setAsignaturaId(m.getAsignaturaId());
                    dto.setAlumnoId(m.getAlumnoId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    private AsignaturaDTO convertToDTO(Asignatura asignatura) {
        AsignaturaDTO dto = new AsignaturaDTO();
        dto.setId(asignatura.getId());
        dto.setNombre(asignatura.getNombre());
        dto.setCursoId(asignatura.getCursoId());
        dto.setProfesorId(asignatura.getProfesorId());
        return dto;
    }

}
