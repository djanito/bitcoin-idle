--
-- Fichier généré par SQLiteStudio v3.4.0 sur jeu. déc. 1 00:36:40 2022
--
-- Encodage texte utilisé : System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table : components
CREATE TABLE IF NOT EXISTS components (id INTEGER PRIMARY KEY, name VARCHAR NOT NULL UNIQUE, description VARCHAR NOT NULL UNIQUE, price BIGINT NOT NULL, hashrate BIGINT NOT NULL, max INT NOT NULL);
INSERT INTO components (id, name, description, price, hashrate, max) VALUES (0, 'Mouse', 'test', 1.5, 0.01, 5071);
INSERT INTO components (id, name, description, price, hashrate, max) VALUES (1, 'Mouse Pad', 'test2', 10, 0.1, 5053);
INSERT INTO components (id, name, description, price, hashrate, max) VALUES (2, 'Keyboard', 'test3', 110, 0.8, 5053);
INSERT INTO components (id, name, description, price, hashrate, max) VALUES (3, 'Headset', 'test4', 1200, 4.7, 5014);

-- Table : pc
CREATE TABLE IF NOT EXISTS pc (id INTEGER PRIMARY KEY, name VARCHAR NOT NULL UNIQUE, hashrate BIGINT NOT NULL);

-- Table : players
CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY, login VARCHAR NOT NULL UNIQUE, password VARCHAR NOT NULL, avatar BLOB, bitcoin BIGINT);
INSERT INTO players (id, login, password, avatar, bitcoin) VALUES (0, 'djan', 'yigit', NULL, 0);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
