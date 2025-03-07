package com.barberlink.service;

import com.barberlink.mapper.TurnoMapper;
import com.barberlink.mapper.request.TurnoRequest;
import com.barberlink.mapper.response.TurnoResponse;
import com.barberlink.model.EstadoTurno;
import com.barberlink.model.Turno;
import com.barberlink.repository.TurnoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TurnoService {

    private final TurnoRepository turnoRepository;
    private final TurnoMapper turnoMapper;

    public TurnoService(TurnoRepository turnoRepository, TurnoMapper turnoMapper) {
        this.turnoRepository = turnoRepository;
        this.turnoMapper = turnoMapper;
    }

    // Reservar turno
    public TurnoResponse bookTurno(TurnoRequest request) {
        Turno turno = turnoMapper.toTurno(request);
        turno.setCreatedAt(LocalDateTime.now());
        turno.setUpdatedAt(LocalDateTime.now());
        // Aquí puedes agregar lógica adicional, por ejemplo, validar disponibilidad.
        Turno saved = turnoRepository.save(turno);
        return turnoMapper.toTurnoResponse(saved);
    }

    // Obtener todos los turnos
    public List<TurnoResponse> getAllTurnos() {
        return turnoRepository.findAll().stream()
                .map(turnoMapper::toTurnoResponse)
                .toList();
    }

    // Cancelar turno
    public TurnoResponse cancelTurno(Long id) {
        Turno turno = turnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));
        turno.setEstado(EstadoTurno.CANCELADO);
        turno.setUpdatedAt(LocalDateTime.now());
        Turno updated = turnoRepository.save(turno);
        return turnoMapper.toTurnoResponse(updated);
    }

    // Confirmar turno
    public TurnoResponse confirmTurno(Long id) {
        Turno turno = turnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));
        turno.setEstado(EstadoTurno.CONFIRMADO);
        turno.setUpdatedAt(LocalDateTime.now());
        Turno updated = turnoRepository.save(turno);
        return turnoMapper.toTurnoResponse(updated);
    }

    // Eliminar turno
    public void deleteTurno(Long id) {
        if (!turnoRepository.existsById(id)) {
            throw new RuntimeException("Turno no encontrado");
        }
        turnoRepository.deleteById(id);
    }
}
