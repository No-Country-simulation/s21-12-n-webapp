package com.barberlink.repository;

import com.barberlink.model.LogActividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LogActividadRepository extends JpaRepository<LogActividad, Long> {
    List<LogActividad> findByUsuarioId(Long usuarioId);
}
