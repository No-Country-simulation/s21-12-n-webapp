package com.barberlink.mapper.response;

import java.time.LocalDateTime;

public record ComentarioForoResponse(
        Long id,
        Long barberiaId,
        Long clienteId,
        int calificacion,
        String comentarioTexto,
        String respuesta,
        LocalDateTime fechaComentario,
        LocalDateTime updatedAt
) { }
