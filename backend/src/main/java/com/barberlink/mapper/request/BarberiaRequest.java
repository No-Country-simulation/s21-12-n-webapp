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
<<<<<<< HEAD
        Integer recomendaciones,
        List<HorarioRequest> horarios // nuevo atributo opcional
=======
        Integer recomendaciones
        //List<HorarioRequest> horarios // nuevo atributo opcional
>>>>>>> 0d0041b2d668ecf170ebb209c40de3d592c06eb4
) { }
