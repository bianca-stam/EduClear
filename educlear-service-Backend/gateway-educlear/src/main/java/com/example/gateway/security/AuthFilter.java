package com.example.gateway.security;

import io.jsonwebtoken.Claims;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    public AuthFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            // 1. Obtener la cabecera Authorization
            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

            // 2. Verificar que existe y tiene el formato "Bearer <token>"
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return onError(exchange, HttpStatus.UNAUTHORIZED);
            }

            // 3. Extraer el token (quitar "Bearer ")
            String token = authHeader.substring(7);

            // 4. Validar el token
            try {
                Claims claims = JwtUtil.validarToken(token);

                // Opcional: pasar info del usuario a los microservicios vía headers
                exchange = exchange.mutate()
                        .request(r -> r
                                .header("X-User-Id", claims.get("id").toString())
                                .header("X-User-Email", claims.getSubject())
                                .header("X-User-Rol", claims.get("rol").toString())
                        )
                        .build();

            } catch (Exception e) {
                // Token inválido o expirado → 401
                return onError(exchange, HttpStatus.UNAUTHORIZED);
            }

            // 5. Token válido → dejar pasar la petición
            return chain.filter(exchange);
        };
    }

    private Mono<Void> onError(ServerWebExchange exchange, HttpStatus status) {
        exchange.getResponse().setStatusCode(status);
        return exchange.getResponse().setComplete();
    }

    public static class Config {
        // Clase de configuración (puede estar vacía)
    }
}
