package com.barberlink.service;

import com.barberlink.mapper.AdministradorMapper;
import com.barberlink.mapper.request.AdministradorRequest;
import com.barberlink.mapper.response.AdministradorResponse;
import com.barberlink.model.Administrador;
import com.barberlink.model.Rol;
import com.barberlink.model.Usuario;
import com.barberlink.repository.AdministradorRepository;
import com.barberlink.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdministradorService {

    private final UsuarioRepository usuarioRepository;
    private final AdministradorRepository administradorRepository;
    private final AdministradorMapper administradorMapper;
    private final PasswordEncoder passwordEncoder;

    public AdministradorService(UsuarioRepository usuarioRepository,
                                AdministradorRepository administradorRepository,
                                AdministradorMapper administradorMapper,
                                PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.administradorRepository = administradorRepository;
        this.administradorMapper = administradorMapper;
        this.passwordEncoder = passwordEncoder;
    }

    // Crear (registrar) un administrador
    public AdministradorResponse registerAdministrador(AdministradorRequest request) {
        Administrador admin = administradorMapper.toAdministrador(request);
        admin.setRol(Rol.ADMINISTRADOR);
        admin.setEstado(true);
        admin.setCreatedAt(LocalDateTime.now());
        admin.setUpdatedAt(LocalDateTime.now());
        admin.setContrasena(passwordEncoder.encode(request.contrasena()));
        Administrador saved = administradorRepository.save(admin);
        return administradorMapper.toAdministradorResponse(saved);
    }

    // Obtener todos los usuarios (administradores y otros)
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    // Obtener un administrador por ID (asumiendo que administrador es un Usuario)
    public AdministradorResponse getAdministradorById(Long id) {
        Administrador admin = administradorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
        return administradorMapper.toAdministradorResponse(admin);
    }

    // Actualizar administrador
    public AdministradorResponse updateAdministrador(Long id, AdministradorRequest request) {
        Administrador admin = administradorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
        // Actualizar campos (por ejemplo, email y contraseña)
        admin.setEmail(request.email());
        admin.setContrasena(passwordEncoder.encode(request.contrasena()));
        admin.setUpdatedAt(LocalDateTime.now());
        Administrador updated = administradorRepository.save(admin);
        return administradorMapper.toAdministradorResponse(updated);
    }

    // Eliminar administrador (lógica básica de borrado físico)
    public void deleteAdministrador(Long id) {
        if (!administradorRepository.existsById(id)) {
            throw new RuntimeException("Administrador no encontrado");
        }
        administradorRepository.deleteById(id);
    }

    // Desactivar usuario (método compartido, por ejemplo, para suspender la cuenta)
    public void deactivateUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setEstado(false);
        usuarioRepository.save(usuario);
    }
}
