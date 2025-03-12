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

import java.util.List;

@Tag(name = "Turnos", description = "Endpoints para la gestión de turnos y reservas")
@RestController
@RequestMapping("/api/turnos")
public class TurnoController {

    private final TurnoService turnoService;

    public TurnoController(TurnoService turnoService) {
        this.turnoService = turnoService;
    }

    @Operation(summary = "Reservar turno", description = "Permite a un cliente reservar un turno para un servicio de barbería",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponse(responseCode = "200", description = "Turno reservado exitosamente")
    @PostMapping("/book")
    public ResponseEntity<TurnoResponse> bookTurno(@RequestBody TurnoRequest request) {
        TurnoResponse response = turnoService.bookTurno(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obtener todos los turnos", description = "Recupera la lista de turnos", security = @SecurityRequirement(name = "bearer-key"))
    @GetMapping
    public ResponseEntity<List<TurnoResponse>> getAllTurnos() {
        List<TurnoResponse> list = turnoService.getAllTurnos();
        return ResponseEntity.ok(list);
    }

    @Operation(summary = "Cancelar turno", description = "Permite cancelar un turno reservado", security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponse(responseCode = "200", description = "Turno cancelado exitosamente")
    @PutMapping("/{id}/cancel")
    public ResponseEntity<TurnoResponse> cancelTurno(@PathVariable Long id) {
        TurnoResponse response = turnoService.cancelTurno(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Confirmar turno", description = "Permite confirmar un turno", security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponse(responseCode = "200", description = "Turno confirmado exitosamente")
    @PutMapping("/{id}/confirm")
    public ResponseEntity<TurnoResponse> confirmTurno(@PathVariable Long id) {
        TurnoResponse response = turnoService.confirmTurno(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Eliminar turno", description = "Elimina un turno por su ID", security = @SecurityRequirement(name = "bearer-key"))
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTurno(@PathVariable Long id) {
        turnoService.deleteTurno(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<TurnoResponse>> getTurnosCliente(@PathVariable Long id) {
        List<TurnoResponse> list = turnoService.getTurnosCliente(id);
        return ResponseEntity.ok(list);
    }

}
