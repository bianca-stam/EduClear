package org.springframework.boot.materiales_service.controller.Principal;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.pregunta.request.CreatePreguntaDTO;
import org.springframework.boot.materiales_service.dto.pregunta.request.UpdatePreguntaDTO;
import org.springframework.boot.materiales_service.dto.pregunta.response.PreguntaDTO;
import org.springframework.boot.materiales_service.exception.ResourceNotFoundException;
import org.springframework.boot.materiales_service.service.PreguntaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiales/preguntas")
public class PreguntaController {

    @Autowired
    private PreguntaService preguntaService;

    @GetMapping
    public List<PreguntaDTO> getAll() {
        return preguntaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PreguntaDTO> getById(@PathVariable Integer id) {
        PreguntaDTO pregunta = preguntaService.findById(id);
        if (pregunta == null) {
            throw new ResourceNotFoundException("La pregunta solicitada no existe.");
        }
        return ResponseEntity.ok(pregunta);
    }

    @PostMapping
    public ResponseEntity<PreguntaDTO> create(@Valid @RequestBody CreatePreguntaDTO pregunta) {
        return new ResponseEntity<>(preguntaService.save(pregunta), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PreguntaDTO> update(@PathVariable Integer id, @RequestBody UpdatePreguntaDTO pregunta) {
        PreguntaDTO preguntaActualizada = preguntaService.update(id, pregunta);
        if (preguntaActualizada == null) {
            throw new ResourceNotFoundException("La pregunta que intentas actualizar ya no esta disponible.");
        }
        return ResponseEntity.ok(preguntaActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        preguntaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
