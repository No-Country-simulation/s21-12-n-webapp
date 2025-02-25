package com.barberlink.service;

import com.barberlink.mapper.PromocionMapper;
import com.barberlink.mapper.request.PromocionRequest;
import com.barberlink.mapper.response.PromocionResponse;
import com.barberlink.model.Promocion;
import com.barberlink.repository.PromocionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PromocionService {

    private final PromocionRepository promocionRepository;
    private final PromocionMapper promocionMapper;

    public PromocionService(PromocionRepository promocionRepository,
                            PromocionMapper promocionMapper) {
        this.promocionRepository = promocionRepository;
        this.promocionMapper = promocionMapper;
    }

    public PromocionResponse addPromocion(PromocionRequest request) {
        Promocion promocion = promocionMapper.toPromocion(request);
        promocion.setCreatedAt(LocalDateTime.now());
        promocion.setUpdatedAt(LocalDateTime.now());
        Promocion saved = promocionRepository.save(promocion);
        return promocionMapper.toPromocionResponse(saved);
    }

    public PromocionResponse updatePromocion(Long promocionId, PromocionRequest request) {
        Promocion promocion = promocionRepository.findById(promocionId)
                .orElseThrow(() -> new RuntimeException("Promoción no encontrada"));
        // Actualizar campos
        promocion.setTitulo(request.titulo());
        promocion.setDescripcion(request.descripcion());
        promocion.setFechaInicio(request.fechaInicio());
        promocion.setFechaFin(request.fechaFin());
        promocion.setCondiciones(request.condiciones());
        promocion.setUpdatedAt(LocalDateTime.now());
        Promocion updated = promocionRepository.save(promocion);
        return promocionMapper.toPromocionResponse(updated);
    }

    public void deletePromocion(Long promocionId) {
        if(promocionRepository.existsById(promocionId)){
            promocionRepository.deleteById(promocionId);
        } else {
            throw new RuntimeException("Promoción no encontrada");
        }
    }
}
