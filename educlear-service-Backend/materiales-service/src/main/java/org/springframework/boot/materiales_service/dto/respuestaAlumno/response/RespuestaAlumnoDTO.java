package org.springframework.boot.materiales_service.dto.respuestaAlumno.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.materiales_service.enums.OpcionEnum;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RespuestaAlumnoDTO {
    private Integer id;
    private Integer intentoId;
    private Integer preguntaId;
    private OpcionEnum opcionSeleccionada;
}
