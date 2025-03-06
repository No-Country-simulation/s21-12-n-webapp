package com.barberlink.mapper.request;

import com.barberlink.model.EstadoTurno;
import com.barberlink.model.MetodoPago;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TurnoRequest(
        @JsonProperty("barberia_id") Long barberiaId,
        @JsonProperty("cliente_id") Long clienteId,
        @JsonProperty("fechaTurno") LocalDateTime fechaTurno,
        @JsonProperty("horaInicio") LocalDateTime horaInicio,
        @JsonProperty("horaFin") LocalDateTime horaFin,
        @JsonProperty("estado") EstadoTurno estado,
        @JsonProperty("metodoPago") MetodoPago metodoPago
) { }
