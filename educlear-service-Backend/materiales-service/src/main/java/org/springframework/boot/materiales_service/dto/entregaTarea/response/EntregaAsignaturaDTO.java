package org.springframework.boot.materiales_service.dto.entregaTarea.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.materiales_service.enums.EstadoEntrega;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO para el endpoint GET /asignatura/{asignaturaId}.
 * Agrupa todas las entregas de una asignatura con los nombres ya resueltos.
 */
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EntregaAsignaturaDTO {
    private Integer idEntregaTarea;
    private Integer tareaId;
    private String tareaNombre;
    private Integer alumnoId;
    private String alumnoNombre;
    private EstadoEntrega estadoEntrega;
    private BigDecimal calificacion;
    private List<ArchivoEntregaInfoDTO> archivos;
}
