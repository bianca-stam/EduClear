package org.springframework.boot.asignatura_service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@Component
public class CursoClient {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${curso.service.url:http://curso-service:8082}")
    private String cursoServiceUrl;

    /**
     * Obtiene los IDs de alumnos matriculados en un curso.
     */
    public List<Integer> getAlumnoIdsByCurso(Integer cursoId) {
        String url = cursoServiceUrl + "/api/cursos/" + cursoId + "/alumnos";
        try {
            ResponseEntity<List<Integer>> response = restTemplate.exchange(
                    url,
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
     * Obtiene los IDs de cursos en los que un alumno está matriculado.
     */
    public List<Integer> getCursoIdsByAlumno(Integer alumnoId) {
        String url = cursoServiceUrl + "/api/cursos/alumno/" + alumnoId + "/curso-ids";
        try {
            ResponseEntity<List<Integer>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<Integer>>() {}
            );
            return response.getBody() != null ? response.getBody() : Collections.emptyList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}
