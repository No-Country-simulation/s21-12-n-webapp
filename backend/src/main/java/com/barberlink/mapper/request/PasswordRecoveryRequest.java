package com.barberlink.mapper.request;

import java.time.LocalDateTime;

public record PasswordRecoveryRequest(
        Long usuarioId,
        String token,
        LocalDateTime expiresAt,
        Boolean utilizado
) { }
