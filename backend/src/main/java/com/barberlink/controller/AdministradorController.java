package com.barberlink.controller;

import com.barberlink.model.Usuario;
import com.barberlink.service.AdministradorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Administradores", description = "Endpoints para la administración y gestión de usuarios")
@RestController
@RequestMapping("/api/administradores")
public class AdministradorController {

    private final AdministradorService administradorService;

    public AdministradorController(AdministradorService administradorService) {
        this.administradorService = administradorService;
    }

    @Operation(summary = "Obtener todos los usuarios", description = "Recupera la lista de todos los usuarios registrados en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida exitosamente"),
            @ApiResponse(responseCode = "401", description = "No autorizado"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = administradorService.getAllUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @Operation(summary = "Desactivar un usuario", description = "Marca un usuario como inactivo en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Usuario desactivado correctamente"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado"),
            @ApiResponse(responseCode = "401", description = "No autorizado")
    })
    @PutMapping("/usuarios/{usuarioId}/deactivate")
    public ResponseEntity<Void> deactivateUsuario(@PathVariable Long usuarioId) {
        administradorService.deactivateUsuario(usuarioId);
        return ResponseEntity.noContent().build();
    }
}
