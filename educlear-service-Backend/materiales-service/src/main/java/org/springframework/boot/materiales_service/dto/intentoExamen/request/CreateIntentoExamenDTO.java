package org.springframework.boot.materiales_service.dto.intentoExamen.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.materiales_service.enums.EstadoIntento;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.boot.materiales_service.enums.OpcionEnum;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateIntentoExamenDTO {
    @NotNull
    private Integer examenId;

    @NotNull
    private Integer alumnoId;

    @NotNull
    private LocalDateTime fechaInicio;

    @NotNull
    private LocalDateTime fechaEnvio;

    private BigDecimal calificacionFinal;

    @NotNull
    private EstadoIntento estado;

    private List<RespuestaExamenDTO> respuestas;

    @Getter
    @Setter
    public static class RespuestaExamenDTO {
        @NotNull
        private Integer preguntaId;

        @NotNull
        private OpcionEnum opcionSeleccionada;
    }
}
