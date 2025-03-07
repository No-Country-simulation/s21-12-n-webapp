package com.barberlink.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity

@Table(name = "horario")
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "barberia_id")
    private Barberia barberia;

    private LocalDateTime fecha;

    private LocalDateTime horaInicio;

    private LocalDateTime horaFin;

    @Enumerated(EnumType.STRING)
    private EstadoHorario estado;

    public Horario() {
    }

    public Horario(Long id, Barberia barberia, LocalDateTime fecha, LocalDateTime horaInicio, LocalDateTime horaFin, EstadoHorario estado) {
        this.id = id;
        this.barberia = barberia;
        this.fecha = fecha;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.estado = estado;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Barberia getBarberia() {
        return barberia;
    }

    public void setBarberia(Barberia barberia) {
        this.barberia = barberia;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public LocalDateTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalDateTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalDateTime getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(LocalDateTime horaFin) {
        this.horaFin = horaFin;
    }

    public EstadoHorario getEstado() {
        return estado;
    }

    public void setEstado(EstadoHorario estado) {
        this.estado = estado;
    }
}
