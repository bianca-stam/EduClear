package org.springframework.boot.materiales_service.model;

import org.springframework.boot.materiales_service.model.enums.EstadoIntento;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name="intentos_examen")
public class IntentoExamen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_intento")
    private Integer id;

    @Column(name = "examen_id")
    private Integer examenId;

    @Column(name = "alumno_id")
    private Integer alumnoId; // Viene de usuario-service

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDateTime fechaInicio;

    @Column(name = "fecha_envio")
    private LocalDateTime fechaEnvio;

    @Column(name = "calificacion_final", precision = 4, scale = 2)
    private BigDecimal calificacionFinal;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoIntento estado = EstadoIntento.en_curso;
}