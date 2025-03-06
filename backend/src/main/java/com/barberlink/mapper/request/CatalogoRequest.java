package com.barberlink.mapper.request;

import com.barberlink.model.TipoCatalogo;

public record CatalogoRequest(
        Long barberia_id,
        TipoCatalogo tipo,
        String nombre,
        String descripcion,
        Double precio,
        String imagenUrl
) { }
