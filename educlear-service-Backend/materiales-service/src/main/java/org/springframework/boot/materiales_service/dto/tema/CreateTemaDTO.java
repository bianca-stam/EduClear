package org.springframework.boot.materiales_service.dto.tema;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateTemaDTO {
    @NotBlank
    private String titulo;

    @NotBlank
    private String descripcion;

    @NotNull
    private Integer asignaturaId;
}
