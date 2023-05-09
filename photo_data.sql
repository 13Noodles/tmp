\c postgres;
\c photo;

INSERT INTO photographes (nom, prenom) VALUES ('Duchamp', 'Marcel');
INSERT INTO photographes (nom, prenom) VALUES ('Von Gloeden', 'Elisa');
INSERT INTO photographes (nom, prenom) VALUES ('Mapplethorpe', 'Gil');
INSERT INTO photographes (nom, prenom) VALUES ('Renoir', 'Pierre-Auguste');


INSERT INTO orientations (nom) VALUES ('portrait');
INSERT INTO orientations (nom) VALUES ('paysage');


INSERT INTO photos (nom, date, orientation, fichier, likes, views, id_photographe) VALUES ('Portrait bleu', '2000-01-01', 1, 'image1.jpg', 69, 10, 1);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Marcheur', 1, 'image2.jpg', 1);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Sol Rouge',  2, 'image3.jpg', 2);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Bulles chaudes',  2, 'image4.jpg', 2);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Nature morte',  2, 'image5.jpg', 3);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Grotte vivante',  2, 'image6.jpg', 4);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Travail Soir',  1, 'image7.jpg', 4);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Citron salade',  1, 'image8.jpg', 1);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Floue artistique',  1, 'image9.jpg', 2);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Auto', 2, 'image10.jpg', 1);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Feuilles violettes', 1, 'image11.jpg', 1);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Ville Nuit', 1, 'image12.jpg', 1);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Baignade', 2, 'image13.jpg', 3);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Caverne Espoir', 1, 'image14.jpg', 4);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Cerveau Cardiaque', 2, 'image15.jpg', 2);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Rayons Luminieux', 2, 'image16.jpg', 3);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Lunette Triangle', 1, 'image17.jpg', 1);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Route Nuit', 1, 'image18.jpg', 1);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Sapin Hall', 1, 'image19.jpg', 2);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Vacances Ski', 1, 'image20.jpg', 1);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Ocean Matin', 1, 'image21.jpg', 4);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Escalator Panne', 1, 'image22.jpg', 3);
INSERT INTO photos (nom, orientation, fichier, id_photographe) VALUES ('Voiture Jaune', 2, 'image23.jpg', 1);

INSERT INTO comments (texte, id_photo) VALUES ('imma comment', 1);
INSERT INTO comments (texte, id_photo) VALUES ('yay', 1);
INSERT INTO comments (texte, id_photo) VALUES ('boop', 1);


-- SELECT * FROM photographes;
-- SELECT * FROM orientations;
-- SELECT * FROM photos;
-- SELECT * FROM comments;
