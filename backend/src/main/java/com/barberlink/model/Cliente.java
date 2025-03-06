package com.barberlink.model;

import lombok.*;
import jakarta.persistence.*;

@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "cliente")
public class Cliente extends Usuario {

    private String nombreCompleto;

    public Cliente(Long id) {
        super.setId(id);
    }

    public Cliente() {
    }

    public Cliente(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }
}
