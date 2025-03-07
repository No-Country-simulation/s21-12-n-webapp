package com.barberlink.repository;

import com.barberlink.model.ComentarioForo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioForoRepository extends JpaRepository<ComentarioForo, Long> {
    // Métodos de consulta adicionales, si es necesario.
}
