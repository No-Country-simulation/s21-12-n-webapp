package com.barberlink.mapper;

import com.barberlink.model.Administrador;
import com.barberlink.mapper.request.AdministradorRequest;
import com.barberlink.mapper.response.AdministradorResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AdministradorMapper {

    Administrador toAdministrador(AdministradorRequest request);

    AdministradorResponse toAdministradorResponse(Administrador administrador);
}
