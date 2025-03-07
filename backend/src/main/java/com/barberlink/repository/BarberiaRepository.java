package com.barberlink.repository;

import com.barberlink.model.Barberia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarberiaRepository extends JpaRepository<Barberia, Long> {
    // Métodos de consulta adicionales, si es necesario.
}
