package com.barberlink.mapper.response;

import com.barberlink.model.TipoCatalogo;
import java.time.LocalDateTime;

public record CatalogoResponse(
        Long id,
        Long barberia_id,
        TipoCatalogo tipo,
        String nombre,
        String descripcion,
        Double precio,
        String imagenUrl,
        java.time.LocalDateTime createdAt,
        java.time.LocalDateTime updatedAt
) { }
