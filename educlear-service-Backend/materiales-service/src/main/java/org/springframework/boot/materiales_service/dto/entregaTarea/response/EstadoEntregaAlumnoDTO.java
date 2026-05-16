package org.springframework.boot.materiales_service.dto.entregaTarea.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.materiales_service.enums.EstadoEntrega;

import java.math.BigDecimal;

/**
 * DTO para el endpoint GET /tarea/{tareaId}/estado-alumnos.
 * Lista todos los alumnos matriculados en la asignatura de la tarea,
 * indicando explícitamente si han entregado o no y su nota.
 */
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EstadoEntregaAlumnoDTO {
    private Integer alumnoId;
    private String alumnoNombre;
    private Integer idEntregaTarea;        // null si no existe entrega
    private EstadoEntrega estadoEntrega;   // no_entregado si no hay registro
    private BigDecimal calificacion;       // null si no calificado
}
