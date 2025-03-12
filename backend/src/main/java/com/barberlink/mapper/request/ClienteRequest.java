package com.barberlink.mapper.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ClienteRequest(
        String email,
        String contrasena,
        String telefono,
        String nombreCompleto
) { }
