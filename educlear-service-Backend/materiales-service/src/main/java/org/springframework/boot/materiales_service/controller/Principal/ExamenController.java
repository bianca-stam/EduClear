package org.springframework.boot.materiales_service.controller.Principal;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.examen.request.CreateExamenDTO;
import org.springframework.boot.materiales_service.dto.examen.request.UpdateExamenDTO;
import org.springframework.boot.materiales_service.dto.examen.response.ExamenDTO;
import org.springframework.boot.materiales_service.exception.ResourceNotFoundException;
import org.springframework.boot.materiales_service.service.ExamenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiales/examenes")
public class ExamenController {

    @Autowired
    private ExamenService examenService;

    @GetMapping
    public List<ExamenDTO> getAll() {
        return examenService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamenDTO> getById(@PathVariable Integer id) {
        ExamenDTO examen = examenService.findById(id);
        if (examen == null) {
            throw new ResourceNotFoundException("El examen solicitado no existe.");
        }
        return ResponseEntity.ok(examen);
    }

    @PostMapping
    public ResponseEntity<ExamenDTO> create(@Valid @RequestBody CreateExamenDTO examen) {
        return new ResponseEntity<>(examenService.save(examen), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ExamenDTO> update(@PathVariable Integer id, @RequestBody UpdateExamenDTO examen) {
        ExamenDTO examenActualizado = examenService.update(id, examen);
        if (examenActualizado == null) {
            throw new ResourceNotFoundException("El examen que intentas actualizar ya no esta disponible.");
        }
        return ResponseEntity.ok(examenActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        examenService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tema/{temaId}")
    public ResponseEntity<List<ExamenDTO>> getByTemaId(@PathVariable Integer temaId) {
        return ResponseEntity.ok(examenService.findByTemaId(temaId));
    }
}
