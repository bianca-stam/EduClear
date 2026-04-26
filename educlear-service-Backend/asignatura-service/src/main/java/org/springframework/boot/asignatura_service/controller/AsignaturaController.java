package org.springframework.boot.asignatura_service.controller;

import org.springframework.boot.asignatura_service.dto.AsignaturaDTO;
import org.springframework.boot.asignatura_service.service.AsignaturaService;
import org.springframework.boot.asignatura_service.model.Asignatura;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asignaturas")

public class AsignaturaController {

    private AsignaturaService asignaturaService;

    public AsignaturaController(AsignaturaService asignaturaService) {
        this.asignaturaService = asignaturaService;
    }

    @GetMapping
    public ResponseEntity<List<AsignaturaDTO>> getAll() {
        return ResponseEntity.ok(asignaturaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AsignaturaDTO> getById(@PathVariable Integer id) {
        AsignaturaDTO asignatura = asignaturaService.findById(id);
        return asignatura != null ? ResponseEntity.ok(asignatura)
                : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<AsignaturaDTO> create(@RequestBody Asignatura asignatura) {
        return new ResponseEntity<>(asignaturaService.save(asignatura), HttpStatus.CREATED);
    }

    @GetMapping("/curso-ids")
    public ResponseEntity<List<Integer>> getCursoIdsByProfesor(
            @RequestParam Integer profesorId) {

        return ResponseEntity.ok(
                asignaturaService.obtenerCursoIdsPorProfesor(profesorId)
        );
    }

    @GetMapping("/curso-ids/alumno")
    public ResponseEntity<List<Integer>> getCursoIdsByAlumno(
            @RequestParam Integer alumnoId) {

        return ResponseEntity.ok(
                asignaturaService.obtenerCursoIdsPorAlumno(alumnoId)
        );
    }


}
