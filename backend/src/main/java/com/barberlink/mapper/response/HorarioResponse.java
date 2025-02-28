package com.barberlink.mapper.response;

import com.barberlink.model.EstadoHorario;
import java.time.LocalDateTime;

public record HorarioResponse(
        Long id,
        Long barberiaId,
        LocalDateTime fecha,
        LocalDateTime horaInicio,
        LocalDateTime horaFin,
        EstadoHorario estado
) { }
