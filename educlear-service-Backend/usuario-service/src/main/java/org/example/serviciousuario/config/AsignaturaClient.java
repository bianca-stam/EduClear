package org.example.serviciousuario.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class AsignaturaClient {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${asignatura.service.url:http://asignatura-service:8083}")
    private String asignaturaServiceUrl;

    public List<Integer> getAlumnoIdsByAsignatura(Integer asignaturaId) {
        String url = asignaturaServiceUrl + "/api/matriculas/asignatura/" + asignaturaId + "/alumnos";
        
        ResponseEntity<List<Integer>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Integer>>() {}
        );
        
        return response.getBody();
    }
}
