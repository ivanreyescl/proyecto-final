CREATE DATABASE pccomponents;

\c pccomponents;

-- Tabla Users
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(254),
    password VARCHAR(255),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    inactive BOOLEAN
);

-- Tabla Roles
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    superuser BOOLEAN,
    description VARCHAR(255)
);

-- Insertar roles por defecto
INSERT INTO Roles (superuser, description) VALUES
    (FALSE, 'Normal'),
    (TRUE, 'Administrador');

-- Tabla Categories
CREATE TABLE Categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Tabla Products
CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES Categories(id),
    name VARCHAR(255),
    detail VARCHAR(255),
    code VARCHAR(50),
    price INTEGER,
    stock INTEGER,
    image TEXT
);

INSERT INTO Categories (name) VALUES
    ('Procesadores'),
    ('GPU'),
    ('RAM')

-- Tabla UserRoles
CREATE TABLE UserRoles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    role_id INTEGER REFERENCES Roles(id),
    name VARCHAR(255)
);

-- Tabla UserFavorites
CREATE TABLE UserFavorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    total_liked INTEGER
);

-- Tabla FavoriteItems
CREATE TABLE FavoriteItems (
    id SERIAL PRIMARY KEY,
    user_favorite_id INTEGER REFERENCES UserFavorites(id),
    product_id INTEGER REFERENCES Products(id)
);

-- Tabla UserCarts
CREATE TABLE UserCarts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    total_price INTEGER
);

-- Tabla CartItems
CREATE TABLE CartItems (
    id SERIAL PRIMARY KEY,
    user_cart_id INTEGER REFERENCES UserCarts(id),
    product_id INTEGER REFERENCES Products(id),
    quantity INTEGER
);
