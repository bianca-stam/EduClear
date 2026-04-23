package org.example.serviciousuario.tokenjwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil; // Tu clase que valida tokens

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // 1. Extraer el header "Authorization"
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // 2. Comprobar que el token viene y empieza con "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Quitamos la palabra "Bearer "
            username = jwtUtil.extractUsername(jwt); // Sacamos el usuario del token
        }

        // 3. Si hay usuario y no está ya autenticado en Spring...
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Validamos matemáticamente el token
            if (jwtUtil.validateToken(jwt, username)) {
                // Si es válido, le decimos a Spring: "Este usuario es legal"
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        // 4. Continuar con la petición (ir al controlador)
        chain.doFilter(request, response);
    }
}
