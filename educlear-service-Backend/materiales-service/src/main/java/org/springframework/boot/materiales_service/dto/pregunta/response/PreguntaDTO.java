package org.springframework.boot.materiales_service.dto.pregunta.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.materiales_service.enums.OpcionEnum;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PreguntaDTO {
    private Integer id;
    private Integer examenId;
    private String textoPregunta;
    private String opcionA;
    private String opcionB;
    private String opcionC;
    private String opcionD;
    private OpcionEnum respuestaCorrecta;
}
