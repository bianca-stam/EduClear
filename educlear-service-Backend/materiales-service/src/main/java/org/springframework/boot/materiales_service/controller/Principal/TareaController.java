package org.springframework.boot.materiales_service.controller.Principal;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.tarea.request.CreateTareaDTO;
import org.springframework.boot.materiales_service.dto.tarea.request.UpdateTareaDTO;
import org.springframework.boot.materiales_service.dto.tarea.response.TareaDTO;
import org.springframework.boot.materiales_service.exception.ResourceNotFoundException;
import org.springframework.boot.materiales_service.service.TareaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiales/tareas")
public class TareaController {

    @Autowired
    private TareaService tareaService;

    @GetMapping
    public List<TareaDTO> getAll() {
        return tareaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TareaDTO> getById(@PathVariable Integer id) {
        TareaDTO tarea = tareaService.findById(id);
        if (tarea == null) {
            throw new ResourceNotFoundException("La tarea solicitada no existe.");
        }
        return ResponseEntity.ok(tarea);
    }

    @PostMapping
    public ResponseEntity<TareaDTO> create(@Valid @RequestBody CreateTareaDTO tarea) {
        return new ResponseEntity<>(tareaService.save(tarea), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TareaDTO> update(@PathVariable Integer id, @RequestBody UpdateTareaDTO tarea) {
        TareaDTO tareaActualizada = tareaService.update(id, tarea);
        if (tareaActualizada == null) {
            throw new ResourceNotFoundException("La tarea que intentas actualizar ya no esta disponible.");
        }
        return ResponseEntity.ok(tareaActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        tareaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
