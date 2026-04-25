package org.springframework.boot.materiales_service.dto.tarea.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpdateTareaDTO {
    private Integer temaId;
    private String titulo;
    private String descripcion;
    private LocalDateTime fechaApertura;
    private LocalDateTime fechaCierre;
}
