package org.springframework.boot.materiales_service.dto.entregaTarea.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.materiales_service.enums.EstadoEntrega;

import java.math.BigDecimal;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EntregaTareaDTO {
    private Integer id;
    private Integer tareaId;
    private Integer alumnoId;
    private EstadoEntrega estadoEntrega;
    private BigDecimal calificacion;
}
