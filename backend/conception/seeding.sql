BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

-- Vider les tables (TRUNCATE remet les ID à zéro aussi)
TRUNCATE TABLE utilisateur_interagit_livre, livre, utilisateur RESTART IDENTITY CASCADE;

-- Insertion livres
INSERT INTO livre (ISBN, titre, auteur, date_publication, nombre_page, resume) VALUES
('9781234567890', 'Le Livre de la promo Behemoth', 'Grégoire', '2025-01-01', 300, 'Un résumé passionnant.'),
('9780987654321', 'Aventure en React', 'Geneviève', '2025-06-15', 450, 'Un autre résumé captivant.'),
('9782277124344', 'Un bonheur insoutenable', 'Ira Levin', '1978-12-05', 384, 'Gouvernés par un ordinateur géant, les hommes sont à l''aide d''un traitement hormonal mensuel adéquat - uniformisés, privés de toute pensée originale. Dans un univers où il n''existe que quatre prénoms différents pour chaque sexe, le jeune Li RM35M4419, surnommé Copeau va vivre une odyssée qui va l''amener d''abord à s''accepter en tant qu''individu, puis à la révolte.');

-- Insertion utilisateurs
INSERT INTO utilisateur (pseudonyme, email, mot_de_passe) VALUES
('nouhayla', 'nouhayla@example.com', '123456'),
('nicolas', 'nicolas@example.com', 'abcdef');

-- Insertion interaction
INSERT INTO utilisateur_interagit_livre (id_utilisateur, ISBN, est_lu, est_partage, note, commentaire)
VALUES (1, '9781234567890', TRUE, FALSE, 4, 'Super livre !');

COMMIT;
