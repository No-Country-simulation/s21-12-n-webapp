package com.barberlink.repository;

import com.barberlink.model.PasswordRecovery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface PasswordRecoveryRepository extends JpaRepository<PasswordRecovery, Long> {

    @Query("SELECT pr FROM PasswordRecovery pr WHERE pr.usuario.id = :usuarioId AND pr.token = :token AND pr.expiresAt > :now")
    Optional<PasswordRecovery> findValidToken(Long usuarioId, String token, LocalDateTime now);

    Optional<PasswordRecovery> findByUsuarioIdAndToken(Long usuarioId, String token);
}
