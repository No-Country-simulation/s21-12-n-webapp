package com.barberlink.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "promocion")
public class Promocion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "barberia_id")
    private Barberia barberia;

    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private LocalDateTime fechaInicio;

    private LocalDateTime fechaFin;

    @Column(columnDefinition = "TEXT")
    private String condiciones; // Opcional

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Promocion() {
    }

    public Promocion(Long id, Barberia barberia, String titulo, String descripcion, LocalDateTime fechaInicio, LocalDateTime fechaFin, String condiciones, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.barberia = barberia;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.condiciones = condiciones;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getCondiciones() {
        return condiciones;
    }

    public void setCondiciones(String condiciones) {
        this.condiciones = condiciones;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
