package com.barberlink.service;

import com.barberlink.mapper.TurnoMapper;
import com.barberlink.mapper.request.TurnoRequest;
import com.barberlink.mapper.response.TurnoResponse;
import com.barberlink.model.Turno;
import com.barberlink.repository.TurnoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TurnoService {

    private final TurnoRepository turnoRepository;
    private final TurnoMapper turnoMapper;

    public TurnoService(TurnoRepository turnoRepository, TurnoMapper turnoMapper) {
        this.turnoRepository = turnoRepository;
        this.turnoMapper = turnoMapper;
    }

    public TurnoResponse bookTurno(TurnoRequest request) {
        Turno turno = turnoMapper.toTurno(request);
        turno.setCreatedAt(LocalDateTime.now());
        turno.setUpdatedAt(LocalDateTime.now());
        // Lógica adicional para validar disponibilidad, etc.
        Turno saved = turnoRepository.save(turno);
        return turnoMapper.toTurnoResponse(saved);
    }

    public TurnoResponse cancelTurno(Long turnoId) {
        Turno turno = turnoRepository.findById(turnoId)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));
        turno.setEstado(com.barberlink.model.EstadoTurno.CANCELADO);
        turno.setUpdatedAt(LocalDateTime.now());
        Turno updated = turnoRepository.save(turno);
        return turnoMapper.toTurnoResponse(updated);
    }

    public TurnoResponse confirmTurno(Long turnoId) {
        Turno turno = turnoRepository.findById(turnoId)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));
        turno.setEstado(com.barberlink.model.EstadoTurno.CONFIRMADO);
        turno.setUpdatedAt(LocalDateTime.now());
        Turno updated = turnoRepository.save(turno);
        return turnoMapper.toTurnoResponse(updated);
    }
}
