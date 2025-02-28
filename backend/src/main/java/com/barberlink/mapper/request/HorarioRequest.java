package com.barberlink.mapper.request;

import com.barberlink.model.EstadoHorario;
import java.time.LocalDateTime;

public record HorarioRequest(
        Long barberiaId,
        LocalDateTime fecha,
        LocalDateTime horaInicio,
        LocalDateTime horaFin,
        EstadoHorario estado
) { }
