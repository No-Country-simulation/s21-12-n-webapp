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

@Tag(name = "Promociones", description = "Endpoints para la gestión de promociones de barberías")
@RestController
@RequestMapping("/api/promociones")
public class PromocionController {

    private final PromocionService promocionService;

    public PromocionController(PromocionService promocionService) {
        this.promocionService = promocionService;
    }

    @Operation(summary = "Agregar promoción", description = "Crea una nueva promoción para una barbería",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Promoción creada exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
            })
    @PostMapping
    public ResponseEntity<PromocionResponse> addPromocion(@RequestBody PromocionRequest request) {
        PromocionResponse response = promocionService.addPromocion(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Actualizar promoción", description = "Actualiza los datos de una promoción existente",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Promoción actualizada exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Promoción no encontrada")
            })
    @PutMapping("/{id}")
    public ResponseEntity<PromocionResponse> updatePromocion(@PathVariable Long id, @RequestBody PromocionRequest request) {
        PromocionResponse response = promocionService.updatePromocion(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Eliminar promoción", description = "Elimina una promoción existente",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "204", description = "Promoción eliminada exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Promoción no encontrada")
            })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromocion(@PathVariable Long id) {
        promocionService.deletePromocion(id);
        return ResponseEntity.noContent().build();
    }
}
