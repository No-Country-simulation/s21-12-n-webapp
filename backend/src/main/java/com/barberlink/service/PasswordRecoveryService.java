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

    public PasswordRecoveryResponse createToken(PasswordRecoveryRequest request) {
        PasswordRecovery recovery = passwordRecoveryMapper.toPasswordRecovery(request);
        recovery.setCreatedAt(LocalDateTime.now());
        PasswordRecovery saved = passwordRecoveryRepository.save(recovery);
        return passwordRecoveryMapper.toPasswordRecoveryResponse(saved);
    }

    public boolean verifyToken(Long usuarioId, String token) {
        PasswordRecovery recovery = passwordRecoveryRepository.findValidToken(usuarioId, token, LocalDateTime.now())
                .orElseThrow(() -> new RuntimeException("Token inválido o expirado"));
        return !recovery.getUtilizado();
    }

    public void resetPassword(Long usuarioId, String token, String newPassword) {
        // Verificar token y actualizar la contraseña del usuario
        if(verifyToken(usuarioId, token)){
            // Aquí se actualizaría la contraseña del usuario (lógica omitida)
            // Marcar token como utilizado
            PasswordRecovery recovery = passwordRecoveryRepository.findByUsuarioIdAndToken(usuarioId, token)
                    .orElseThrow(() -> new RuntimeException("Token inválido"));
            recovery.setUtilizado(true);
            passwordRecoveryRepository.save(recovery);
        } else {
            throw new RuntimeException("Token inválido o expirado");
        }
    }
}
