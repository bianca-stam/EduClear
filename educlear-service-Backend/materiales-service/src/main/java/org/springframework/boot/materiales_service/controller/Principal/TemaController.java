package org.springframework.boot.materiales_service.controller.Principal;

import org.springframework.boot.materiales_service.dto.tema.CreateTemaDTO;
import org.springframework.boot.materiales_service.dto.tema.TemaDTO;
import org.springframework.boot.materiales_service.dto.tema.UpdateTemaDTO;
import org.springframework.boot.materiales_service.service.TemaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/temas")
public class TemaController {
    private final TemaService temaService;

    public TemaController(TemaService temaService) {
        this.temaService = temaService;
    }

    // Crear un tema
    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateTemaDTO dto) {
        TemaDTO creado = temaService.create(dto);
        return new ResponseEntity<>(creado, HttpStatus.CREATED);
    }

    // Obtener todos los temas
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(temaService.findAll());
    }

    // Obtener un tema por id
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(temaService.findById(id));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // Actualizar un tema
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody UpdateTemaDTO dto) {
        try {
            return ResponseEntity.ok(temaService.update(id, dto));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("Error", ex.getMessage()));
        }
    }

    // Eliminar un tema
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            temaService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // Promedio de calificaciones por tema de un alumno
    @GetMapping("/alumno/{alumnoId}/promedios")
    public ResponseEntity<?> getPromediosPorAlumno(@PathVariable Integer alumnoId) {
        return ResponseEntity.ok(temaService.getPromediosPorAlumno(alumnoId));
    }
}
