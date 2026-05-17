package org.example.serviciousuario.service;

import org.example.serviciousuario.dto.UsuarioDTO;
import org.example.serviciousuario.model.Usuario;
import org.example.serviciousuario.repository.UsuarioRepository;
import org.example.serviciousuario.tokenjwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private org.example.serviciousuario.config.AsignaturaClient asignaturaClient;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UsuarioDTO findById(Integer id) {
        return usuarioRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public UsuarioDTO findByEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return convertToDTO(usuario);
    }

    @Override
    public UsuarioDTO save(Usuario usuario) {
        if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
            throw new RuntimeException("El email es obligatorio");
        }
        if (usuario.getContrasena() == null || usuario.getContrasena().isBlank()) {
            throw new RuntimeException("La contraseña es obligatoria");
        }
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("Email ya registrado");
        }
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        Usuario guardado = usuarioRepository.save(usuario);

        UsuarioDTO dto = convertToDTO(guardado);
        return dto;
    }

    @Override
    public UsuarioDTO login(String email, String contrasena) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Comparar contraseña
        if (!passwordEncoder.matches(contrasena, usuario.getContrasena())) {
            throw new RuntimeException("Credenciales incorrectas");
        }

        // Generar token
        String token = JwtUtil.generarToken(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getRol().name());

        UsuarioDTO dto = convertToDTO(usuario);
        dto.setToken(token);
        return dto;
    }

    private boolean cursoExiste(Integer cursoId) {
        // De momento asumimos que el curso existe
        return true;
    }

    @Override
    public void delete(Integer id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    private UsuarioDTO convertToDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setUsername(usuario.getNombreCompleto());
        dto.setEmail(usuario.getEmail());
        dto.setRol(usuario.getRol());
        return dto;
    }

    @Override
    public List<UsuarioDTO> findUsuariosByAsignatura(Integer asignaturaId) {
        List<Integer> alumnoIds = asignaturaClient.getAlumnoIdsByAsignatura(asignaturaId);
        if (alumnoIds == null || alumnoIds.isEmpty()) {
            return List.of();
        }
        return usuarioRepository.findAllById(alumnoIds).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<UsuarioDTO> findByRol(String rolString) {
        try {
            org.example.serviciousuario.model.Rol rol = org.example.serviciousuario.model.Rol.valueOf(rolString.toLowerCase());
            return usuarioRepository.findByRol(rol).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Rol no válido");
        }
    }
}
