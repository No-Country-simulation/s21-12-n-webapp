package com.barberlink.controller;

import com.barberlink.mapper.request.AdministradorRequest;
import com.barberlink.mapper.response.AdministradorResponse;
import com.barberlink.model.Usuario;
import com.barberlink.service.AdministradorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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

    @Operation(summary = "Registrar administrador", description = "Crea una cuenta de administrador y devuelve sus datos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Administrador registrado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    @PostMapping("/register")
    public ResponseEntity<AdministradorResponse> registerAdministrador(@RequestBody AdministradorRequest request) {
        AdministradorResponse response = administradorService.registerAdministrador(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obtener todos los usuarios", description = "Recupera la lista de todos los usuarios registrados",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida exitosamente"),
            @ApiResponse(responseCode = "401", description = "No autorizado")
    })
    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = administradorService.getAllUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @Operation(summary = "Obtener administrador por ID", description = "Recupera los datos de un administrador en particular",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Administrador obtenido exitosamente"),
            @ApiResponse(responseCode = "404", description = "Administrador no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<AdministradorResponse> getAdministradorById(@PathVariable Long id) {
        AdministradorResponse response = administradorService.getAdministradorById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Actualizar administrador", description = "Actualiza los datos de un administrador existente",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Administrador actualizado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Administrador no encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<AdministradorResponse> updateAdministrador(@PathVariable Long id, @RequestBody AdministradorRequest request) {
        AdministradorResponse response = administradorService.updateAdministrador(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Eliminar administrador", description = "Elimina un administrador por su ID",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Administrador eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Administrador no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdministrador(@PathVariable Long id) {
        administradorService.deleteAdministrador(id);
        return ResponseEntity.noContent().build();
    }
}
