package com.barberlink.repository;

import com.barberlink.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {
    // Métodos de consulta adicionales, si es necesario.
}
