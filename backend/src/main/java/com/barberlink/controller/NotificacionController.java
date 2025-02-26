package com.barberlink.controller;

import com.barberlink.mapper.request.NotificacionRequest;
import com.barberlink.mapper.response.NotificacionResponse;
import com.barberlink.service.NotificacionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Notificaciones", description = "Endpoints para la gestión de notificaciones")
@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {

    private final NotificacionService notificacionService;

    public NotificacionController(NotificacionService notificacionService) {
        this.notificacionService = notificacionService;
    }

    @Operation(summary = "Crear notificación", description = "Genera una notificación para un usuario", security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notificación creada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    @PostMapping
    public ResponseEntity<NotificacionResponse> createNotificacion(@RequestBody NotificacionRequest request) {
        NotificacionResponse response = notificacionService.createNotificacion(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obtener notificaciones por usuario", description = "Recupera las notificaciones de un usuario", security = @SecurityRequirement(name = "bearer-key"))
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<NotificacionResponse>> getNotificacionesByUsuario(@PathVariable Long usuarioId) {
        List<NotificacionResponse> list = notificacionService.getNotificacionesByUsuario(usuarioId);
        return ResponseEntity.ok(list);
    }

    @Operation(summary = "Marcar notificación como leída", description = "Actualiza el estado de una notificación a leída", security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Notificación actualizada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Notificación no encontrada")
    })
    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        notificacionService.markAsRead(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Eliminar notificación", description = "Elimina una notificación por su ID", security = @SecurityRequirement(name = "bearer-key"))
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotificacion(@PathVariable Long id) {
        notificacionService.deleteNotificacion(id);
        return ResponseEntity.noContent().build();
    }
}
