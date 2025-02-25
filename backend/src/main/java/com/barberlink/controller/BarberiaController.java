package com.barberlink.controller;

import com.barberlink.mapper.request.BarberiaRequest;
import com.barberlink.mapper.response.BarberiaResponse;
import com.barberlink.service.BarberiaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Barberías", description = "Endpoints para la gestión de barberías")
@RestController
@RequestMapping("/api/barberias")
public class BarberiaController {

    private final BarberiaService barberiaService;

    public BarberiaController(BarberiaService barberiaService) {
        this.barberiaService = barberiaService;
    }

    @Operation(summary = "Registrar barbería", description = "Registra una nueva barbería en el sistema",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Barbería registrada exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
            })
    @PostMapping("/register")
    public ResponseEntity<BarberiaResponse> registerBarberia(@RequestBody BarberiaRequest request) {
        BarberiaResponse response = barberiaService.registerBarberia(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Actualizar barbería", description = "Actualiza los datos de una barbería existente",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Barbería actualizada exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Barbería no encontrada")
            })
    @PutMapping("/{id}")
    public ResponseEntity<BarberiaResponse> updateBarberia(@PathVariable Long id, @RequestBody BarberiaRequest request) {
        BarberiaResponse response = barberiaService.updateBarberia(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obtener barbería", description = "Recupera los datos de una barbería por su ID",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Datos de la barbería obtenidos exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Barbería no encontrada")
            })
    @GetMapping("/{id}")
    public ResponseEntity<BarberiaResponse> getBarberia(@PathVariable Long id) {
        BarberiaResponse response = barberiaService.getBarberiaById(id);
        return ResponseEntity.ok(response);
    }
}
