package com.barberlink.mapper.request;

import com.barberlink.model.TipoNotificacion;

public record NotificacionRequest(
        Long usuarioId,
        String mensaje,
        TipoNotificacion tipo,
        Boolean estado
) { }
