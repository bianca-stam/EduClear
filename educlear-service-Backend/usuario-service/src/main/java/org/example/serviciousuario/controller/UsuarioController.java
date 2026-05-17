package org.example.serviciousuario.controller;

import org.example.serviciousuario.dto.LoginRequest;
import org.example.serviciousuario.dto.UsuarioDTO;
import org.example.serviciousuario.model.Usuario;
import org.example.serviciousuario.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")

public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<UsuarioDTO> getAll() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        UsuarioDTO user = usuarioService.findById(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Usuario no encontrado"));
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/email/{email:.+}")
    public ResponseEntity<?> getByEmail(@PathVariable String email) {
        try{
            return ResponseEntity.ok(usuarioService.findByEmail(email));
        }catch(RuntimeException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error",ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()
                || request.getContrasena() == null || request.getContrasena().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("Error", "Email y contraseña obligatorios"));
        }
        try{
            return ResponseEntity.ok(
                    usuarioService.login(
                            request.getEmail(),
                            request.getContrasena()));
        }catch(RuntimeException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("Error",ex.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Usuario usuario) {
        try{
            return new ResponseEntity<>(usuarioService.save(usuario), HttpStatus.CREATED);
        }catch(RuntimeException ex){
            return ResponseEntity.badRequest().body(Map.of("error",ex.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            usuarioService.delete(id);
            return ResponseEntity.ok(Map.of("message","Usuario borrado correctamente"));
        }catch (RuntimeException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/asignatura/{asignaturaId}")
    public ResponseEntity<List<UsuarioDTO>> getByAsignatura(@PathVariable Integer asignaturaId) {
        return ResponseEntity.ok(usuarioService.findUsuariosByAsignatura(asignaturaId));
    }
}