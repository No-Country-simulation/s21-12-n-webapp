package com.barberlink.mapper;

import com.barberlink.model.Turno;
import com.barberlink.mapper.request.TurnoRequest;
import com.barberlink.mapper.response.TurnoResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TurnoMapper {

    Turno toTurno(TurnoRequest request);
    TurnoResponse toTurnoResponse(Turno turno);
}
