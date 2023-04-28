-- SET client_min_messages = warning;
-- -------------------------
-- Database authentication
-- -------------------------
DROP DATABASE IF EXISTS delivery_service;
--
--
CREATE DATABASE delivery_service;
-- -------------------------
-- Database delivery_service_test
-- -------------------------
DROP DATABASE IF EXISTS delivery_service_test;
--
--
CREATE DATABASE delivery_service_test;
-- -------------------------
-- Role admin
-- -------------------------
-- DROP ROLE IF EXISTS admin;
--
--
-- CREATE ROLE admin WITH PASSWORD 'admin';
-- -------------------------
-- Alter Role admin
-- -------------------------
-- ALTER ROLE admin WITH SUPERUSER CREATEROLE CREATEDB LOGIN;
-- -------------------------
-- Database GRANT PRIVILEGES
-- -------------------------
GRANT ALL PRIVILEGES ON DATABASE delivery_service TO admin;
GRANT ALL PRIVILEGES ON DATABASE delivery_service_test TO admin;
-- -------------------------
-- Connect to delivery_service database
-- -------------------------
\c delivery_service;
-- -------------------------
-- Table users
-- -------------------------
DROP TABLE IF EXISTS users;
--
--
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    role INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
-- -------------------------
-- Table emails
-- -------------------------
DROP TABLE IF EXISTS emails;
--
--
CREATE TABLE IF NOT EXISTS emails (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
-- -------------------------
-- Table phones
-- -------------------------
DROP TABLE IF EXISTS phones;
--
--
CREATE TABLE IF NOT EXISTS phones (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(30) UNIQUE NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
-- -------------------------
-- Table passwords
-- -------------------------
DROP TABLE IF EXISTS passwords;
--
--
CREATE TABLE IF NOT EXISTS passwords (
    id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
-- -------------------------
-- Table passwords
-- -------------------------
DROP TABLE IF EXISTS parcels;
--
--
CREATE TABLE IF NOT EXISTS parcels (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    pick_up_address TEXT NOT NULL,
    drop_off_address TEXT NOT NULL,
    status VARCHAR(100) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
-- -------------------------
-- Table passwords
-- -------------------------
DROP TABLE IF EXISTS orders;
--
--
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    biker_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    parcel_id INT NOT NULL REFERENCES parcels(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT unique_biker_order UNIQUE (parcel_id, biker_id)
);