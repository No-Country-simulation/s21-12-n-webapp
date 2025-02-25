package com.barberlink.service;

import com.barberlink.mapper.BarberiaMapper;
import com.barberlink.mapper.CatalogoMapper;
import com.barberlink.mapper.request.BarberiaRequest;
import com.barberlink.mapper.request.CatalogoRequest;
import com.barberlink.mapper.response.BarberiaResponse;
import com.barberlink.model.Barberia;
import com.barberlink.model.Catalogo;
import com.barberlink.model.Rol;
import com.barberlink.repository.BarberiaRepository;
import com.barberlink.repository.CatalogoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BarberiaService {

    private final BarberiaRepository barberiaRepository;
    private final CatalogoRepository catalogoRepository;
    private final BarberiaMapper barberiaMapper;
    private final CatalogoMapper catalogoMapper;

    public BarberiaService(BarberiaRepository barberiaRepository,
                           CatalogoRepository catalogoRepository,
                           BarberiaMapper barberiaMapper,
                           CatalogoMapper catalogoMapper) {
        this.barberiaRepository = barberiaRepository;
        this.catalogoRepository = catalogoRepository;
        this.barberiaMapper = barberiaMapper;
        this.catalogoMapper = catalogoMapper;
    }

    public BarberiaResponse registerBarberia(BarberiaRequest request) {
        Barberia barberia = barberiaMapper.toBarberia(request);
        barberia.setRol(Rol.BARBERIA);
        barberia.setEstado(true);
        barberia.setCreatedAt(LocalDateTime.now());
        barberia.setUpdatedAt(LocalDateTime.now());
        Barberia saved = barberiaRepository.save(barberia);
        return barberiaMapper.toBarberiaResponse(saved);
    }

    public BarberiaResponse updateBarberia(Long id, BarberiaRequest request) {
        Optional<Barberia> opt = barberiaRepository.findById(id);
        if(opt.isPresent()){
            Barberia barberia = opt.get();
            // Actualizar campos
            barberia.setEmail(request.email());
            barberia.setContrasena(request.contrasena());
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
        throw new RuntimeException("Barbería no encontrada");
    }

    public BarberiaResponse getBarberiaById(Long id) {
        Barberia barberia = barberiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada"));
        return barberiaMapper.toBarberiaResponse(barberia);
    }

    // Gestión del catálogo (productos y servicios)
    public Catalogo addCatalogoItem(Long barberiaId, CatalogoRequest request) {
        Barberia barberia = barberiaRepository.findById(barberiaId)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada"));
        Catalogo catalogo = catalogoMapper.toCatalogo(request);
        catalogo.setBarberia(barberia);
        catalogo.setCreatedAt(LocalDateTime.now());
        catalogo.setUpdatedAt(LocalDateTime.now());
        return catalogoRepository.save(catalogo);
    }

    public Catalogo updateCatalogoItem(Long catalogoId, CatalogoRequest request) {
        Catalogo catalogo = catalogoRepository.findById(catalogoId)
                .orElseThrow(() -> new RuntimeException("Elemento del catálogo no encontrado"));
        // Actualizar campos
        catalogo.setNombre(request.nombre());
        catalogo.setDescripcion(request.descripcion());
        catalogo.setPrecio(request.precio());
        catalogo.setImagenUrl(request.imagenUrl());
        catalogo.setUpdatedAt(LocalDateTime.now());
        return catalogoRepository.save(catalogo);
    }

    public void removeCatalogoItem(Long catalogoId) {
        if(catalogoRepository.existsById(catalogoId)){
            catalogoRepository.deleteById(catalogoId);
        } else {
            throw new RuntimeException("Elemento del catálogo no encontrado");
        }
    }

    // Se pueden agregar métodos para gestionar turnos, horarios, foro, etc.
}
