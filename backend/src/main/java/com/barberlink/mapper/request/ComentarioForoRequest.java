package com.barberlink.mapper.request;

public record ComentarioForoRequest(
        Long barberiaId,
        Long clienteId,
        int calificacion,
        String comentarioTexto
) { }
