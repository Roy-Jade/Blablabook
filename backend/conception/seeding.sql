BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

-- Vider les tables (TRUNCATE remet les ID à zéro aussi)
TRUNCATE TABLE utilisateur_interagit_livre, livre, utilisateur RESTART IDENTITY CASCADE;

-- Insertion livres
INSERT INTO livre (ISBN, titre, auteur, date_publication, nombre_page, resume) VALUES
('9781234567890', 'Le Livre de la promo Behemoth', 'Grégoire', '2025-01-01', 300, 'Un résumé passionnant.'),
('9780987654321', 'Aventure en React', 'Geneviève', '2025-06-15', 450, 'Un autre résumé captivant.');

-- Insertion utilisateurs
INSERT INTO utilisateur (pseudonyme, email, mot_de_passe) VALUES
('nouhayla', 'nouhayla@example.com', '123456'),
('nicolas', 'nicolas@example.com', 'abcdef');

-- Insertion interaction
INSERT INTO utilisateur_interagit_livre (id_utilisateur, ISBN, est_lu, est_partage, note, commentaire)
VALUES (1, '9781234567890', TRUE, FALSE, 4, 'Super livre !');

COMMIT;
