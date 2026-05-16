package org.springframework.boot.materiales_service.controller.flujo;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.intentoExamen.request.CreateIntentoExamenDTO;
import org.springframework.boot.materiales_service.dto.intentoExamen.request.UpdateIntentoExamenDTO;
import org.springframework.boot.materiales_service.dto.intentoExamen.response.IntentoExamenDTO;
import org.springframework.boot.materiales_service.exception.ResourceNotFoundException;
import org.springframework.boot.materiales_service.service.IntentoExamenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiales/intentos-examen")
public class IntentoExamenController {

    @Autowired
    private IntentoExamenService intentoExamenService;

    @GetMapping
    public List<IntentoExamenDTO> getAll() {
        return intentoExamenService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<IntentoExamenDTO> getById(@PathVariable Integer id) {
        IntentoExamenDTO intentoExamen = intentoExamenService.findById(id);
        if (intentoExamen == null) {
            throw new ResourceNotFoundException("El intento de examen solicitado no existe.");
        }
        return ResponseEntity.ok(intentoExamen);
    }

    @PostMapping
    public ResponseEntity<IntentoExamenDTO> create(@Valid @RequestBody CreateIntentoExamenDTO intentoExamen) {
        return new ResponseEntity<>(intentoExamenService.save(intentoExamen), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<IntentoExamenDTO> update(@PathVariable Integer id, @RequestBody UpdateIntentoExamenDTO intentoExamen) {
        IntentoExamenDTO intentoActualizado = intentoExamenService.update(id, intentoExamen);
        if (intentoActualizado == null) {
            throw new ResourceNotFoundException("El intento de examen que intentas actualizar ya no esta disponible.");
        }
        return ResponseEntity.ok(intentoActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        intentoExamenService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/alumno/{alumnoId}/examen/{examenId}/existe")
    public ResponseEntity<Boolean> existsByAlumnoIdAndExamenId(@PathVariable Integer alumnoId, @PathVariable Integer examenId) {
        return ResponseEntity.ok(intentoExamenService.existsByAlumnoIdAndExamenId(alumnoId, examenId));
    }
}
