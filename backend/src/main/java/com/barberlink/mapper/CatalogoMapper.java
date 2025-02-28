package com.barberlink.mapper;

import com.barberlink.model.Catalogo;
import com.barberlink.mapper.request.CatalogoRequest;
import com.barberlink.mapper.response.CatalogoResponse;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface CatalogoMapper {

    Catalogo toCatalogo(CatalogoRequest request);
    CatalogoResponse toCatalogoResponse(Catalogo catalogo);
}
