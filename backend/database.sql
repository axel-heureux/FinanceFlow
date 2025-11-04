-- Création de la base de données
CREATE DATABASE IF NOT EXISTS financeflow;
USE financeflow;

-- Table des catégories
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des sous-catégories
CREATE TABLE IF NOT EXISTS subcategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Table des transactions
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(100),
    description TEXT,
    category_id INT,
    subcategory_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL
);

-- Insertion des catégories de base
INSERT INTO categories (name) VALUES 
('Revenus'),
('Dépenses fixes'),
('Dépenses variables'),
('Épargne'),
('Loisirs');

-- Insertion des sous-catégories de base
INSERT INTO subcategories (category_id, name) VALUES 
(1, 'Salaire'),
(1, 'Freelance'),
(1, 'Autres revenus'),
(2, 'Loyer'),
(2, 'Électricité'),
(2, 'Internet'),
(3, 'Alimentation'),
(3, 'Transport'),
(3, 'Shopping'),
(4, 'Compte épargne'),
(4, 'Investissements'),
(5, 'Restaurants'),
(5, 'Cinéma'),
(5, 'Sport');