package org.springframework.boot.asignatura_service.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="asignaturas")
public class Asignatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_asignatura")
    private Integer id;

    @Column(nullable = false)
    private String nombre;

    // Al estar en otro microservicio, guardamos solo el ID del curso
    @Column(name = "curso_id")
    private Integer cursoId;

    // Al estar en otro microservicio, guardamos solo el ID del profesor (usuario)
    @Column(name = "profesor_id")
    private Integer profesorId;
}