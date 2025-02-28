package com.barberlink.mapper.response;

import java.time.LocalDateTime;

public record PromocionResponse(
        Long id,
        Long barberiaId,
        String titulo,
        String descripcion,
        LocalDateTime fechaInicio,
        LocalDateTime fechaFin,
        String condiciones,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) { }
