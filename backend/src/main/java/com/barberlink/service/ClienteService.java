package com.barberlink.service;

import com.barberlink.mapper.ClienteMapper;
import com.barberlink.mapper.request.ClienteRequest;
import com.barberlink.mapper.response.ClienteResponse;
import com.barberlink.model.Cliente;
import com.barberlink.model.Rol;
import com.barberlink.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ClienteMapper clienteMapper;

    public ClienteService(ClienteRepository clienteRepository, ClienteMapper clienteMapper) {
        this.clienteRepository = clienteRepository;
        this.clienteMapper = clienteMapper;
    }

    public ClienteResponse registerCliente(ClienteRequest request) {
        Cliente cliente = clienteMapper.toCliente(request);
        cliente.setRol(Rol.CLIENTE);
        cliente.setEstado(true);
        cliente.setCreatedAt(LocalDateTime.now());
        cliente.setUpdatedAt(LocalDateTime.now());
        Cliente saved = clienteRepository.save(cliente);
        return clienteMapper.toClienteResponse(saved);
    }

    public ClienteResponse updateCliente(Long id, ClienteRequest request) {
        Optional<Cliente> opt = clienteRepository.findById(id);
        if(opt.isPresent()){
            Cliente cliente = opt.get();
            // Actualizar campos
            cliente.setEmail(request.email());
            cliente.setContrasena(request.contrasena());
            cliente.setTelefono(request.telefono());
            cliente.setUpdatedAt(LocalDateTime.now());
            // Suponiendo que el mapper no tiene un método update, se asignan manualmente:
            cliente.setNombreCompleto(request.nombreCompleto());
            Cliente updated = clienteRepository.save(cliente);
            return clienteMapper.toClienteResponse(updated);
        }
        throw new RuntimeException("Cliente no encontrado");
    }

    public ClienteResponse getClienteById(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        return clienteMapper.toClienteResponse(cliente);
    }
}
