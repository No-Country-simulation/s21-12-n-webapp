package com.barberlink.repository;

import com.barberlink.model.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, Long> {
    // Métodos de consulta adicionales, si es necesario.
}
