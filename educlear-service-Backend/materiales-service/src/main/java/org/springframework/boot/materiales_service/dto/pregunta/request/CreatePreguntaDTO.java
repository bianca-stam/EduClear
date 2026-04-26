package org.springframework.boot.materiales_service.dto.pregunta.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.materiales_service.enums.OpcionEnum;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreatePreguntaDTO {
    @NotNull
    private Integer examenId;

    @NotBlank
    private String textoPregunta;

    @NotBlank
    private String opcionA;

    @NotBlank
    private String opcionB;

    @NotBlank
    private String opcionC;

    @NotBlank
    private String opcionD;

    @NotNull
    private OpcionEnum respuestaCorrecta;
}
