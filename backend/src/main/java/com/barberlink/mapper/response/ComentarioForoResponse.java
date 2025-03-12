package com.barberlink.mapper.response;

import java.time.LocalDateTime;

public record ComentarioForoResponse(
        Long id,
        Long barberia_id,
        Long cliente_id,
        int calificacion,
        String comentarioTexto,
        String respuesta,
        LocalDateTime fechaComentario,
        LocalDateTime updatedAt
) { }
