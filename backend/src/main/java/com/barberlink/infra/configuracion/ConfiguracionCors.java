package com.barberlink.infra.configuracion;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class ConfiguracionCors {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Permitir cualquier origen
        configuration.setAllowedOriginPatterns(List.of("*"));
        // Permitir los métodos que necesites
        configuration.setAllowedMethods(List.of("GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH"));
        // Permitir los headers que necesites
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        // Si usas credenciales, no podrás usar "*" en allowedOrigins, por eso usamos allowedOriginPatterns
        configuration.setAllowCredentials(true);
        // Si deseas exponer algún header, agrégalo aquí
        configuration.addExposedHeader("Authorization");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
