package com.example.gateway.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

public class JwtUtil {

    // Clave secreta compartida con usuario-service (mínimo 32 caracteres para HS256)
    private static final String SECRET = "EduClearSecretKey2026SuperSegura!!";

    private static final SecretKey KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    /**
     * Valida el token JWT y devuelve los claims si es válido.
     * Lanza una excepción si el token es inválido o ha expirado.
     */
    public static Claims validarToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
