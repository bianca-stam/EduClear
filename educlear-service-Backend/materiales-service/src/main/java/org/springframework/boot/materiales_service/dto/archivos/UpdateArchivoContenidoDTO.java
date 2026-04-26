package org.springframework.boot.materiales_service.dto.archivos;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpdateArchivoContenidoDTO {
    private Integer temaId;
    private String nombreArchivo;
    private String tipoMime;
    private Integer pesoBytes;
    private byte[] archivoBlob;
}
