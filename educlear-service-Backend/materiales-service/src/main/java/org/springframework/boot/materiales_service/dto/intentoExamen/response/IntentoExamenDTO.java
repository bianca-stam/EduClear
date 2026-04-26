package org.springframework.boot.materiales_service.dto.intentoExamen.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.materiales_service.enums.EstadoIntento;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class IntentoExamenDTO {
    private Integer id;
    private Integer examenId;
    private Integer alumnoId;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaEnvio;
    private BigDecimal calificacionFinal;
    private EstadoIntento estado;
}
