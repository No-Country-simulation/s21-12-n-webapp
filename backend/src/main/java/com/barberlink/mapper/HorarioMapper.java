package com.barberlink.mapper;

import com.barberlink.model.Horario;
import com.barberlink.mapper.request.HorarioRequest;
import com.barberlink.mapper.response.HorarioResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HorarioMapper {

    Horario toHorario(HorarioRequest request);
    HorarioResponse toHorarioResponse(Horario horario);
}
