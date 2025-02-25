package com.barberlink.service;

import com.barberlink.mapper.LogActividadMapper;
import com.barberlink.mapper.request.LogActividadRequest;
import com.barberlink.mapper.response.LogActividadResponse;
import com.barberlink.model.LogActividad;
import com.barberlink.repository.LogActividadRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LogActividadService {

    private final LogActividadRepository logActividadRepository;
    private final LogActividadMapper logActividadMapper;

    public LogActividadService(LogActividadRepository logActividadRepository,
                               LogActividadMapper logActividadMapper) {
        this.logActividadRepository = logActividadRepository;
        this.logActividadMapper = logActividadMapper;
    }

    public LogActividadResponse logActivity(LogActividadRequest request) {
        LogActividad log = logActividadMapper.toLogActividad(request);
        // Si no se envía la fecha desde el request, se puede asignar el valor actual.
        if(log.getFecha() == null){
            log.setFecha(LocalDateTime.now());
        }
        LogActividad saved = logActividadRepository.save(log);
        return logActividadMapper.toLogActividadResponse(saved);
    }

    public List<LogActividadResponse> getLogsByUsuario(Long usuarioId) {
        List<LogActividad> logs = logActividadRepository.findByUsuarioId(usuarioId);
        return logActividadMapper.toLogActividadResponseList(logs);
    }
}
