package com.barberlink.infra.configuracion;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfiguration {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearer-key",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")))
                .info(new Info()
                        .title("BarberLink API")
                        .description("API REST para la plataforma BarberLink, que conecta clientes con barberías y gestiona reservas, productos y servicios.")
                        .contact(new Contact()
                                .name("Equipo Backend")
                                .email("backend@barberlink.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://barberlink.com/api/licencia")));
    }
}
