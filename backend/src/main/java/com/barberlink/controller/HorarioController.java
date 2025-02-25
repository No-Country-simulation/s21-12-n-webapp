package com.barberlink.controller;

import com.barberlink.mapper.request.HorarioRequest;
import com.barberlink.mapper.response.HorarioResponse;
import com.barberlink.service.HorarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Horarios", description = "Endpoints para la gestión de disponibilidad de turnos")
@RestController
@RequestMapping("/api/horarios")
public class HorarioController {

    private final HorarioService horarioService;

    public HorarioController(HorarioService horarioService) {
        this.horarioService = horarioService;
    }

    @Operation(summary = "Agregar horario", description = "Permite a una barbería agregar un nuevo horario disponible",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Horario agregado exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos")
            })
    @PostMapping
    public ResponseEntity<HorarioResponse> addHorario(@RequestBody HorarioRequest request) {
        HorarioResponse response = horarioService.addHorario(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Actualizar horario", description = "Actualiza los datos de un horario existente",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Horario actualizado exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Horario no encontrado")
            })
    @PutMapping("/{id}")
    public ResponseEntity<HorarioResponse> updateHorario(@PathVariable Long id, @RequestBody HorarioRequest request) {
        HorarioResponse response = horarioService.updateHorario(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Eliminar horario", description = "Elimina un horario de disponibilidad",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "204", description = "Horario eliminado exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Horario no encontrado")
            })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHorario(@PathVariable Long id) {
        horarioService.deleteHorario(id);
        return ResponseEntity.noContent().build();
    }
}
