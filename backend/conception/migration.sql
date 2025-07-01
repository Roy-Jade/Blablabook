BEGIN;

-- par défaut sur windows l'encodage n'est pas bon donc on force l'utf8 pour éviter les problèmes
-- notamment sous Windows

SET CLIENT_ENCODING TO 'UTF-8';

DROP TABLE IF EXISTS utilisateur_interagit_livre;
DROP TABLE IF EXISTS livre;
DROP TABLE IF EXISTS utilisateur;

CREATE TABLE utilisateur (
  id_utilisateur INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  pseudonyme VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  mot_de_passe VARCHAR(255) NOT NULL
);

CREATE TABLE livre (
  id_livre INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ISBN VARCHAR(13) UNIQUE NOT NULL,
  titre VARCHAR(130) NOT NULL,
  auteur VARCHAR(100) NOT NULL,
  date_publication VARCHAR NOT NULL,
  nombre_page SMALLINT NOT NULL,
  summary VARCHAR(1000) NOT NULL
);

CREATE TABLE utilisateur_interagit_livre (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_utilisateur INTEGER REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
  ISBN VARCHAR(13) REFERENCES livre(ISBN) ON DELETE CASCADE,
  est_lu BOOLEAN NOT NULL DEFAULT FALSE,
  est_partage BOOLEAN NOT NULL DEFAULT FALSE,
  note SMALLINT,
  commentaire VARCHAR(2000),
  date_creation_commentaire TIMESTAMP DEFAULT NOW(),
  CONSTRAINT check_note_commentaire CHECK (note IS NOT NULL OR commentaire IS NULL)
);

COMMIT;
