package com.barberlink.controller;

import com.barberlink.mapper.request.PromocionRequest;
import com.barberlink.mapper.response.PromocionResponse;
import com.barberlink.service.PromocionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Promociones", description = "Endpoints para la gestión de promociones")
@RestController
@RequestMapping("/api/promociones")
public class PromocionController {

    private final PromocionService promocionService;

    public PromocionController(PromocionService promocionService) {
        this.promocionService = promocionService;
    }

    @Operation(summary = "Agregar promoción", description = "Crea una nueva promoción para una barbería", security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Promoción creada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    @PostMapping
    public ResponseEntity<PromocionResponse> addPromocion(@RequestBody PromocionRequest request) {
        PromocionResponse response = promocionService.addPromocion(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obtener todas las promociones", description = "Recupera la lista de promociones", security = @SecurityRequirement(name = "bearer-key"))
    @GetMapping
    public ResponseEntity<List<PromocionResponse>> getAllPromociones() {
        List<PromocionResponse> list = promocionService.getAllPromociones();
        return ResponseEntity.ok(list);
    }

    @Operation(summary = "Obtener promoción por ID", description = "Recupera los datos de una promoción específica", security = @SecurityRequirement(name = "bearer-key"))
    @GetMapping("/{id}")
    public ResponseEntity<PromocionResponse> getPromocionById(@PathVariable Long id) {
        PromocionResponse response = promocionService.getPromocionById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Actualizar promoción", description = "Actualiza los datos de una promoción existente", security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Promoción actualizada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Promoción no encontrada")
    })
    @PutMapping("/{id}")
    public ResponseEntity<PromocionResponse> updatePromocion(@PathVariable Long id, @RequestBody PromocionRequest request) {
        PromocionResponse response = promocionService.updatePromocion(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Eliminar promoción", description = "Elimina una promoción por su ID", security = @SecurityRequirement(name = "bearer-key"))
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromocion(@PathVariable Long id) {
        promocionService.deletePromocion(id);
        return ResponseEntity.noContent().build();
    }
}
