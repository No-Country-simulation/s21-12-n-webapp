package com.barberlink.mapper.request;

import java.time.LocalDateTime;

public record PromocionRequest(
        Long barberiaId,
        String titulo,
        String descripcion,
        LocalDateTime fechaInicio,
        LocalDateTime fechaFin,
        String condiciones
) { }
