package com.barberlink.service;

import com.barberlink.mapper.HorarioMapper;
import com.barberlink.mapper.request.HorarioRequest;
import com.barberlink.mapper.response.HorarioResponse;
import com.barberlink.model.Horario;
import com.barberlink.repository.HorarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HorarioService {

    private final HorarioRepository horarioRepository;
    private final HorarioMapper horarioMapper;

    public HorarioService(HorarioRepository horarioRepository, HorarioMapper horarioMapper) {
        this.horarioRepository = horarioRepository;
        this.horarioMapper = horarioMapper;
    }

    // Agregar un horario
    public HorarioResponse addHorario(HorarioRequest request) {
        Horario horario = horarioMapper.toHorario(request);
        Horario saved = horarioRepository.save(horario);
        return horarioMapper.toHorarioResponse(saved);
    }

    // Obtener todos los horarios
    public List<HorarioResponse> getAllHorarios() {
        return horarioRepository.findAll().stream()
                .map(horarioMapper::toHorarioResponse)
                .toList();
    }

    // Actualizar un horario
    public HorarioResponse updateHorario(Long id, HorarioRequest request) {
        Horario horario = horarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Horario no encontrado"));
        horario.setFecha(request.fecha());
        horario.setHoraInicio(request.horaInicio());
        horario.setHoraFin(request.horaFin());
        horario.setEstado(request.estado());
        Horario updated = horarioRepository.save(horario);
        return horarioMapper.toHorarioResponse(updated);
    }

    // Eliminar un horario
    public void deleteHorario(Long id) {
        if (!horarioRepository.existsById(id)) {
            throw new RuntimeException("Horario no encontrado");
        }
        horarioRepository.deleteById(id);
    }
}
