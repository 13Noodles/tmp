\c postgres;
DROP DATABASE IF EXISTS photo;
CREATE DATABASE photo;

\c photo;

CREATE TABLE photographes (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL
);

CREATE TABLE orientations (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  date DATE DEFAULT NOW(),
  orientation INTEGER NOT NULL REFERENCES orientations(id),
  fichier VARCHAR(100) NOT NULL,
  likes INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  id_photographe INTEGER NOT NULL REFERENCES photographes(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  texte VARCHAR(200) NOT NULL,
  id_photo INTEGER NOT NULL REFERENCES photos(id)
);
