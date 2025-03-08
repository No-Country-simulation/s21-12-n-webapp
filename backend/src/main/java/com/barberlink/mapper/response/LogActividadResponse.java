package com.barberlink.mapper.response;

import java.time.LocalDateTime;

public record LogActividadResponse(
        Long id,
        Long usuarioId,
        String accion,
        String descripcion,
        LocalDateTime fecha
) { }
