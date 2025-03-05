package com.barberlink.mapper;

import com.barberlink.model.PasswordRecovery;
import com.barberlink.mapper.request.PasswordRecoveryRequest;
import com.barberlink.mapper.response.PasswordRecoveryResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PasswordRecoveryMapper {

    PasswordRecovery toPasswordRecovery(PasswordRecoveryRequest request);
    PasswordRecoveryResponse toPasswordRecoveryResponse(PasswordRecovery passwordRecovery);
}
