package com.barberlink.mapper.response;

import com.barberlink.model.TipoNotificacion;
import java.time.LocalDateTime;

public record NotificacionResponse(
        Long id,
        Long usuarioId,
        String mensaje,
        TipoNotificacion tipo,
        Boolean estado,
        LocalDateTime createdAt
) { }
