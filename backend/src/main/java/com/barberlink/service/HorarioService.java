package com.barberlink.service;

import com.barberlink.mapper.HorarioMapper;
import com.barberlink.mapper.request.HorarioRequest;
import com.barberlink.mapper.response.HorarioResponse;
import com.barberlink.model.Horario;
import com.barberlink.repository.HorarioRepository;
import org.springframework.stereotype.Service;

@Service
public class HorarioService {

    private final HorarioRepository horarioRepository;
    private final HorarioMapper horarioMapper;

    public HorarioService(HorarioRepository horarioRepository, HorarioMapper horarioMapper) {
        this.horarioRepository = horarioRepository;
        this.horarioMapper = horarioMapper;
    }

    public HorarioResponse addHorario(HorarioRequest request) {
        Horario horario = horarioMapper.toHorario(request);
        // Asignar valores de timestamp si es necesario
        Horario saved = horarioRepository.save(horario);
        return horarioMapper.toHorarioResponse(saved);
    }

    public HorarioResponse updateHorario(Long horarioId, HorarioRequest request) {
        Horario horario = horarioRepository.findById(horarioId)
                .orElseThrow(() -> new RuntimeException("Horario no encontrado"));
        // Actualizar campos
        horario.setFecha(request.fecha());
        horario.setHoraInicio(request.horaInicio());
        horario.setHoraFin(request.horaFin());
        horario.setEstado(request.estado());
        Horario updated = horarioRepository.save(horario);
        return horarioMapper.toHorarioResponse(updated);
    }

    public void deleteHorario(Long horarioId) {
        if(horarioRepository.existsById(horarioId)){
            horarioRepository.deleteById(horarioId);
        } else {
            throw new RuntimeException("Horario no encontrado");
        }
    }
}
