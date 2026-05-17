package org.springframework.boot.materiales_service.dto.intentoExamen.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EstadoIntentoAlumnoDTO {
    private Integer alumnoId;
    private String alumnoNombre;
    private Integer idIntentoExamen;        // null si no existe intento
    private String estadoIntento;           // no_iniciado si no hay registro
    private BigDecimal calificacionFinal;   // null si no calificado
}
