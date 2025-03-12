package com.barberlink.mapper.request;

import java.util.List;

public record BarberiaRequest(
        String email,
        String contrasena,
        String telefono,
        String nombreBarberia,
        String cuilResponsable,
        String direccion,
        String descripcion,
        String fotoPerfil,
        Integer recomendaciones,
        List<HorarioRequest> horarios // nuevo atributo opcional
) { }
