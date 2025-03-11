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
<<<<<<< HEAD
        Integer recomendaciones,
        List<HorarioRequest> horarios // nuevo atributo opcional
=======
        Integer recomendaciones
        //List<HorarioRequest> horarios // nuevo atributo opcional
>>>>>>> 0d0041b2d668ecf170ebb209c40de3d592c06eb4
=======
        Integer recomendaciones
        //List<HorarioRequest> horarios // nuevo atributo opcional
>>>>>>> afb5fb47a99f669b8821df915d71eb411b6a3da8
) { }
