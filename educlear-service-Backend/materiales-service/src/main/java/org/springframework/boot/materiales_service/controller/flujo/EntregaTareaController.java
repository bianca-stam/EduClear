package org.springframework.boot.materiales_service.controller.flujo;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.materiales_service.dto.entregaTarea.request.CreateEntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.request.UpdateEntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.response.EntregaAsignaturaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.response.EntregaTareaDTO;
import org.springframework.boot.materiales_service.dto.entregaTarea.response.EstadoEntregaAlumnoDTO;
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

    @GetMapping("/alumno/{alumnoId}/tarea/{tareaId}/existe")
    public ResponseEntity<Boolean> existsByAlumnoIdAndTareaId(@PathVariable Integer alumnoId, @PathVariable Integer tareaId) {
        return ResponseEntity.ok(entregaTareaService.existsByAlumnoIdAndTareaId(alumnoId, tareaId));
    }

    /**
     * GET /api/materiales/entregas-tarea/asignatura/{asignaturaId}
     * Retorna todas las entregas de la asignatura con nombre de tarea, alumno y archivos adjuntos.
     * Sustituye el cruce de datos en memoria que hacía el Frontend.
     */
    @GetMapping("/asignatura/{asignaturaId}")
    public ResponseEntity<List<EntregaAsignaturaDTO>> getByAsignatura(@PathVariable Integer asignaturaId) {
        return ResponseEntity.ok(entregaTareaService.findByAsignaturaId(asignaturaId));
    }

    /**
     * GET /api/materiales/entregas-tarea/tarea/{tareaId}/estado-alumnos
     * Devuelve el estado de entrega de TODOS los alumnos matriculados en la asignatura de la tarea,
     * incluyendo los que no han entregado (con estado 'no_entregado').
     */
    @GetMapping("/tarea/{tareaId}/estado-alumnos")
    public ResponseEntity<List<EstadoEntregaAlumnoDTO>> getEstadoAlumnosByTarea(@PathVariable Integer tareaId) {
        return ResponseEntity.ok(entregaTareaService.getEstadoEntregasAlumnosByTareaId(tareaId));
    }

    /**
     * GET /api/materiales/entregas-tarea/tarea/{tareaId}/alumno/{alumnoId}
     * Retorna la entrega concreta de un alumno para una tarea.
     * Sustituye el .find() que hacía el Frontend sobre todas las entregas.
     */
    @GetMapping("/tarea/{tareaId}/alumno/{alumnoId}")
    public ResponseEntity<EntregaTareaDTO> getByTareaAndAlumno(
            @PathVariable Integer tareaId,
            @PathVariable Integer alumnoId) {
        EntregaTareaDTO entrega = entregaTareaService.findByTareaIdAndAlumnoId(tareaId, alumnoId);
        if (entrega == null) {
            throw new ResourceNotFoundException("No se encontró entrega del alumno " + alumnoId + " para la tarea " + tareaId);
        }
        return ResponseEntity.ok(entrega);
    }
}
