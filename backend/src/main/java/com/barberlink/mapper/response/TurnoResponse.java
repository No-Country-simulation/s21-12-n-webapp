package com.barberlink.mapper.response;

import com.barberlink.model.EstadoTurno;
import com.barberlink.model.MetodoPago;
import java.time.LocalDateTime;

public record TurnoResponse(
        Long id,
        Long barberia_id,
        Long cliente_id,
        LocalDateTime fechaTurno,
        LocalDateTime horaInicio,
        LocalDateTime horaFin,
        EstadoTurno estado,
        MetodoPago metodoPago,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) { }
