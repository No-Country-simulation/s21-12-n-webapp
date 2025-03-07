package com.barberlink.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "password_recovery")
public class PasswordRecovery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    private String token; // Código de verificación o cadena alfanumérica

    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    private Boolean utilizado;

    public PasswordRecovery() {
    }

    public PasswordRecovery(Long id, Usuario usuario, String token, LocalDateTime createdAt, LocalDateTime expiresAt, Boolean utilizado) {
        this.id = id;
        this.usuario = usuario;
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.utilizado = utilizado;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public Boolean getUtilizado() {
        return utilizado;
    }

    public void setUtilizado(Boolean utilizado) {
        this.utilizado = utilizado;
    }
}
