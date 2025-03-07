package com.barberlink.controller;

import com.barberlink.mapper.request.ClienteRequest;
import com.barberlink.mapper.response.ClienteResponse;
import com.barberlink.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Clientes", description = "Endpoints para la gestión de clientes")
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @Operation(summary = "Registrar cliente", description = "Crea una cuenta de cliente y devuelve sus datos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente registrado exitosamente",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ClienteResponse.class))),
            @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    @PostMapping("/register")
    public ResponseEntity<ClienteResponse> registerCliente(@RequestBody ClienteRequest request) {
        ClienteResponse response = clienteService.registerCliente(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obtener todos los clientes", description = "Recupera la lista de todos los clientes registrados",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de clientes obtenida exitosamente"),
            @ApiResponse(responseCode = "401", description = "No autorizado")
    })
    @GetMapping
    public ResponseEntity<List<ClienteResponse>> getAllClientes() {
        List<ClienteResponse> list = clienteService.getAllClientes();
        return ResponseEntity.ok(list);
    }

    @Operation(summary = "Obtener cliente por ID", description = "Devuelve los datos de un cliente específico",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Datos del cliente obtenidos exitosamente",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ClienteResponse.class))),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> getClienteById(@PathVariable Long id) {
        ClienteResponse response = clienteService.getClienteById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Actualizar cliente", description = "Actualiza los datos de un cliente existente",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente actualizado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponse> updateCliente(@PathVariable Long id, @RequestBody ClienteRequest request) {
        ClienteResponse response = clienteService.updateCliente(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Eliminar cliente", description = "Elimina un cliente por su ID",
            security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Cliente eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        clienteService.deleteCliente(id);
        return ResponseEntity.noContent().build();
    }
}
