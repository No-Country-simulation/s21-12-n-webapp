package com.barberlink.mapper.request;

import java.time.LocalDateTime;

public record LogActividadRequest(
        Long usuarioId,
        String accion,
        String descripcion,
        LocalDateTime fecha
) { }
