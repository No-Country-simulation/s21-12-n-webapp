package com.barberlink.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Table(name = "barberia")
@EqualsAndHashCode(callSuper = true)
public class Barberia extends Usuario {

    private String nombreBarberia;

    private String cuilResponsable;

    private String direccion;

    private String descripcion;

    private String fotoPerfil;

    public Barberia(Long id, String email, String contrasena, String telefono, Rol rol, Boolean estado, LocalDateTime createdAt, LocalDateTime updatedAt, String nombreBarberia, String cuilResponsable, String direccion, String descripcion, String fotoPerfil) {
        super(id, email, contrasena, telefono, rol, estado, createdAt, updatedAt);
        this.nombreBarberia = nombreBarberia;
        this.cuilResponsable = cuilResponsable;
        this.direccion = direccion;
        this.descripcion = descripcion;
        this.fotoPerfil = fotoPerfil;
    }

    public Barberia(String nombreBarberia, String cuilResponsable, String direccion, String descripcion, String fotoPerfil) {
        this.nombreBarberia = nombreBarberia;
        this.cuilResponsable = cuilResponsable;
        this.direccion = direccion;
        this.descripcion = descripcion;
        this.fotoPerfil = fotoPerfil;
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
}
