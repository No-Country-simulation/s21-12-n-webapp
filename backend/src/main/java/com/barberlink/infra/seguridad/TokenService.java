package com.barberlink.infra.seguridad;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.barberlink.model.Usuario;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    private String secret = "123";

    public String generarAccessToken(Usuario usuario) {
        return generarToken(usuario, 2, "ACCESS");
    }

    public String generarRefreshToken(Usuario usuario) {
        return generarToken(usuario, 24 * 7, "REFRESH");
    }

    private String generarToken(Usuario usuario, int horas, String tipo) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("barberlink")
                    .withSubject(usuario.getEmail()) // o usuario.getNombreUsuario() según tu diseño
                    .withClaim("id", usuario.getId())
                    .withClaim("type", tipo)
                    .withClaim("rol", usuario.getRol().toString())
                    .withExpiresAt(generarFechaExpiracion(horas))
                    .sign(algorithm);
        } catch (Exception e) {
            throw new RuntimeException("Error al generar el token", e);
        }
    }

    public String getSubject(String token) {
        if (token == null || token.isEmpty()) {
            throw new RuntimeException("El token es nulo o vacío");
        }
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            DecodedJWT decoded = JWT.require(algorithm)
                    .withIssuer("barberlink")
                    .build()
                    .verify(token);
            return decoded.getSubject();
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Token inválido o expirado", e);
        }
    }

    public String getRolFromToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            DecodedJWT decoded = JWT.require(algorithm)
                    .withIssuer("barberlink")
                    .build()
                    .verify(token);
            return decoded.getClaim("rol").asString();
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Error al obtener el rol del token", e);
        }
    }

    public String getTokenType(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            DecodedJWT decoded = JWT.require(algorithm)
                    .withIssuer("barberlink")
                    .build()
                    .verify(token);
            return decoded.getClaim("type").asString();
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Error al obtener el tipo de token", e);
        }
    }

    private Instant generarFechaExpiracion(int horas) {
        return java.time.ZonedDateTime.now(ZoneOffset.UTC).plusHours(horas).toInstant();
    }
}
