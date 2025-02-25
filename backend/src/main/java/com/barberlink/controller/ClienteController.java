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

@Tag(name = "Clientes", description = "Endpoints para la gestión de clientes")
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @Operation(summary = "Registrar un nuevo cliente", description = "Crea una cuenta de cliente y devuelve sus datos",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Cliente registrado exitosamente",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ClienteResponse.class))),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos")
            })
    @PostMapping("/register")
    public ResponseEntity<ClienteResponse> registerCliente(@RequestBody ClienteRequest request) {
        ClienteResponse response = clienteService.registerCliente(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Actualizar datos del cliente", description = "Modifica los datos de un cliente existente",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Cliente actualizado exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
            })
    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponse> updateCliente(@PathVariable Long id, @RequestBody ClienteRequest request) {
        ClienteResponse response = clienteService.updateCliente(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obtener un cliente por ID", description = "Devuelve los datos de un cliente específico",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Datos del cliente obtenidos exitosamente",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ClienteResponse.class))),
                    @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
            })
    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> getCliente(@PathVariable Long id) {
        ClienteResponse response = clienteService.getClienteById(id);
        return ResponseEntity.ok(response);
    }
}
