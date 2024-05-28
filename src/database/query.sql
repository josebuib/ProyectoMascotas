CREATE DATABASE Prueba02;

USE Prueba02;

CREATE TABLE personas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    telefono INT,
    correo VARCHAR(50)
);


CREATE TABLE mascotas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    age INT,
    observacion VARCHAR(50)
);

SELECT * FROM personas;
SELECT * FROM mascotas;

CREATE USER 'prueba02'@'localhost' IDENTIFIED BY 'prueba02';

GRANT ALL PRIVILEGES ON prueba02.* TO 'prueba02'@'localhost';



GRANT ALL PRIVILEGES ON *.* TO 'prueba02'@'localhost';
