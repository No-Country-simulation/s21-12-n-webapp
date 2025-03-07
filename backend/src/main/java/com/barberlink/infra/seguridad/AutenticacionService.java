package com.barberlink.infra.seguridad;

import com.barberlink.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticacionService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public AutenticacionService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Se asume que el repositorio retorna Optional<Usuario> y que Usuario implementa UserDetails
        return usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("No se encontró un usuario con el email: " + username));
    }
}
