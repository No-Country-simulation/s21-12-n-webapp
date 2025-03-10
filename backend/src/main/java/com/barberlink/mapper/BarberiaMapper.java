package com.barberlink.mapper;

import com.barberlink.model.Barberia;
import com.barberlink.mapper.request.BarberiaRequest;
import com.barberlink.mapper.response.BarberiaResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {HorarioMapper.class})
public interface BarberiaMapper {

    Barberia toBarberia(BarberiaRequest request);

    @Mapping(target = "horarios", source = "horarios")
    BarberiaResponse toBarberiaResponse(Barberia barberia);
}
