package com.barberlink.service;

import com.barberlink.mapper.NotificacionMapper;
import com.barberlink.mapper.request.NotificacionRequest;
import com.barberlink.mapper.response.NotificacionResponse;
import com.barberlink.model.Notificacion;
import com.barberlink.repository.NotificacionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificacionService {

    private final NotificacionRepository notificacionRepository;
    private final NotificacionMapper notificacionMapper;

    public NotificacionService(NotificacionRepository notificacionRepository,
                               NotificacionMapper notificacionMapper) {
        this.notificacionRepository = notificacionRepository;
        this.notificacionMapper = notificacionMapper;
    }

    // Crear notificación
    public NotificacionResponse createNotificacion(NotificacionRequest request) {
        Notificacion notificacion = notificacionMapper.toNotificacion(request);
        notificacion.setCreatedAt(LocalDateTime.now());
        Notificacion saved = notificacionRepository.save(notificacion);
        return notificacionMapper.toNotificacionResponse(saved);
    }

    // Obtener notificaciones por usuario
    public List<NotificacionResponse> getNotificacionesByUsuario(Long usuarioId) {
        List<Notificacion> notificaciones = notificacionRepository.findByUsuarioId(usuarioId);
        return notificacionMapper.toNotificacionResponseList(notificaciones);
    }

    // Marcar notificación como leída
    public void markAsRead(Long id) {
        Notificacion notificacion = notificacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notificación no encontrada"));
        notificacion.setEstado(true);
        notificacionRepository.save(notificacion);
    }

    // Eliminar notificación
    public void deleteNotificacion(Long id) {
        if (!notificacionRepository.existsById(id)) {
            throw new RuntimeException("Notificación no encontrada");
        }
        notificacionRepository.deleteById(id);
    }
}
