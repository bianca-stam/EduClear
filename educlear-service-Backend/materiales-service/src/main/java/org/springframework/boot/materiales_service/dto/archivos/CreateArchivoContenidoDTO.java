package org.springframework.boot.materiales_service.dto.archivos;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateArchivoContenidoDTO {
    @NotNull
    private Integer temaId;

    @NotBlank
    private String nombreArchivo;

    @NotBlank
    private String tipoMime;

    @NotNull
    private Integer pesoBytes;

    @NotEmpty
    private byte[] archivoBlob;
}
