package com.barberlink.mapper;

import com.barberlink.model.Horario;
import com.barberlink.mapper.request.HorarioRequest;
import com.barberlink.mapper.response.HorarioResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HorarioMapper {

    @Mapping(target = "barberia", ignore = true)
    Horario toHorario(HorarioRequest request);

    @Mapping(target = "barberiaId", source = "barberia.id")
    HorarioResponse toHorarioResponse(Horario horario);
}
