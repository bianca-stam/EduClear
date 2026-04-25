package org.springframework.boot.materiales_service.controller.flujo;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.entregaTarea.request.CreateEntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.request.UpdateEntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.response.EntregaTareaDTO;
import org.springframework.boot.materiales_service.exception.ResourceNotFoundException;
import org.springframework.boot.materiales_service.service.EntregaTareaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiales/entregas-tarea")
public class EntregaTareaController {

    @Autowired
    private EntregaTareaService entregaTareaService;

    @GetMapping
    public List<EntregaTareaDTO> getAll() {
        return entregaTareaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntregaTareaDTO> getById(@PathVariable Integer id) {
        EntregaTareaDTO entregaTarea = entregaTareaService.findById(id);
        if (entregaTarea == null) {
            throw new ResourceNotFoundException("La entrega solicitada no existe.");
        }
        return ResponseEntity.ok(entregaTarea);
    }

    @PostMapping
    public ResponseEntity<EntregaTareaDTO> create(@Valid @RequestBody CreateEntregaTareaDTO entregaTarea) {
        return new ResponseEntity<>(entregaTareaService.save(entregaTarea), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EntregaTareaDTO> update(@PathVariable Integer id, @RequestBody UpdateEntregaTareaDTO entregaTarea) {
        EntregaTareaDTO entregaActualizada = entregaTareaService.update(id, entregaTarea);
        if (entregaActualizada == null) {
            throw new ResourceNotFoundException("La entrega que intentas actualizar ya no esta disponible.");
        }
        return ResponseEntity.ok(entregaActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        entregaTareaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
