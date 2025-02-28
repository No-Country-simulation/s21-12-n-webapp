package com.barberlink.mapper;

import com.barberlink.model.ComentarioForo;
import com.barberlink.mapper.request.ComentarioForoRequest;
import com.barberlink.mapper.response.ComentarioForoResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ComentarioForoMapper {

    ComentarioForo toComentarioForo(ComentarioForoRequest request);
    ComentarioForoResponse toComentarioForoResponse(ComentarioForo comentarioForo);
}
