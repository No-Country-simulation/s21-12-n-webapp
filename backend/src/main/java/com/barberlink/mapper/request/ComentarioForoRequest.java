package com.barberlink.mapper.request;

public record ComentarioForoRequest(
        Long barberia_id,
        Long cliente_id,
        int calificacion,
        String comentarioTexto
) { }
