package com.barberlink.service;

import com.barberlink.mapper.ClienteMapper;
import com.barberlink.mapper.request.ClienteRequest;
import com.barberlink.mapper.response.ClienteResponse;
import com.barberlink.model.Cliente;
import com.barberlink.model.Rol;
import com.barberlink.repository.ClienteRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ClienteMapper clienteMapper;
    private final PasswordEncoder passwordEncoder;

    public ClienteService(ClienteRepository clienteRepository,
                          ClienteMapper clienteMapper,
                          PasswordEncoder passwordEncoder) {
        this.clienteRepository = clienteRepository;
        this.clienteMapper = clienteMapper;
        this.passwordEncoder = passwordEncoder;
    }

    // Registrar cliente
    public ClienteResponse registerCliente(ClienteRequest request) {
        Cliente cliente = clienteMapper.toCliente(request);
        cliente.setRol(Rol.CLIENTE);
        cliente.setEstado(true);
        cliente.setCreatedAt(LocalDateTime.now());
        cliente.setUpdatedAt(LocalDateTime.now());
        // Opcional: codificar la contraseña si se requiere
        cliente.setContrasena(passwordEncoder.encode(request.contrasena()));
        Cliente saved = clienteRepository.save(cliente);
        return clienteMapper.toClienteResponse(saved);
    }

    // Obtener todos los clientes
    public List<ClienteResponse> getAllClientes() {
        return clienteRepository.findAll().stream()
                .map(clienteMapper::toClienteResponse)
                .toList();
    }

    // Obtener cliente por ID
    public ClienteResponse getClienteById(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        return clienteMapper.toClienteResponse(cliente);
    }

    // Actualizar cliente
    public ClienteResponse updateCliente(Long id, ClienteRequest request) {
        Optional<Cliente> opt = clienteRepository.findById(id);
        if (opt.isPresent()) {
            Cliente cliente = opt.get();
            cliente.setEmail(request.email());
            cliente.setContrasena(passwordEncoder.encode(request.contrasena()));
            cliente.setTelefono(request.telefono());
            cliente.setNombreCompleto(request.nombreCompleto());
            cliente.setUpdatedAt(LocalDateTime.now());
            Cliente updated = clienteRepository.save(cliente);
            return clienteMapper.toClienteResponse(updated);
        }
        throw new RuntimeException("Cliente no encontrado");
    }

    // Eliminar cliente
    public void deleteCliente(Long id) {
        if (!clienteRepository.existsById(id)) {
            throw new RuntimeException("Cliente no encontrado");
        }
        clienteRepository.deleteById(id);
    }
}
