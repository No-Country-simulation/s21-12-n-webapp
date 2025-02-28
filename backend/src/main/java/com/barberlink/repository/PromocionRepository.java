package com.barberlink.repository;

import com.barberlink.model.Promocion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromocionRepository extends JpaRepository<Promocion, Long> {
    // Métodos de consulta adicionales, si es necesario.
}
