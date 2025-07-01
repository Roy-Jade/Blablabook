BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

-- Vider les tables (TRUNCATE remet les ID à zéro aussi)
TRUNCATE TABLE utilisateur_interagit_livre, livre, utilisateur RESTART IDENTITY CASCADE;

-- Insertion livres
INSERT INTO livre (ISBN, titre, auteur, date_publication, nombre_page, summary) VALUES
('9782070584628', 'Harry Potter à l''école des sorciers', 'J. K. Rowling', 'Nov 15, 2017', 300, 'Mr et Mrs Dursley, qui habitaient au 4, Privet Drive, avaient toujours affirmé avec la plus grande fierté qu’ils étaient parfaitement normaux, merci pour eux. Jamais quiconque n’aurait imaginé qu’ils puissent se trouver impliqués dans quoi que ce soit d’étrange ou de mystérieux. Ils n’avaient pas de temps à perdre avec des sornettes.'),
('9782266008556', 'Dune 1', 'Frank Herbert', '1980', 450, 'Un résumé captivant.'),
('9782747014403', 'Eragon', 'Christopher Paolini', 'Oct 01, 2004', 450, 'Un résumé captivant.'),
('9781606646045', 'Le Comte De Monte-Cristo', 'Alexandre Dumas', '1909', 450, 'LE 24 FEVRIER 1815, la vigie de Notre-Dame-de-la-Garde signale l''arrivee du trois-mats le Pharaon, venant de Smyrne, Trieste et Naples.');

-- Insertion utilisateurs
INSERT INTO utilisateur (pseudonyme, email, mot_de_passe) VALUES
('nouhayla', 'nouhayla@example.com', '123456'),
('nicolas', 'nicolas@example.com', 'abcdef'),
('admin', 'admin@example.com', '$2b$10$EzkYZKhVm2d7z6wsGyFkV.XA7e4NT.kwKaK0/ycKD/7lWj7VwWUkO');

-- Insertion interaction
INSERT INTO utilisateur_interagit_livre (id_utilisateur, ISBN, est_lu, est_partage, note, commentaire)
VALUES (1, '9781606646045', TRUE, FALSE, 4, 'Super livre !');

COMMIT;
