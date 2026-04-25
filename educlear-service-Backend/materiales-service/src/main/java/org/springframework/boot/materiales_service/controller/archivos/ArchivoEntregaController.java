package org.springframework.boot.materiales_service.controller.archivos;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.archivos.ArchivoEntregaDTO;
import org.springframework.boot.materiales_service.dto.archivos.CreateArchivoEntregaDTO;
import org.springframework.boot.materiales_service.dto.archivos.UpdateArchivoEntregaDTO;
import org.springframework.boot.materiales_service.exception.ResourceNotFoundException;
import org.springframework.boot.materiales_service.service.ArchivoEntregaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiales/archivos-entrega")
public class ArchivoEntregaController {

    @Autowired
    private ArchivoEntregaService archivoEntregaService;

    @GetMapping
    public List<ArchivoEntregaDTO> getAll() {
        return archivoEntregaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArchivoEntregaDTO> getById(@PathVariable Integer id) {
        ArchivoEntregaDTO archivoEntrega = archivoEntregaService.findById(id);
        if (archivoEntrega == null) {
            throw new ResourceNotFoundException("El archivo de entrega solicitado no existe.");
        }
        return ResponseEntity.ok(archivoEntrega);
    }

    @PostMapping
    public ResponseEntity<ArchivoEntregaDTO> create(@Valid @RequestBody CreateArchivoEntregaDTO archivoEntrega) {
        return new ResponseEntity<>(archivoEntregaService.save(archivoEntrega), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ArchivoEntregaDTO> update(@PathVariable Integer id, @RequestBody UpdateArchivoEntregaDTO archivoEntrega) {
        ArchivoEntregaDTO archivoActualizado = archivoEntregaService.update(id, archivoEntrega);
        if (archivoActualizado == null) {
            throw new ResourceNotFoundException("El archivo de entrega que intentas actualizar ya no esta disponible.");
        }
        return ResponseEntity.ok(archivoActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        archivoEntregaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
