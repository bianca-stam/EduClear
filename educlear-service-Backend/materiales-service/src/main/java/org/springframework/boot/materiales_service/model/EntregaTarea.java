package org.springframework.boot.materiales_service.model;

import org.springframework.boot.materiales_service.enums.EstadoEntrega;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name="entregas_tarea")
public class EntregaTarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_entrega_tarea")
    private Integer id;

    @Column(name = "tarea_id")
    private Integer tareaId;

    @Column(name = "alumno_id")
    private Integer alumnoId; // Viene de usuario-service

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_entrega")
    private EstadoEntrega estadoEntrega = EstadoEntrega.no_entregado;

    @Column(precision = 4, scale = 2)
    private BigDecimal calificacion;
}