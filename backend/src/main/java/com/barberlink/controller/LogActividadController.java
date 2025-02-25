package com.barberlink.controller;

import com.barberlink.mapper.request.LogActividadRequest;
import com.barberlink.mapper.response.LogActividadResponse;
import com.barberlink.service.LogActividadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Logs", description = "Endpoints para la auditoría y registro de actividades")
@RestController
@RequestMapping("/api/logs")
public class LogActividadController {

    private final LogActividadService logActividadService;

    public LogActividadController(LogActividadService logActividadService) {
        this.logActividadService = logActividadService;
    }

    @Operation(summary = "Registrar actividad", description = "Guarda un registro de actividad en el sistema",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Actividad registrada exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos")
            })
    @PostMapping
    public ResponseEntity<LogActividadResponse> logActivity(@RequestBody LogActividadRequest request) {
        LogActividadResponse response = logActividadService.logActivity(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obtener logs por usuario", description = "Recupera la lista de registros de actividad de un usuario específico",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Logs obtenidos exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Usuario o logs no encontrados")
            })
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<LogActividadResponse>> getLogsByUsuario(@PathVariable Long usuarioId) {
        List<LogActividadResponse> responses = logActividadService.getLogsByUsuario(usuarioId);
        return ResponseEntity.ok(responses);
    }
}
