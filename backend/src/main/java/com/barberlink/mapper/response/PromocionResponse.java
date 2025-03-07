package com.barberlink.mapper.response;

import java.time.LocalDateTime;

public record PromocionResponse(
        Long id,
        Long barberia_id,
        String titulo,
        String descripcion,
        LocalDateTime fechaInicio,
        LocalDateTime fechaFin,
        String condiciones,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) { }
