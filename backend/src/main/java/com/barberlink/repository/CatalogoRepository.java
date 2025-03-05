package com.barberlink.repository;

import com.barberlink.model.Catalogo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogoRepository extends JpaRepository<Catalogo, Long> {
    // Métodos de consulta adicionales, si es necesario.
}
