package com.barberlink.service;

import com.barberlink.mapper.BarberiaMapper;
import com.barberlink.mapper.request.BarberiaRequest;
import com.barberlink.mapper.response.BarberiaResponse;
import com.barberlink.model.Barberia;
import com.barberlink.model.Rol;
import com.barberlink.repository.BarberiaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BarberiaService {

    private final BarberiaRepository barberiaRepository;
    private final BarberiaMapper barberiaMapper;
    private final PasswordEncoder passwordEncoder;

    public BarberiaService(BarberiaRepository barberiaRepository,
                           BarberiaMapper barberiaMapper,
                           PasswordEncoder passwordEncoder) {
        this.barberiaRepository = barberiaRepository;
        this.barberiaMapper = barberiaMapper;
        this.passwordEncoder = passwordEncoder;
    }

    // Crear (registrar) una barbería
    public BarberiaResponse registerBarberia(BarberiaRequest request) {
        Barberia barberia = barberiaMapper.toBarberia(request);
        barberia.setRol(Rol.BARBERIA);
        barberia.setEstado(true);
        barberia.setCreatedAt(LocalDateTime.now());
        barberia.setUpdatedAt(LocalDateTime.now());
        barberia.setContrasena(passwordEncoder.encode(request.contrasena()));
        Barberia saved = barberiaRepository.save(barberia);
        return barberiaMapper.toBarberiaResponse(saved);
    }

    // Obtener todas las barberías
    public List<BarberiaResponse> getAllBarberias() {
        return barberiaRepository.findAll().stream()
                .map(barberiaMapper::toBarberiaResponse)
                .toList();
    }

    // Obtener barbería por ID
    public BarberiaResponse getBarberiaById(Long id) {
        Barberia barberia = barberiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada"));
        return barberiaMapper.toBarberiaResponse(barberia);
    }

    // Actualizar barbería
    public BarberiaResponse updateBarberia(Long id, BarberiaRequest request) {
        Barberia barberia = barberiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada"));
        // Actualizar campos
        barberia.setEmail(request.email());
        barberia.setContrasena(passwordEncoder.encode(request.contrasena()));
        barberia.setTelefono(request.telefono());
        barberia.setNombreBarberia(request.nombreBarberia());
        barberia.setCuilResponsable(request.cuilResponsable());
        barberia.setDireccion(request.direccion());
        barberia.setDescripcion(request.descripcion());
        barberia.setFotoPerfil(request.fotoPerfil());
        barberia.setUpdatedAt(LocalDateTime.now());
        Barberia updated = barberiaRepository.save(barberia);
        return barberiaMapper.toBarberiaResponse(updated);
    }

    // Eliminar barbería
    public void deleteBarberia(Long id) {
        if (!barberiaRepository.existsById(id)) {
            throw new RuntimeException("Barbería no encontrada");
        }
        barberiaRepository.deleteById(id);
    }
}
