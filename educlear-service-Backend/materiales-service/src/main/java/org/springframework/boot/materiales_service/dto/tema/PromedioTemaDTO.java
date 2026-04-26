package org.springframework.boot.materiales_service.dto.tema;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PromedioTemaDTO {

    private Integer temaId;
    private String tituloTema;
    private BigDecimal promedio; // null si no hay calificaciones registradas

}
