package org.springframework.boot.materiales_service.controller.flujo;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.respuestaAlumno.request.CreateRespuestaAlumnoDTO;
import org.springframework.boot.materiales_service.dto.respuestaAlumno.request.UpdateRespuestaAlumnoDTO;
import org.springframework.boot.materiales_service.dto.respuestaAlumno.response.RespuestaAlumnoDTO;
import org.springframework.boot.materiales_service.exception.ResourceNotFoundException;
import org.springframework.boot.materiales_service.service.RespuestaAlumnoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiales/respuestas-alumno")
public class RespuestaAlumnoController {

    @Autowired
    private RespuestaAlumnoService respuestaAlumnoService;

    @GetMapping
    public List<RespuestaAlumnoDTO> getAll() {
        return respuestaAlumnoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RespuestaAlumnoDTO> getById(@PathVariable Integer id) {
        RespuestaAlumnoDTO respuestaAlumno = respuestaAlumnoService.findById(id);
        if (respuestaAlumno == null) {
            throw new ResourceNotFoundException("La respuesta del alumno solicitada no existe.");
        }
        return ResponseEntity.ok(respuestaAlumno);
    }

    @PostMapping
    public ResponseEntity<RespuestaAlumnoDTO> create(@Valid @RequestBody CreateRespuestaAlumnoDTO respuestaAlumno) {
        return new ResponseEntity<>(respuestaAlumnoService.save(respuestaAlumno), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<RespuestaAlumnoDTO> update(@PathVariable Integer id, @RequestBody UpdateRespuestaAlumnoDTO respuestaAlumno) {
        RespuestaAlumnoDTO respuestaActualizada = respuestaAlumnoService.update(id, respuestaAlumno);
        if (respuestaActualizada == null) {
            throw new ResourceNotFoundException("La respuesta del alumno que intentas actualizar ya no esta disponible.");
        }
        return ResponseEntity.ok(respuestaActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        respuestaAlumnoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
