package org.example.cursoservice.controller;

import org.example.cursoservice.dto.CreateCursoDto;
import org.example.cursoservice.dto.CursoDto;
import org.example.cursoservice.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin(origins = "*")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @GetMapping
    public List<CursoDto> getAll() {
        return cursoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CursoDto> getById(@PathVariable Integer id) {
        CursoDto curso = cursoService.findById(id);
        return curso != null ? ResponseEntity.ok(curso) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<CursoDto> create(@RequestBody CreateCursoDto curso) {
        return new ResponseEntity<>(cursoService.save(curso), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        cursoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
