package com.barberlink.controller;

import com.barberlink.mapper.request.PasswordRecoveryRequest;
import com.barberlink.mapper.response.PasswordRecoveryResponse;
import com.barberlink.service.PasswordRecoveryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Recuperación de Contraseña", description = "Endpoints para la recuperación de contraseña")
@RestController
@RequestMapping("/api/password-recovery")
public class PasswordRecoveryController {

    private final PasswordRecoveryService passwordRecoveryService;

    public PasswordRecoveryController(PasswordRecoveryService passwordRecoveryService) {
        this.passwordRecoveryService = passwordRecoveryService;
    }

    @Operation(summary = "Crear token de recuperación", description = "Genera un token para la recuperación de contraseña")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token generado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Error al generar el token")
    })
    @PostMapping("/create")
    public ResponseEntity<PasswordRecoveryResponse> createToken(@RequestBody PasswordRecoveryRequest request) {
        PasswordRecoveryResponse response = passwordRecoveryService.createToken(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Verificar token", description = "Verifica la validez de un token de recuperación")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token válido"),
            @ApiResponse(responseCode = "400", description = "Token inválido o expirado")
    })
    @GetMapping("/verify")
    public ResponseEntity<Boolean> verifyToken(@RequestParam Long usuarioId, @RequestParam String token) {
        boolean valid = passwordRecoveryService.verifyToken(usuarioId, token);
        return ResponseEntity.ok(valid);
    }

    @Operation(summary = "Restablecer contraseña", description = "Permite actualizar la contraseña del usuario tras la verificación del token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Contraseña actualizada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Token inválido o expirado")
    })
    @PostMapping("/reset")
    public ResponseEntity<Void> resetPassword(@RequestParam Long usuarioId,
                                              @RequestParam String token,
                                              @RequestParam String newPassword) {
        passwordRecoveryService.resetPassword(usuarioId, token, newPassword);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Eliminar token de recuperación", description = "Elimina un token de recuperación por su ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePasswordRecovery(@PathVariable Long id) {
        passwordRecoveryService.deletePasswordRecovery(id);
        return ResponseEntity.noContent().build();
    }
}
