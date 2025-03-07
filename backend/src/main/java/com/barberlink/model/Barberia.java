package com.barberlink.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "barberia")
@EqualsAndHashCode(callSuper = true)
public class Barberia extends Usuario {

    private String nombreBarberia;

    private String cuilResponsable;

    private String direccion;

    private String descripcion;

    private String fotoPerfil;

    private Integer recomendaciones;

    @OneToMany(mappedBy = "barberia", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Horario> horarios;

    public Barberia(Long id) {
        super.setId(id);
    }

    public Barberia(String nombreBarberia, String cuilResponsable, String direccion, String descripcion, String fotoPerfil, Integer recomendaciones) {
        this.nombreBarberia = nombreBarberia;
        this.cuilResponsable = cuilResponsable;
        this.direccion = direccion;
        this.descripcion = descripcion;
        this.fotoPerfil = fotoPerfil;
        this.recomendaciones = recomendaciones;
    }

    public Barberia(Long id, String email, String contrasena, String telefono, Rol rol, Boolean estado, LocalDateTime createdAt, LocalDateTime updatedAt, String nombreBarberia, String cuilResponsable, String direccion, String descripcion, String fotoPerfil, Integer recomendaciones) {
        super(id, email, contrasena, telefono, rol, estado, createdAt, updatedAt);
        this.nombreBarberia = nombreBarberia;
        this.cuilResponsable = cuilResponsable;
        this.direccion = direccion;
        this.descripcion = descripcion;
        this.fotoPerfil = fotoPerfil;
        this.recomendaciones = recomendaciones;
    }

    public Barberia() {

    }

    public String getNombreBarberia() {
        return nombreBarberia;
    }

    public void setNombreBarberia(String nombreBarberia) {
        this.nombreBarberia = nombreBarberia;
    }

    public String getCuilResponsable() {
        return cuilResponsable;
    }

    public void setCuilResponsable(String cuilResponsable) {
        this.cuilResponsable = cuilResponsable;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getFotoPerfil() {
        return fotoPerfil;
    }

    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }

    public Integer getRecomendaciones() {
        return recomendaciones;
    }

    public void setRecomendaciones(Integer recomendaciones) {
        this.recomendaciones = recomendaciones;
    }

    public List<Horario> getHorarios() {
        return horarios;
    }

    public void setHorarios(List<Horario> horarios) {
        this.horarios = horarios;
    }
}
