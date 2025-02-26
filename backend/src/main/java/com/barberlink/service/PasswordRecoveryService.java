package com.barberlink.service;

import com.barberlink.mapper.PasswordRecoveryMapper;
import com.barberlink.mapper.request.PasswordRecoveryRequest;
import com.barberlink.mapper.response.PasswordRecoveryResponse;
import com.barberlink.model.PasswordRecovery;
import com.barberlink.repository.PasswordRecoveryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PasswordRecoveryService {

    private final PasswordRecoveryRepository passwordRecoveryRepository;
    private final PasswordRecoveryMapper passwordRecoveryMapper;

    public PasswordRecoveryService(PasswordRecoveryRepository passwordRecoveryRepository,
                                   PasswordRecoveryMapper passwordRecoveryMapper) {
        this.passwordRecoveryRepository = passwordRecoveryRepository;
        this.passwordRecoveryMapper = passwordRecoveryMapper;
    }

    // Crear token de recuperación
    public PasswordRecoveryResponse createToken(PasswordRecoveryRequest request) {
        PasswordRecovery recovery = passwordRecoveryMapper.toPasswordRecovery(request);
        recovery.setCreatedAt(LocalDateTime.now());
        PasswordRecovery saved = passwordRecoveryRepository.save(recovery);
        return passwordRecoveryMapper.toPasswordRecoveryResponse(saved);
    }

    // Verificar token
    public boolean verifyToken(Long usuarioId, String token) {
        PasswordRecovery recovery = passwordRecoveryRepository.findValidToken(usuarioId, token, LocalDateTime.now())
                .orElseThrow(() -> new RuntimeException("Token inválido o expirado"));
        return !recovery.getUtilizado();
    }

    // Restablecer contraseña (actualizar la contraseña en el usuario es responsabilidad de otro servicio)
    public void resetPassword(Long usuarioId, String token, String newPassword) {
        if (verifyToken(usuarioId, token)) {
            PasswordRecovery recovery = passwordRecoveryRepository.findByUsuarioIdAndToken(usuarioId, token)
                    .orElseThrow(() -> new RuntimeException("Token inválido"));
            recovery.setUtilizado(true);
            passwordRecoveryRepository.save(recovery);
            // Aquí se debería actualizar la contraseña del usuario.
        } else {
            throw new RuntimeException("Token inválido o expirado");
        }
    }

    // Eliminar token de recuperación (CRUD completo)
    public void deletePasswordRecovery(Long id) {
        if (!passwordRecoveryRepository.existsById(id)) {
            throw new RuntimeException("Token de recuperación no encontrado");
        }
        passwordRecoveryRepository.deleteById(id);
    }
}
