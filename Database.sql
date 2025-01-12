CREATE DATABASE IF NOT EXISTS generador;

USE generador;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(255) NOT NULL,
    apellido_paterno VARCHAR(255) NOT NULL,
    apellido_materno VARCHAR(255),
    telefono VARCHAR(20) UNIQUE,
    email VARCHAR(255) UNIQUE,
    usuario VARCHAR(255) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de generaciones
CREATE TABLE IF NOT EXISTS generaciones (
    id_generacion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NULL, -- Permite NULL para generaciones sin usuario
    distribucion VARCHAR(255) NOT NULL, -- Nombre de la distribución
    parametros JSON NOT NULL, -- Parámetros de la generación (almacenados como JSON)
    resultados LONGBLOB NOT NULL, -- Resultados generados
    grafica LONGBLOB NULL, -- Imagen del gráfico
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora de generación
    archivo_descarga LONGBLOB NULL, -- Archivo generado de descarga
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);