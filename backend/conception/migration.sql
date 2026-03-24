BEGIN;

-- par défaut sur windows l'encodage n'est pas bon donc on force l'utf8 pour éviter les problèmes
-- notamment sous Windows

SET CLIENT_ENCODING TO 'UTF-8';

DROP TABLE IF EXISTS reader_has_book;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS reader;

CREATE TABLE reader (
  id_reader INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  pseudonyme VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  reader_password VARCHAR(255) NOT NULL
);

CREATE TABLE book (
  id_book INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  isbn VARCHAR(13) UNIQUE NOT NULL,
  title VARCHAR(130) NOT NULL,
  author VARCHAR(100) NOT NULL,
  publish_date VARCHAR NOT NULL,
  page_number SMALLINT NOT NULL,
  summary TEXT NOT NULL
);

CREATE TABLE reader_has_book (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_reader INTEGER REFERENCES reader(id_reader) ON DELETE CASCADE,
  id_book INTEGER REFERENCES book(id_book) ON DELETE CASCADE,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  is_shared BOOLEAN NOT NULL DEFAULT FALSE,
  rate SMALLINT,
  commentary VARCHAR(2000),
  commentary_creation_date TIMESTAMP,
  CONSTRAINT is_rated CHECK (rate IS NOT NULL OR commentary IS NULL)
);

COMMIT;
