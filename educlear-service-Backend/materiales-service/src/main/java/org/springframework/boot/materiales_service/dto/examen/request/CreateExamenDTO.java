package org.springframework.boot.materiales_service.dto.examen.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateExamenDTO {
    @NotNull
    private Integer temaId;

    @NotBlank
    private String titulo;

    @NotBlank
    private String descripcion;

    @NotNull
    private LocalDateTime fechaApertura;

    @NotNull
    private LocalDateTime fechaCierre;
}
