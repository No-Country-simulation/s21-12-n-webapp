package com.barberlink.controller;

import com.barberlink.mapper.request.ComentarioForoRequest;
import com.barberlink.mapper.response.ComentarioForoResponse;
import com.barberlink.service.ComentarioForoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Comentarios", description = "Endpoints para la gestión de comentarios y calificaciones en el foro")
@RestController
@RequestMapping("/api/comentarios")
public class ComentarioForoController {

    private final ComentarioForoService comentarioForoService;

    public ComentarioForoController(ComentarioForoService comentarioForoService) {
        this.comentarioForoService = comentarioForoService;
    }

    @Operation(summary = "Agregar comentario", description = "Permite a un cliente agregar un comentario y calificación a una barbería",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Comentario agregado exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos")
            })
    @PostMapping
    public ResponseEntity<ComentarioForoResponse> addComentario(@RequestBody ComentarioForoRequest request) {
        ComentarioForoResponse response = comentarioForoService.addComentario(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Responder comentario", description = "Permite a la barbería responder a un comentario de un cliente",
            security = @SecurityRequirement(name = "Bearer Token"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Comentario respondido exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Comentario no encontrado")
            })
    @PutMapping("/{id}/respond")
    public ResponseEntity<ComentarioForoResponse> respondComentario(@PathVariable Long id, @RequestBody String respuesta) {
        ComentarioForoResponse response = comentarioForoService.respondComentario(id, respuesta);
        return ResponseEntity.ok(response);
    }
}
