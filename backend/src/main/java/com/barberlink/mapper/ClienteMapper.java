package com.barberlink.mapper;

import com.barberlink.model.Cliente;
import com.barberlink.mapper.request.ClienteRequest;
import com.barberlink.mapper.response.ClienteResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClienteMapper {

    Cliente toCliente(ClienteRequest request);
    ClienteResponse toClienteResponse(Cliente cliente);
}
