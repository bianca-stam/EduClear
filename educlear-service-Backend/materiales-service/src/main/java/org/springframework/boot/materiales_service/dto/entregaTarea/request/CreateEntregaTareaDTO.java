package org.springframework.boot.materiales_service.dto.entregaTarea.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.materiales_service.enums.EstadoEntrega;

import java.math.BigDecimal;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateEntregaTareaDTO {
    @NotNull
    private Integer tareaId;

    @NotNull
    private Integer alumnoId;

    @NotNull
    private EstadoEntrega estadoEntrega;

    @NotNull
    private BigDecimal calificacion;
}
