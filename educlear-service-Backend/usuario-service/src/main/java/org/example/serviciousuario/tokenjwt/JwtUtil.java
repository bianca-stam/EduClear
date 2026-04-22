package org.example.serviciousuario.tokenjwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET = "clave-secreta";
    private static final long EXP = 1000 * 60 * 60;

    public static String generarToken(Integer id, String username, String rol) {
        return Jwts.builder()
                .setSubject(username)
                .claim("id", id)
                .claim("rol", rol)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXP))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();

    }

}
