package com.barberlink.service;

import com.barberlink.mapper.ComentarioForoMapper;
import com.barberlink.mapper.request.ComentarioForoRequest;
import com.barberlink.mapper.response.ComentarioForoResponse;
import com.barberlink.model.Barberia;
import com.barberlink.model.Cliente;
import com.barberlink.model.ComentarioForo;
import com.barberlink.repository.BarberiaRepository;
import com.barberlink.repository.ClienteRepository;
import com.barberlink.repository.ComentarioForoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComentarioForoService {

    private final ComentarioForoRepository comentarioForoRepository;
    private final BarberiaRepository barberiaRepository;
    private final ClienteRepository clienteRepository;
    private final ComentarioForoMapper comentarioForoMapper;

    public ComentarioForoService(ComentarioForoRepository comentarioForoRepository,
                                 BarberiaRepository barberiaRepository,
                                 ClienteRepository clienteRepository,
                                 ComentarioForoMapper comentarioForoMapper) {
        this.comentarioForoRepository = comentarioForoRepository;
        this.barberiaRepository = barberiaRepository;
        this.clienteRepository = clienteRepository;
        this.comentarioForoMapper = comentarioForoMapper;
    }

    // Agregar comentario
    public ComentarioForoResponse addComentario(ComentarioForoRequest request) {
        ComentarioForo comentario = comentarioForoMapper.toComentarioForo(request);

        // Buscar y establecer Barbería
        Barberia barberia = barberiaRepository.findById(request.barberia_id())
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con ID: " + request.barberia_id()));
        comentario.setBarberia(barberia);

        // Fetch and set Cliente | Buscar y establecer Cliente
        Cliente cliente = clienteRepository.findById(request.cliente_id())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + request.cliente_id()));
        comentario.setCliente(cliente);

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
