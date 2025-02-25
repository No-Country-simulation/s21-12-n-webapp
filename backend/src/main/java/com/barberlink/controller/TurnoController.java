package com.barberlink.controller;

import com.barberlink.mapper.request.TurnoRequest;
import com.barberlink.mapper.response.TurnoResponse;
import com.barberlink.service.TurnoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Turnos", description = "Endpoints para la gestión de turnos y reservas")
@RestController
@RequestMapping("/api/turnos")
public class TurnoController {

    private final TurnoService turnoService;

    public TurnoController(TurnoService turnoService) {
        this.turnoService = turnoService;
    }

    @Operation(summary = "Reservar turno", description = "Permite a un cliente reservar un turno para un servicio de barbería",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Turno reservado exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
            })
    @PostMapping("/book")
    public ResponseEntity<TurnoResponse> bookTurno(@RequestBody TurnoRequest request) {
        TurnoResponse response = turnoService.bookTurno(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Cancelar turno", description = "Permite a un cliente cancelar un turno reservado",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Turno cancelado exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Turno no encontrado")
            })
    @PutMapping("/{id}/cancel")
    public ResponseEntity<TurnoResponse> cancelTurno(@PathVariable Long id) {
        TurnoResponse response = turnoService.cancelTurno(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Confirmar turno", description = "Permite confirmar un turno (por ejemplo, por la barbería)",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Turno confirmado exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Turno no encontrado")
            })
    @PutMapping("/{id}/confirm")
    public ResponseEntity<TurnoResponse> confirmTurno(@PathVariable Long id) {
        TurnoResponse response = turnoService.confirmTurno(id);
        return ResponseEntity.ok(response);
    }
}
