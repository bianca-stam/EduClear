package org.springframework.boot.materiales_service.config;

import org.springframework.boot.materiales_service.dto.AsignaturaDTO;
import org.springframework.boot.materiales_service.dto.CursoDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
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
}

