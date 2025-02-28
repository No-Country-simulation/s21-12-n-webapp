package com.barberlink.mapper;

import com.barberlink.model.Promocion;
import com.barberlink.mapper.request.PromocionRequest;
import com.barberlink.mapper.response.PromocionResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PromocionMapper {

    Promocion toPromocion(PromocionRequest request);
    PromocionResponse toPromocionResponse(Promocion promocion);
}
