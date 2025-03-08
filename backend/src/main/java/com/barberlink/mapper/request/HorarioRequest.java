package com.barberlink.mapper.request;

import java.time.LocalDateTime;
import com.barberlink.model.EstadoHorario;

public record HorarioRequest(
        Long barberiaId,
        LocalDateTime fecha,
        LocalDateTime horaInicio,
        LocalDateTime horaFin,
        EstadoHorario estado
) { }
