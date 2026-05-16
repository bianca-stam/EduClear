package org.springframework.boot.materiales_service.config;

import org.springframework.boot.materiales_service.dto.AsignaturaDTO;
import org.springframework.boot.materiales_service.dto.CursoDTO;
import org.springframework.boot.materiales_service.dto.UsuarioDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class AsignaturaClient {

    private final RestTemplate restTemplate;

    public AsignaturaClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Obtiene los IDs de asignaturas en las que el alumno está matriculado.
     */
    public List<Integer> getAsignaturasByAlumno(Integer alumnoId) {
        String url = "http://asignatura-service:8083/api/matriculas/alumno/" + alumnoId + "/asignaturas";
        ResponseEntity<Integer[]> response = restTemplate.getForEntity(url, Integer[].class);
        return Arrays.asList(response.getBody());
    }

    /**
     * Obtiene los objetos AsignaturaDTO completos en las que el alumno está matriculado.
     */
    public List<AsignaturaDTO> getFullAsignaturasByAlumno(Integer alumnoId) {
        String url = "http://asignatura-service:8083/api/asignaturas/alumno/" + alumnoId;
        ResponseEntity<AsignaturaDTO[]> response = restTemplate.getForEntity(url, AsignaturaDTO[].class);
        return Arrays.asList(response.getBody());
    }

    /**
     * Obtiene un curso por su ID llamando al curso-service.
     */
    public CursoDTO getCursoById(Integer cursoId) {
        String url = "http://curso-service:8082/api/cursos/" + cursoId;
        return restTemplate.getForObject(url, CursoDTO.class);
    }

    /**
     * Obtiene los IDs de alumnos matriculados en una asignatura concreta.
     */
    public List<Integer> getAlumnosByAsignatura(Integer asignaturaId) {
        String url = "http://asignatura-service:8083/api/matriculas/asignatura/" + asignaturaId + "/alumnos";
        try {
            ResponseEntity<Integer[]> response = restTemplate.getForEntity(url, Integer[].class);
            return response.getBody() != null ? Arrays.asList(response.getBody()) : Collections.emptyList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    /**
     * Obtiene los datos de un usuario por su ID llamando al usuario-service.
     */
    public UsuarioDTO getUsuarioById(Integer usuarioId) {
        String url = "http://usuario-service:8081/api/usuarios/" + usuarioId;
        try {
            return restTemplate.getForObject(url, UsuarioDTO.class);
        } catch (Exception e) {
            return null;
        }
    }
}

