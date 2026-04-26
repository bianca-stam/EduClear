package org.springframework.boot.materiales_service.dto.respuestaAlumno.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.materiales_service.enums.OpcionEnum;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateRespuestaAlumnoDTO {
    @NotNull
    private Integer intentoId;

    @NotNull
    private Integer preguntaId;

    @NotNull
    private OpcionEnum opcionSeleccionada;
}
