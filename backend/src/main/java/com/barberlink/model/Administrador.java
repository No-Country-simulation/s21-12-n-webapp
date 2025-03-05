package com.barberlink.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "administrador")
public class Administrador extends Usuario {

    public Administrador(Long id, String email, String contrasena, String telefono,
                         Rol rol, Boolean estado, LocalDateTime createdAt, LocalDateTime updatedAt) {
        super(id, email, contrasena, telefono, rol, estado, createdAt, updatedAt);
    }

    public Administrador() {
    }
}
