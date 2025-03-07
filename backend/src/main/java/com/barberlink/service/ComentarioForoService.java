package com.barberlink.service;

import com.barberlink.mapper.ComentarioForoMapper;
import com.barberlink.mapper.request.ComentarioForoRequest;
import com.barberlink.mapper.response.ComentarioForoResponse;
import com.barberlink.model.ComentarioForo;
import com.barberlink.repository.ComentarioForoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComentarioForoService {

    private final ComentarioForoRepository comentarioForoRepository;
    private final ComentarioForoMapper comentarioForoMapper;

    public ComentarioForoService(ComentarioForoRepository comentarioForoRepository,
                                 ComentarioForoMapper comentarioForoMapper) {
        this.comentarioForoRepository = comentarioForoRepository;
        this.comentarioForoMapper = comentarioForoMapper;
    }

    // Agregar comentario
    public ComentarioForoResponse addComentario(ComentarioForoRequest request) {
        ComentarioForo comentario = comentarioForoMapper.toComentarioForo(request);
        comentario.setFechaComentario(LocalDateTime.now());
        ComentarioForo saved = comentarioForoRepository.save(comentario);
        return comentarioForoMapper.toComentarioForoResponse(saved);
    }

    // Obtener todos los comentarios
    public List<ComentarioForoResponse> getAllComentarios() {
        return comentarioForoRepository.findAll().stream()
                .map(comentarioForoMapper::toComentarioForoResponse)
                .toList();
    }

    // Responder a un comentario
    public ComentarioForoResponse respondComentario(Long comentarioId, String respuesta) {
        ComentarioForo comentario = comentarioForoRepository.findById(comentarioId)
                .orElseThrow(() -> new RuntimeException("Comentario no encontrado"));
        comentario.setRespuesta(respuesta);
        comentario.setUpdatedAt(LocalDateTime.now());
        ComentarioForo updated = comentarioForoRepository.save(comentario);
        return comentarioForoMapper.toComentarioForoResponse(updated);
    }

    // Eliminar comentario
    public void deleteComentario(Long id) {
        if (!comentarioForoRepository.existsById(id)) {
            throw new RuntimeException("Comentario no encontrado");
        }
        comentarioForoRepository.deleteById(id);
    }
}
