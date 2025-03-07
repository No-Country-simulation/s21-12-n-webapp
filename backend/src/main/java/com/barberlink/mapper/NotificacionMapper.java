package com.barberlink.mapper;

import com.barberlink.model.Notificacion;
import com.barberlink.mapper.request.NotificacionRequest;
import com.barberlink.mapper.response.NotificacionResponse;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NotificacionMapper {

    Notificacion toNotificacion(NotificacionRequest request);
    NotificacionResponse toNotificacionResponse(Notificacion notificacion);
    List<NotificacionResponse> toNotificacionResponseList(List<Notificacion> notificaciones);
}
