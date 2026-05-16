package org.springframework.boot.materiales_service.dto.entregaTarea.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

/**
 * DTO con metadatos del archivo adjunto a una entrega (sin el blob binario).
 */
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArchivoEntregaInfoDTO {
    private Integer id;
    private String nombreArchivo;
    private String tipoMime;
    private Integer pesoBytes;
}
