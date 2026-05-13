package org.springframework.boot.materiales_service.dto.tema;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TemaDTO {

    private Integer idTema;
    private String titulo;
    private String descripcion;
    private Integer asignaturaId;

}
