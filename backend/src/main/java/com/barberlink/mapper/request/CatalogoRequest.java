package com.barberlink.mapper.request;

import com.barberlink.model.TipoCatalogo;

public record CatalogoRequest(
        Long barberiaId,
        TipoCatalogo tipo,
        String nombre,
        String descripcion,
        Double precio,
        String imagenUrl
) { }
