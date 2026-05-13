package org.springframework.boot.asignatura_service.controller;

import org.springframework.boot.asignatura_service.dto.MatriculaAsignaturaDTO;
import org.springframework.boot.asignatura_service.model.MatriculaAsignatura;
import org.springframework.boot.asignatura_service.service.MatriculaAsignaturaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matriculas")

public class MatriculaAsignaturaController {

    private final MatriculaAsignaturaService service;

    public MatriculaAsignaturaController(MatriculaAsignaturaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<MatriculaAsignaturaDTO>> getAll() {
        return ResponseEntity.ok(service.obtenerTodas());
    }

    @PostMapping
    public ResponseEntity<MatriculaAsignaturaDTO> create(@RequestBody MatriculaAsignatura matricula) {
        MatriculaAsignaturaDTO nuevaMatricula = service.guardar(matricula);
        return new ResponseEntity<>(nuevaMatricula, HttpStatus.CREATED);
    }

    // IDs de asignaturas en las que un alumno está matriculado
    @GetMapping("/alumno/{alumnoId}/asignaturas")
    public ResponseEntity<List<Integer>> getAsignaturaIdsByAlumno(@PathVariable Integer alumnoId) {
        return ResponseEntity.ok(service.getAsignaturaIdsByAlumno(alumnoId));
    }
}