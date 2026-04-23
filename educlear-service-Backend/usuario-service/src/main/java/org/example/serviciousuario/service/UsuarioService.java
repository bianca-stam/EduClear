package org.example.serviciousuario.service;

import org.example.serviciousuario.dto.UsuarioDTO;
import org.example.serviciousuario.model.Usuario;

import java.util.List;

public interface UsuarioService {
    List<UsuarioDTO> findAll();
    UsuarioDTO findById(Integer id);
    UsuarioDTO findByEmail(String email);
    UsuarioDTO save(Usuario usuario);
    UsuarioDTO login(String email, String contrasena);
    void delete(Integer id);
}
