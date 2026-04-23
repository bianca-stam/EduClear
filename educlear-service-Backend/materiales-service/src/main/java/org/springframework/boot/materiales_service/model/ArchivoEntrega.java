package org.springframework.boot.materiales_service.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="archivos_entrega")
public class ArchivoEntrega {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_archivo_tarea")
    private Integer id;

    @Column(name = "entrega_id")
    private Integer entregaId;

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
