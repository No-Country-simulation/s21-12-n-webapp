package com.barberlink.mapper.response;

import java.time.LocalDateTime;

public record ClienteResponse(
        Long id,
        String email,
        String telefono,
        String nombreCompleto,
        // Se omiten datos sensibles como la contraseña
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) { }
