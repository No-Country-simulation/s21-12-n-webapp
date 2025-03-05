package com.barberlink.mapper.response;

import java.time.LocalDateTime;

public record PasswordRecoveryResponse(
        Long id,
        Long usuarioId,
        String token,
        LocalDateTime createdAt,
        LocalDateTime expiresAt,
        Boolean utilizado
) { }
