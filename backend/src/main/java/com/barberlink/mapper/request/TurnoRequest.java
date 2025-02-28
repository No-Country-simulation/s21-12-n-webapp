package com.barberlink.mapper.request;

import com.barberlink.model.EstadoTurno;
import com.barberlink.model.MetodoPago;
import java.time.LocalDateTime;

public record TurnoRequest(
        Long barberiaId,
        Long clienteId,
        LocalDateTime fechaTurno,
        LocalDateTime horaInicio,
        LocalDateTime horaFin,
        EstadoTurno estado,
        MetodoPago metodoPago
) { }
