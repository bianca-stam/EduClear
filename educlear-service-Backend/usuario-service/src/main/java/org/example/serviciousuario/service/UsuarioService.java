package org.example.serviciousuario.service;

import org.example.serviciousuario.dto.UsuarioDTO;
import org.example.serviciousuario.model.Usuario;

import java.util.List;

public interface UsuarioService {
    List<UsuarioDTO> findAll();
    UsuarioDTO findById(Integer id);
    UsuarioDTO save(Usuario usuario);
    void delete(Integer id);
}
