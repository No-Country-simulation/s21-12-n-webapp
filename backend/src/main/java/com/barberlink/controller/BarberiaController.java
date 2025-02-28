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

import java.util.List;

@Tag(name = "Barberías", description = "Endpoints para la gestión de barberías")
@RestController
@RequestMapping("/api/barberias")
public class BarberiaController {

    private final BarberiaService barberiaService;

    public BarberiaController(BarberiaService barberiaService) {
        this.barberiaService = barberiaService;
    }

    @Operation(summary = "Registrar barbería", description = "Registra una nueva barbería en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Barbería registrada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    @PostMapping("/register")
    public ResponseEntity<BarberiaResponse> registerBarberia(@RequestBody BarberiaRequest request) {
        BarberiaResponse response = barberiaService.registerBarberia(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obtener todas las barberías", description = "Recupera la lista de todas las barberías registradas",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista obtenida exitosamente"),
            @ApiResponse(responseCode = "401", description = "No autorizado")
    })
    @GetMapping
    public ResponseEntity<List<BarberiaResponse>> getAllBarberias() {
        List<BarberiaResponse> list = barberiaService.getAllBarberias();
        return ResponseEntity.ok(list);
    }

    @Operation(summary = "Obtener barbería por ID", description = "Recupera los datos de una barbería específica",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Barbería obtenida exitosamente"),
            @ApiResponse(responseCode = "404", description = "Barbería no encontrada")
    })
    @GetMapping("/{id}")
    public ResponseEntity<BarberiaResponse> getBarberiaById(@PathVariable Long id) {
        BarberiaResponse response = barberiaService.getBarberiaById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Actualizar barbería", description = "Actualiza los datos de una barbería existente",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Barbería actualizada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Barbería no encontrada")
    })
    @PutMapping("/{id}")
    public ResponseEntity<BarberiaResponse> updateBarberia(@PathVariable Long id, @RequestBody BarberiaRequest request) {
        BarberiaResponse response = barberiaService.updateBarberia(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Eliminar barbería", description = "Elimina una barbería por su ID",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Barbería eliminada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Barbería no encontrada")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBarberia(@PathVariable Long id) {
        barberiaService.deleteBarberia(id);
        return ResponseEntity.noContent().build();
    }
}
