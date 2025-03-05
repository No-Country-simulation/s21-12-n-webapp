package com.barberlink.mapper.request;

public record BarberiaRequest(
        String email,
        String contrasena,
        String telefono,
        String nombreBarberia,
        String cuilResponsable,
        String direccion,
        String descripcion,
        String fotoPerfil
) { }
