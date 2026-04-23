package org.example.serviciousuario.tokenjwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class JwtUtil {

    // Clave secreta compartida con el gateway (mínimo 32 caracteres para HS256)
    private static final String SECRET = "EduClearSecretKey2026SuperSegura!!";

    private static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    public static String generarToken(Integer id, String email, String rol) {
        return Jwts.builder()
                .setSubject(email)
                .claim("id", id)
                .claim("rol", rol)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(KEY)
                .compact();
    }

}
