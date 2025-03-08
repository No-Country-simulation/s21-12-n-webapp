package com.barberlink.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "comentario_foro")
public class ComentarioForo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "barberia_id")
    private Barberia barberia;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private int calificacion; // Ejemplo: de 1 a 5

    @Column(columnDefinition = "TEXT")
    private String comentarioTexto;

    @Column(columnDefinition = "TEXT")
    private String respuesta; // Opcional, respuesta de la barbería

    private LocalDateTime fechaComentario;

    private LocalDateTime updatedAt;

    public ComentarioForo() {
    }

    public ComentarioForo(Long id, Barberia barberia, Cliente cliente, int calificacion, String comentarioTexto, String respuesta, LocalDateTime fechaComentario, LocalDateTime updatedAt) {
        this.id = id;
        this.barberia = barberia;
        this.cliente = cliente;
        this.calificacion = calificacion;
        this.comentarioTexto = comentarioTexto;
        this.respuesta = respuesta;
        this.fechaComentario = fechaComentario;
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

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public int getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(int calificacion) {
        this.calificacion = calificacion;
    }

    public String getComentarioTexto() {
        return comentarioTexto;
    }

    public void setComentarioTexto(String comentarioTexto) {
        this.comentarioTexto = comentarioTexto;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    public LocalDateTime getFechaComentario() {
        return fechaComentario;
    }

    public void setFechaComentario(LocalDateTime fechaComentario) {
        this.fechaComentario = fechaComentario;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
