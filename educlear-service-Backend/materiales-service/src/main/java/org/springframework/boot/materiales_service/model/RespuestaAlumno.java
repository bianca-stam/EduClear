package org.springframework.boot.materiales_service.model;

import org.springframework.boot.materiales_service.model.enums.OpcionEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="respuestas_alumno")
public class RespuestaAlumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_respuesta")
    private Integer id;

    @Column(name = "intento_id")
    private Integer intentoId;

    @Column(name = "pregunta_id")
    private Integer preguntaId;

    @Enumerated(EnumType.STRING)
    @Column(name = "opcion_seleccionada")
    private OpcionEnum opcionSeleccionada;
}