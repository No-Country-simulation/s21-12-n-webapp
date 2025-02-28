package com.barberlink.service;

import com.barberlink.mapper.PromocionMapper;
import com.barberlink.mapper.request.PromocionRequest;
import com.barberlink.mapper.response.PromocionResponse;
import com.barberlink.model.Promocion;
import com.barberlink.repository.PromocionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PromocionService {

    private final PromocionRepository promocionRepository;
    private final PromocionMapper promocionMapper;

    public PromocionService(PromocionRepository promocionRepository,
                            PromocionMapper promocionMapper) {
        this.promocionRepository = promocionRepository;
        this.promocionMapper = promocionMapper;
    }

    // Crear una nueva promoción
    public PromocionResponse addPromocion(PromocionRequest request) {
        Promocion promocion = promocionMapper.toPromocion(request);
        promocion.setCreatedAt(LocalDateTime.now());
        promocion.setUpdatedAt(LocalDateTime.now());
        Promocion saved = promocionRepository.save(promocion);
        return promocionMapper.toPromocionResponse(saved);
    }

    // Obtener todas las promociones
    public List<PromocionResponse> getAllPromociones() {
        return promocionRepository.findAll().stream()
                .map(promocionMapper::toPromocionResponse)
                .toList();
    }

    // Obtener una promoción por ID
    public PromocionResponse getPromocionById(Long id) {
        Promocion promocion = promocionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promoción no encontrada"));
        return promocionMapper.toPromocionResponse(promocion);
    }

    // Actualizar una promoción existente
    public PromocionResponse updatePromocion(Long id, PromocionRequest request) {
        Promocion promocion = promocionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promoción no encontrada"));
        promocion.setTitulo(request.titulo());
        promocion.setDescripcion(request.descripcion());
        promocion.setFechaInicio(request.fechaInicio());
        promocion.setFechaFin(request.fechaFin());
        promocion.setCondiciones(request.condiciones());
        promocion.setUpdatedAt(LocalDateTime.now());
        Promocion updated = promocionRepository.save(promocion);
        return promocionMapper.toPromocionResponse(updated);
    }

    // Eliminar una promoción por ID
    public void deletePromocion(Long id) {
        if (!promocionRepository.existsById(id)) {
            throw new RuntimeException("Promoción no encontrada");
        }
        promocionRepository.deleteById(id);
    }
}
