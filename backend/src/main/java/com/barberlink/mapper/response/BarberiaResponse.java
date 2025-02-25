package com.barberlink.mapper.response;

import java.time.LocalDateTime;

public record BarberiaResponse(
        Long id,
        String email,
        String telefono,
        String nombreBarberia,
        String cuilResponsable,
        String direccion,
        String descripcion,
        String fotoPerfil,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) { }
