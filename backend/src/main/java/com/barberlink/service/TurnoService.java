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
        System.out.println("Request recibido: " + request);

        Turno turno = turnoMapper.toTurno(request);

        // Validar que se haya convertido correctamente la barbería y el cliente
        if (turno.getBarberia() == null || turno.getCliente() == null) {
            throw new IllegalArgumentException("El ID de la barbería y del cliente no pueden ser null.");
        }

        // Configurar timestamps
        turno.setCreatedAt(LocalDateTime.now());
        turno.setUpdatedAt(LocalDateTime.now());

        // Guardar en la base de datos
        Turno saved = turnoRepository.save(turno);

        // Convertir la entidad guardada en la respuesta y retornarla
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

    public List<TurnoResponse> getTurnosCliente(Long id) {
        return turnoRepository.findAllByCliente_Id(id).stream()
                .map(turnoMapper::toTurnoResponse)
                .toList();
    }

}
