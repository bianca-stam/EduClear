package org.springframework.boot.materiales_service.config;

import org.springframework.boot.materiales_service.dto.AsignaturaDTO;
import org.springframework.boot.materiales_service.dto.CursoDTO;
import org.springframework.boot.materiales_service.dto.UsuarioDTO;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
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
     * Obtiene los IDs de asignaturas del alumno (a través de sus cursos matriculados).
     */
    public List<Integer> getAsignaturasByAlumno(Integer alumnoId) {
        // Ahora llama al endpoint adaptado de asignatura-service que internamente
        // consulta curso-service para obtener los cursos del alumno
        String url = "http://asignatura-service:8083/api/asignaturas/alumno/" + alumnoId;
        try {
            ResponseEntity<AsignaturaDTO[]> response = restTemplate.getForEntity(url, AsignaturaDTO[].class);
            if (response.getBody() == null) return Collections.emptyList();
            return Arrays.stream(response.getBody())
                    .map(AsignaturaDTO::getId)
                    .collect(java.util.stream.Collectors.toList());
        } catch (Exception e) {
            return Collections.emptyList();
        }
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
     * Obtiene los IDs de alumnos matriculados en una asignatura.
     * Ahora: obtiene el cursoId de la asignatura → luego los alumnos del curso.
     */
    public List<Integer> getAlumnosByAsignatura(Integer asignaturaId) {
        try {
            // 1. Obtener la asignatura para conocer su cursoId
            String asigUrl = "http://asignatura-service:8083/api/asignaturas/" + asignaturaId;
            AsignaturaDTO asignatura = restTemplate.getForObject(asigUrl, AsignaturaDTO.class);
            if (asignatura == null || asignatura.getCursoId() == null) {
                return Collections.emptyList();
            }

            // 2. Obtener los alumnos del curso
            String cursoUrl = "http://curso-service:8082/api/cursos/" + asignatura.getCursoId() + "/alumnos";
            ResponseEntity<List<Integer>> response = restTemplate.exchange(
                    cursoUrl,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<Integer>>() {}
            );
            return response.getBody() != null ? response.getBody() : Collections.emptyList();
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
