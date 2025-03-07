package com.barberlink.controller;

import com.barberlink.infra.seguridad.TokenService;
import com.barberlink.mapper.request.LoginRequest;
import com.barberlink.model.Usuario;
import com.barberlink.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/login")
@Validated
@Tag(name = "Autenticación", description = "Endpoints para la autenticación y renovación de tokens JWT")
public class AutenticacionController {

    private static final Logger log = LoggerFactory.getLogger(AutenticacionController.class);

    private final AuthenticationManager authManager;
    private final TokenService tokenService;
    private final UsuarioRepository usuarioRepository;

    public AutenticacionController(AuthenticationManager authManager,
                                   TokenService tokenService,
                                   UsuarioRepository usuarioRepository) {
        this.authManager = authManager;
        this.tokenService = tokenService;
        this.usuarioRepository = usuarioRepository;
    }

    @Operation(
            summary = "Realizar login",
            description = "Autentica a un usuario y genera tokens de acceso y refresh."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login exitoso. Devuelve tokens de acceso y refresh."),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos."),
            @ApiResponse(responseCode = "401", description = "Credenciales incorrectas.")
    })
    @PostMapping
    public ResponseEntity<TokensDTO> realizarLogin(@RequestBody @Valid LoginRequest datos) {
        log.info("Intento de login para email: {}", datos.email());
        var authToken = new UsernamePasswordAuthenticationToken(datos.email(), datos.contrasena());
        var usuarioAutenticado = authManager.authenticate(authToken);
        var user = (Usuario) usuarioAutenticado.getPrincipal();
        var accessToken = tokenService.generarAccessToken(user);
        var refreshToken = tokenService.generarRefreshToken(user);
        return ResponseEntity.ok(new TokensDTO(accessToken, refreshToken));
    }

    @Operation(
            summary = "Refrescar token",
            description = "Renueva el token de acceso utilizando el token de refresh."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token renovado exitosamente. Devuelve nuevos tokens."),
            @ApiResponse(responseCode = "401", description = "Token inválido o expirado.")
    })
    @PostMapping("/refresh")
    public ResponseEntity<TokensDTO> refreshToken(@RequestBody String refreshToken) {
        try {
            var email = tokenService.getSubject(refreshToken);
            var tokenType = tokenService.getTokenType(refreshToken);
            if (!"REFRESH".equals(tokenType)) {
                return ResponseEntity.status(401).body(null);
            }
            var usuario = usuarioRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            if (!usuario.isEnabled()) {
                return ResponseEntity.status(403).body(null);
            }
            var newAccess = tokenService.generarAccessToken(usuario);
            var newRefresh = tokenService.generarRefreshToken(usuario);
            return ResponseEntity.ok(new TokensDTO(newAccess, newRefresh));
        } catch (RuntimeException e) {
            log.error("Error en refresh token: {}", e.getMessage());
            return ResponseEntity.status(401).body(null);
        }
    }

    // Record para encapsular los tokens de respuesta
    public record TokensDTO(String accessToken, String refreshToken) { }
}
