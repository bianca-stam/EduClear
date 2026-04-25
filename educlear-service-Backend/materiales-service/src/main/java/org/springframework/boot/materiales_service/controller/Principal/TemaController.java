package org.springframework.boot.materiales_service.controller.Principal;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.tema.request.CreateTemaDTO;
import org.springframework.boot.materiales_service.dto.tema.request.UpdateTemaDTO;
import org.springframework.boot.materiales_service.dto.tema.response.TemaDTO;
import org.springframework.boot.materiales_service.exception.ResourceNotFoundException;
import org.springframework.boot.materiales_service.service.TemaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiales/temas")
public class TemaController {

    @Autowired
    private TemaService temaService;

    @GetMapping
    public List<TemaDTO> getAll() {
        return temaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TemaDTO> getById(@PathVariable Integer id) {
        TemaDTO tema = temaService.findById(id);
        if (tema == null) {
            throw new ResourceNotFoundException("El tema solicitado no existe.");
        }
        return ResponseEntity.ok(tema);
    }

    @PostMapping
    public ResponseEntity<TemaDTO> create(@Valid @RequestBody CreateTemaDTO tema) {
        return new ResponseEntity<>(temaService.save(tema), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TemaDTO> update(@PathVariable Integer id, @RequestBody UpdateTemaDTO tema) {
        TemaDTO temaActualizado = temaService.update(id, tema);
        if (temaActualizado == null) {
            throw new ResourceNotFoundException("El tema que intentas actualizar ya no esta disponible.");
        }
        return ResponseEntity.ok(temaActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        temaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
