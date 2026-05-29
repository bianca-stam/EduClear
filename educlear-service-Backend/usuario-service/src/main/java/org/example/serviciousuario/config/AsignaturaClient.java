package org.example.serviciousuario.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Component
public class AsignaturaClient {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${asignatura.service.url:http://asignatura-service:8083}")
    private String asignaturaServiceUrl;

    @Value("${curso.service.url:http://curso-service:8082}")
    private String cursoServiceUrl;

    /**
     * Obtiene los IDs de alumnos matriculados en una asignatura.
     * Ahora: obtiene el cursoId de la asignatura → luego los alumnos del curso.
     */
    public List<Integer> getAlumnoIdsByAsignatura(Integer asignaturaId) {
        try {
            // 1. Obtener la asignatura para conocer su cursoId
            String asigUrl = asignaturaServiceUrl + "/api/asignaturas/" + asignaturaId;
            Map response = restTemplate.getForObject(asigUrl, Map.class);
            if (response == null || !response.containsKey("cursoId")) {
                return Collections.emptyList();
            }
            Integer cursoId = (Integer) response.get("cursoId");

            // 2. Obtener los alumnos del curso
            String cursoUrl = cursoServiceUrl + "/api/cursos/" + cursoId + "/alumnos";
            ResponseEntity<List<Integer>> alumnosResponse = restTemplate.exchange(
                    cursoUrl,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<Integer>>() {}
            );
            return alumnosResponse.getBody() != null ? alumnosResponse.getBody() : Collections.emptyList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}
