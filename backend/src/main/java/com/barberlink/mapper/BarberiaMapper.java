package com.barberlink.mapper;

import com.barberlink.model.Barberia;
import com.barberlink.mapper.request.BarberiaRequest;
import com.barberlink.mapper.response.BarberiaResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BarberiaMapper {
    Barberia toBarberia(BarberiaRequest request);
    BarberiaResponse toBarberiaResponse(Barberia barberia);
}

