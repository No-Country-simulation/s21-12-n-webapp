package com.barberlink.mapper;

import com.barberlink.mapper.request.TurnoRequest;
import com.barberlink.mapper.response.TurnoResponse;
import com.barberlink.model.Barberia;
import com.barberlink.model.Cliente;
import com.barberlink.model.Turno;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface TurnoMapper {

    @Mapping(source = "barberiaId", target = "barberia", qualifiedByName = "mapBarberiaId")
    @Mapping(source = "clienteId", target = "cliente", qualifiedByName = "mapClienteId")
    Turno toTurno(TurnoRequest request);

<<<<<<< HEAD
<<<<<<< HEAD
=======
    @Mapping(target = "barberia_id", source = "barberia.id")
    @Mapping(target = "cliente_id", source = "cliente.id")
>>>>>>> 0d0041b2d668ecf170ebb209c40de3d592c06eb4
=======
    @Mapping(target = "barberia_id", source = "barberia.id")
    @Mapping(target = "cliente_id", source = "cliente.id")
>>>>>>> afb5fb47a99f669b8821df915d71eb411b6a3da8
    TurnoResponse toTurnoResponse(Turno turno);

    @Named("mapBarberiaId")
    default Barberia mapBarberiaId(Long id) {
        return id != null ? new Barberia(id) : null;
    }

    @Named("mapClienteId")
    default Cliente mapClienteId(Long id) {
        return id != null ? new Cliente(id) : null;
    }
}
