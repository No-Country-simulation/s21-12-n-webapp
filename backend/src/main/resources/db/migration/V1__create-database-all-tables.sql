-- ============================================================
-- Script para crear la base de datos BarberLink y sus tablas
-- ============================================================

-- Tabla: usuario (tabla base para la herencia)
-- ------------------------------------------------------------
CREATE TABLE usuario
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    email      VARCHAR(255)                                  NOT NULL UNIQUE,
    contrasena VARCHAR(255)                                  NOT NULL,
    telefono   VARCHAR(50),
    rol        ENUM ('CLIENTE', 'BARBERIA', 'ADMINISTRADOR') NOT NULL,
    estado     TINYINT(1) DEFAULT 1,
    created_at DATETIME   DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------------
-- Tabla: cliente (hereda de usuario)
-- ------------------------------------------------------------
CREATE TABLE cliente
(
    id              BIGINT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    CONSTRAINT fk_cliente_usuario FOREIGN KEY (id) REFERENCES usuario (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------------
-- Tabla: barberia (hereda de usuario)
-- ------------------------------------------------------------
CREATE TABLE barberia
(
    id               BIGINT PRIMARY KEY,
    nombre_barberia  VARCHAR(255) NOT NULL,
    cuil_responsable VARCHAR(50),
    direccion        VARCHAR(255),
    descripcion      TEXT,
    foto_perfil      VARCHAR(255),
    CONSTRAINT fk_barberia_usuario FOREIGN KEY (id) REFERENCES usuario (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------------
-- Tabla: administrador (hereda de usuario)
-- ------------------------------------------------------------
CREATE TABLE administrador
(
    id BIGINT PRIMARY KEY,
    CONSTRAINT fk_administrador_usuario FOREIGN KEY (id) REFERENCES usuario (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------------
-- Tabla: catalogo (productos y servicios)
-- ------------------------------------------------------------
CREATE TABLE catalogo
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    barberia_id BIGINT                        NOT NULL,
    tipo        ENUM ('PRODUCTO', 'SERVICIO') NOT NULL,
    nombre      VARCHAR(255)                  NOT NULL,
    descripcion TEXT,
    precio      DECIMAL(10, 2),
    imagen_url  VARCHAR(255),
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_catalogo_barberia FOREIGN KEY (barberia_id) REFERENCES barberia (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------------
-- Tabla: turno (reservas)
-- ------------------------------------------------------------
CREATE TABLE turno
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    barberia_id BIGINT                                                      NOT NULL,
    cliente_id  BIGINT                                                      NOT NULL,
    fecha_turno DATE                                                        NOT NULL,
    hora_inicio TIME                                                        NOT NULL,
    hora_fin    TIME,
    estado      ENUM ('DISPONIBLE', 'RESERVADO', 'CANCELADO', 'CONFIRMADO') NOT NULL,
    metodo_pago ENUM ('EFECTIVO', 'TARJETA', 'TRANSFERENCIA'),
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_turno_barberia FOREIGN KEY (barberia_id) REFERENCES barberia (id) ON DELETE CASCADE,
    CONSTRAINT fk_turno_cliente FOREIGN KEY (cliente_id) REFERENCES cliente (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------------
-- Tabla: horario (disponibilidad de turnos)
-- ------------------------------------------------------------
CREATE TABLE horario
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    barberia_id BIGINT                         NOT NULL,
    fecha       DATE                           NOT NULL,
    hora_inicio TIME                           NOT NULL,
    hora_fin    TIME                           NOT NULL,
    estado      ENUM ('DISPONIBLE', 'OCUPADO') NOT NULL,
    CONSTRAINT fk_horario_barberia FOREIGN KEY (barberia_id) REFERENCES barberia (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------------
-- Tabla: comentario_foro (comentarios y calificaciones)
-- ------------------------------------------------------------
CREATE TABLE comentario_foro
(
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    barberia_id      BIGINT NOT NULL,
    cliente_id       BIGINT NOT NULL,
    calificacion     INT    NOT NULL,
    comentario_texto TEXT,
    respuesta        TEXT,
    fecha_comentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_comentario_barberia FOREIGN KEY (barberia_id) REFERENCES barberia (id) ON DELETE CASCADE,
    CONSTRAINT fk_comentario_cliente FOREIGN KEY (cliente_id) REFERENCES cliente (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------------
-- Tabla: promocion (promociones)
-- ------------------------------------------------------------
CREATE TABLE promocion
(
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    barberia_id  BIGINT       NOT NULL,
    titulo       VARCHAR(255) NOT NULL,
    descripcion  TEXT,
    fecha_inicio DATETIME     NOT NULL,
    fecha_fin    DATETIME     NOT NULL,
    condiciones  TEXT,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_promocion_barberia FOREIGN KEY (barberia_id) REFERENCES barberia (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------------
-- Tabla: notificacion (notificaciones)
-- ------------------------------------------------------------
CREATE TABLE notificacion
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT                                                 NOT NULL,
    mensaje    TEXT,
    tipo       ENUM ('TURNO', 'CALIFICACION', 'PROMOCION', 'SISTEMA') NOT NULL,
    estado     TINYINT(1) DEFAULT 0,
    created_at DATETIME   DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notificacion_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------------
-- Tabla: password_recovery (recuperación de contraseña)
-- ------------------------------------------------------------
CREATE TABLE password_recovery
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT       NOT NULL,
    token      VARCHAR(100) NOT NULL,
    created_at DATETIME   DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME     NOT NULL,
    utilizado  TINYINT(1) DEFAULT 0,
    CONSTRAINT fk_password_recovery_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------------
-- Tabla: log_actividad (auditoría y registros)
-- ------------------------------------------------------------
CREATE TABLE log_actividad
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id  BIGINT       NOT NULL,
    accion      VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha       DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_log_actividad_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
