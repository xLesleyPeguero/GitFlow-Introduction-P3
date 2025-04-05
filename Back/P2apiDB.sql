CREATE DATABASE P2api;
USE P2api;

CREATE TABLE Usuario (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100),
    Correo VARCHAR(100),
    Clave VARCHAR(50),
    Estatus VARCHAR(25)
);


CREATE TABLE Paises (
    Nombre NVARCHAR(50),
    Gentilicio NVARCHAR(50),
    Capital NVARCHAR(50) ,
    Estatus NVARCHAR(10)
);

INSERT INTO Usuario (Nombre, Correo, Clave, Estatus) VALUES
('Juan', 'juan@example.com', 'clave123', 'Active'),
('María', 'maria@example.com', 'password456', 'Account has been disabled'),
('Carlos', 'carlos@example.com', 'qwerty789', 'Active'),
('Ana', 'ana@example.com', 'pass1234', 'Account has been disabled'),
('Luis', 'luis@example.com', 'abc123xyz', 'Active');


INSERT INTO Paises(Nombre, Gentilicio, Capital, Estatus) VALUES
('República Dominicana', 'Dominicano', 'Santo Domingo', 'Enabled'),
('México', 'Mexicano', 'Ciudad de México', 'Disabled'),
('Argentina', 'Argentino', 'Buenos Aires', 'Disabled'),
('Brasil', 'Brasileño', 'Brasilia', 'Activo'),
('Chile', 'Chileno', 'Santiago', 'Enabled');



SELECT * FROM Usuario;

SELECT * FROM Paises;




