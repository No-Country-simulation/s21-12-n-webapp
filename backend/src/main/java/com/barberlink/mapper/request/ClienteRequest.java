package com.barberlink.mapper.request;

public record ClienteRequest(
        String email,
        String contrasena,
        String telefono,
        String nombreCompleto
) { }
