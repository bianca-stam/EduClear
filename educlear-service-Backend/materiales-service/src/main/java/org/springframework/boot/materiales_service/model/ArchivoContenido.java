package org.springframework.boot.materiales_service.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="archivos_contenido")
public class ArchivoContenido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contenido")
    private Integer id;

    @Column(name = "tema_id")
    private Integer temaId;

    @Column(name = "nombre_archivo", nullable = false)
    private String nombreArchivo;

    @Column(name = "tipo_mime", nullable = false)
    private String tipoMime;

    @Column(name = "peso_bytes")
    private Integer pesoBytes;

    @Lob
    @Column(name = "archivo_blob", nullable = false, columnDefinition = "LONGBLOB")
    private byte[] archivoBlob;
}