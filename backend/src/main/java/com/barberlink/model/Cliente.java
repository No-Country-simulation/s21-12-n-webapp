package com.barberlink.model;

import lombok.*;
import jakarta.persistence.*;

@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "cliente")
public class Cliente extends Usuario {

    private String nombreCompleto;

    // Puedes agregar otros atributos específicos (dirección, etc.) si lo requieres.


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
