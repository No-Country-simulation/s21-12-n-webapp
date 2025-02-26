package com.barberlink.mapper.response;

import java.time.LocalDateTime;

public record AdministradorResponse(
        Long id,
        String email,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) { }
