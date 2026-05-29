package org.example.cursoservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@FeignClient(
        name = "asignatura-service",
        url = "http://asignatura-service:8083"
)
public interface AsignaturaClient {
    @GetMapping("/api/asignaturas/curso-ids")
    List<Integer> obtenerCursoIdsPorProfesor(
            @RequestParam Integer profesorId
    );

    // obtenerCursoIdsPorAlumno ya no se necesita:
    // ahora se consulta directamente desde matriculas_curso (local)
}
