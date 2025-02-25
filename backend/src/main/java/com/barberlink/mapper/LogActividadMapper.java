package com.barberlink.mapper;

import com.barberlink.model.LogActividad;
import com.barberlink.mapper.request.LogActividadRequest;
import com.barberlink.mapper.response.LogActividadResponse;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LogActividadMapper {

    LogActividad toLogActividad(LogActividadRequest request);
    LogActividadResponse toLogActividadResponse(LogActividad logActividad);
    List<LogActividadResponse> toLogActividadResponseList(List<LogActividad> logs);
}
