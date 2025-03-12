package com.barberlink.repository;

import com.barberlink.mapper.response.TurnoResponse;
import com.barberlink.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {
    List<Turno> findAllByCliente_Id(Long id);
}
