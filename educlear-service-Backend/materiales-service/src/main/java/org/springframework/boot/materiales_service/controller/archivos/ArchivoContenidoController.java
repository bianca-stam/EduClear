package org.springframework.boot.materiales_service.controller.archivos;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.archivos.ArchivoContenidoDTO;
import org.springframework.boot.materiales_service.dto.archivos.CreateArchivoContenidoDTO;
import org.springframework.boot.materiales_service.dto.archivos.UpdateArchivoContenidoDTO;
import org.springframework.boot.materiales_service.exception.ResourceNotFoundException;
import org.springframework.boot.materiales_service.service.ArchivoContenidoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiales/archivos-contenido")
public class ArchivoContenidoController {

    @Autowired
    private ArchivoContenidoService archivoContenidoService;

    @GetMapping
    public List<ArchivoContenidoDTO> getAll() {
        return archivoContenidoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArchivoContenidoDTO> getById(@PathVariable Integer id) {
        ArchivoContenidoDTO archivoContenido = archivoContenidoService.findById(id);
        if (archivoContenido == null) {
            throw new ResourceNotFoundException("El archivo de contenido solicitado no existe.");
        }
        return ResponseEntity.ok(archivoContenido);
    }

    @PostMapping
    public ResponseEntity<ArchivoContenidoDTO> create(@Valid @RequestBody CreateArchivoContenidoDTO archivoContenido) {
        return new ResponseEntity<>(archivoContenidoService.save(archivoContenido), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ArchivoContenidoDTO> update(@PathVariable Integer id, @RequestBody UpdateArchivoContenidoDTO archivoContenido) {
        ArchivoContenidoDTO archivoActualizado = archivoContenidoService.update(id, archivoContenido);
        if (archivoActualizado == null) {
            throw new ResourceNotFoundException("El archivo de contenido que intentas actualizar ya no esta disponible.");
        }
        return ResponseEntity.ok(archivoActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        archivoContenidoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
