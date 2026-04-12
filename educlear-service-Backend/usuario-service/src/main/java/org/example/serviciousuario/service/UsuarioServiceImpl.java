package org.example.serviciousuario.service;

import org.example.serviciousuario.dto.UsuarioDTO;
import org.example.serviciousuario.model.Usuario;
import org.example.serviciousuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements UsuarioService{
    @Autowired
    private UsuarioRepository usuarioRepository;

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
    public UsuarioDTO save(Usuario usuario) {
        if (!cursoExiste(usuario.getCursoId())) {
            throw new RuntimeException("El curso no existe");
        }
        Usuario guardado = usuarioRepository.save(usuario);
        return convertToDTO(guardado);
    }

    private boolean cursoExiste(Integer cursoId) {
        // De momento asumimos que el curso existe
        return true;
    }


    @Override
    public void delete(Integer id) {
        usuarioRepository.deleteById(id);
    }

    // Método auxiliar para mapear Entidad -> DTO
    private UsuarioDTO convertToDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setUsername(usuario.getUsername());
        dto.setEmail(usuario.getEmail());
        dto.setRol(usuario.getRol());
        dto.setCursoId(usuario.getCursoId());
        return dto;
    }
}
