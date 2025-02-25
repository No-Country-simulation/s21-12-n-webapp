package com.barberlink.infra.errores;

import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class TratadorDeErrores {

    private static final Logger log = LoggerFactory.getLogger(TratadorDeErrores.class);

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<DatosErrorGeneral> tratarError404(EntityNotFoundException e) {
        log.warn("Error 404 - Recurso no encontrado: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new DatosErrorGeneral("404_NOT_FOUND", "Recurso no encontrado", e.getMessage(), LocalDateTime.now()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<DatosErrorValidacion>> tratarError400(MethodArgumentNotValidException e) {
        log.warn("Error 400 - Validación de datos fallida");
        var errores = e.getFieldErrors().stream().map(DatosErrorValidacion::new).toList();
        return ResponseEntity.badRequest().body(errores);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<DatosErrorGeneral> manejarParametroFaltante(MissingServletRequestParameterException e) {
        log.warn("Error 400 - Falta un parámetro requerido: {}", e.getParameterName());
        return ResponseEntity.badRequest()
                .body(new DatosErrorGeneral("400_BAD_REQUEST", "Falta un parámetro requerido", e.getParameterName(), LocalDateTime.now()));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<DatosErrorGeneral> tratarError403(AccessDeniedException e) {
        log.warn("Error 403 - Acceso denegado: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new DatosErrorGeneral("403_FORBIDDEN", "Acceso denegado", e.getMessage(), LocalDateTime.now()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<DatosErrorGeneral> manejarErrorInterno(Exception e) {
        log.error("Error 500 - Error interno del servidor: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DatosErrorGeneral("500_INTERNAL_SERVER_ERROR", "Error interno del servidor", e.getMessage(), LocalDateTime.now()));
    }

    private record DatosErrorValidacion(String codigo, String campo, String mensaje) {
        public DatosErrorValidacion(FieldError error) {
            this("400_VALIDATION_ERROR", error.getField(), error.getDefaultMessage());
        }
    }

    private record DatosErrorGeneral(String codigo, String tipo, String detalle, LocalDateTime timestamp) { }
}
