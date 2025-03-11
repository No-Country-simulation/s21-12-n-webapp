package com.barberlink.mapper;

import com.barberlink.mapper.request.ComentarioForoRequest;
import com.barberlink.mapper.response.ComentarioForoResponse;
import com.barberlink.model.ComentarioForo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ComentarioForoMapper {

    @Mapping(target = "barberia", ignore = true)
    @Mapping(target = "cliente", ignore = true)
    ComentarioForo toComentarioForo(ComentarioForoRequest request);

    @Mapping(target = "barberia_id", source = "barberia.id")
    @Mapping(target = "cliente_id", source = "cliente.id")
    ComentarioForoResponse toComentarioForoResponse(ComentarioForo comentarioForo);
}