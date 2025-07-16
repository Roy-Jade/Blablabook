// Toute les routes récupérant des informations liées aux livres dans la base de donnée passent par là
import db from "../config/db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charge les variables d'environnement depuis le .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const bddController = {
  fetchBooks: async (req, res) => { // Récupère tout les livres de la BDD
    let search = req.query; // S'il y a eu une recherche, il y a une partie query sur l'URL (la partie après le ?) ; on tente de la récupérer
    let results;
    if (!Object.keys(search)[0]) { // S'il n'y a pas de query, on prend tout les livres
      results = await db.query(`
      SELECT livre.*, AVG(utilisateur_interagit_livre.note) AS rate
      FROM livre
      JOIN utilisateur_interagit_livre
      ON livre.id_livre = utilisateur_interagit_livre.id_livre
      GROUP BY livre.id_livre`);
    } else { // S'il y a une query, on prend les livres qui correspondent à la query
      results = await db.query(`
      SELECT livre.*, AVG(utilisateur_interagit_livre.note) AS rate
      FROM livre
      JOIN utilisateur_interagit_livre 
      ON livre.id_livre = utilisateur_interagit_livre.id_livre
      WHERE ${Object.keys(search)[0]} iLIKE $1
      GROUP BY livre.id_livre`, [`%${search[Object.keys(search)[0]]}%`]);

    }

    const books = results.rows; // On met le tableau de résultat dans une constante

    // Si le tableau de résultat est vide, on renvoie une erreur
    if (!books) {
      return res.status(401).json({
        message: "Erreur 401 : aucun livre trouvé",
      });
    }

    // Sinon, on envoie le tableau
    res.status(200).json({ books });
  },

  fetchBookID: async (req, res) => { // Récupère les informations d'un livre dans la BDD
    const ISBN = req.params.bookID; // l'ISBN est envoyé en paramètre de l'URL (/:ISBN), on le récupère ici

    // On récupère les infos du livre qui correspond à l'ISBN, ainsi que la moyenne de ses notes
    const resultInfos = await db.query(
      `SELECT livre.*, AVG(utilisateur_interagit_livre.note) AS rate
      FROM livre
      JOIN utilisateur_interagit_livre
      ON livre.id_livre = utilisateur_interagit_livre.id_livre
      WHERE livre.ISBN = $1
      GROUP BY livre.id_livre`, [ISBN]);

    const bookInfos = resultInfos.rows[0]; // On met le tableau de résultat dans une constante

    // Si le tableau de résultat est vide, on renvoie une erreur
    if (!bookInfos) {
      return res.status(401).json({
        message: "Erreur 401 : aucun livre trouvé",
      });
    }

    // On récupère tout les commentaires et leurs infos associés au livre trouvé
    const resultCommentaries = await db.query(`SELECT 
      utilisateur.pseudonyme, 
      utilisateur_interagit_livre.note, 
      utilisateur_interagit_livre.commentaire, utilisateur_interagit_livre.date_creation_commentaire 
      FROM utilisateur_interagit_livre
      JOIN utilisateur ON utilisateur_interagit_livre.id_utilisateur = utilisateur.id_utilisateur
      WHERE utilisateur_interagit_livre.id_livre = $1`,
      [bookInfos.id_livre]);

    const bookCommentaries = resultCommentaries.rows; // On met le nouveau tableau de résultat dans une autre constante

    // On envoie en résultat les deux tableaux de valeurs
    res.status(200).json({ bookInfos, bookCommentaries });
  },

  fetchPersonalLibrary: async (req, res) => { // Récupération de la librairie d'un utilisateur

    // Ce bloc (identique à celui de la vérification du token JWT) permet de récupérer le mail de l'utilisateur
    // Possible amélioration : enregistrer en variable globale le mail lors de la vérification du token pour le réutiliser directement ici
    let authorization = req.headers.authorization.split(" ")[1], decoded;
    decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    let userEmail = decoded.email;

    let search = req.query; // S'il y a eu une recherche, il y a une partie query sur l'URL (la partie après le ?) ; on tente de la récupérer
    let results
    if (!Object.keys(search)[0]) { // S'il n'y a pas de query, on prend tout les livres de la bibliothèque utilisateur
      results = await db.query(
        `SELECT 
      livre.id_livre, 
      livre.ISBN, 
      livre.titre, 
      livre.auteur 
      FROM utilisateur 
      JOIN utilisateur_interagit_livre 
      ON utilisateur.id_utilisateur = utilisateur_interagit_livre.id_utilisateur 
      JOIN livre 
      ON utilisateur_interagit_livre.id_livre = livre.id_livre 
      WHERE email = $1`,
        [userEmail],
      );
    } else { // S'il y a une query, on prend les livres qui correspondent à la query dans la bibliothèque utilisateur
      results = await db.query(
        `SELECT 
      livre.id_livre, 
      livre.ISBN, 
      livre.titre, 
      livre.auteur 
      FROM utilisateur 
      JOIN utilisateur_interagit_livre 
      ON utilisateur.id_utilisateur = utilisateur_interagit_livre.id_utilisateur 
      JOIN livre 
      ON utilisateur_interagit_livre.id_livre = livre.id_livre 
      WHERE (email = $1 AND ${Object.keys(search)[0]} iLIKE $2)`,
        [userEmail, `%${search[Object.keys(search)[0]]}%`],
      );
    }
    const books = results.rows; // On met le tableau de résultat dans une constante

    // On envoie en résultat le tableau de valeur 
    res.status(200).json({ books });
  },

  addBookToPersonalLibrary: async (req, res) => { // fonction pour ajouter un livre à la bibliothèque utilisateur
    try {
      // On récupère l'iD du livre, envoyé en corps de requête
      const { id_livre } = req.body;
      if (!id_livre) {
        // Si rien n'a été envoyé, on envoie une erreur
        return res.status(400).json({ message: "ID du livre requis." })
      }

      // Ce bloc (identique à celui de la vérification du token JWT) permet de récupérer le mail de l'utilisateur
      let authorization = req.headers.authorization.split(" ")[1], decoded;
      decoded = jwt.verify(authorization, process.env.JWT_SECRET);
      let userEmail = decoded.email;

      // à partir du mail, on récupère l'identifiant de l'utilisateur dans la Base de données
      const result = await db.query(
        `SELECT id_utilisateur FROM utilisateur WHERE email = $1`,
        [userEmail]
      );

      const id_utilisateur = result.rows[0]?.id_utilisateur;
      // On vérifie si le livre existe déja dans la bibliothèque personnelle de l'utilisateur
      const existingBook = await db.query(
        `SELECT 1 FROM utilisateur_interagit_livre
        WHERE id_utilisateur = $1 AND id_livre = $2`,
        [id_utilisateur, id_livre]
      );

      if (existingBook.rows.length > 0) {
        // Si le livre existe, on renvoie une erreur 409 (a requête entre en conflit avec l'état actuel du serveur)
        return res.status(409).json({ message: "Ce livre est déjà dans votre bibliothèque." });
      }
      //Sinon on insere le livre dans la base de données
      await db.query(
        `INSERT INTO utilisateur_interagit_livre (id_utilisateur, id_livre)
         VALUES ($1, $2)`,
        [id_utilisateur, id_livre]
      );

      // On envoie un message de validation
      res.status(201).json({ message: "Livre ajouté avec succès." });

    } catch (error) {
      console.error(error);
    }
  },

  //Lecture et Modification du statut lu, partagé dans la BDD

  // Modification du statut lu, partagé dans la BDD
  readedShared: async (req, res) => {
    const { id_livre, isReaded, isShared } = req.body;

    console.log("isReaded : ", isReaded)
    console.log("isShared : ", isShared)

    try {
      // récupérer l'email de l'utilisateur connecté
      let authorization = req.headers.authorization.split(" ")[1], decoded;
      decoded = jwt.verify(authorization, process.env.JWT_SECRET);
      let userEmail = decoded.email;

      //chercher son identifiant dans la Base de données
      const result = await db.query(
        `SELECT id_utilisateur FROM utilisateur WHERE email = $1`,
        [userEmail]
      );

      const id_utilisateur = result.rows[0]?.id_utilisateur;

      console.log("Id_utilisateur : ", id_utilisateur)

      //ajout du statut des checkbox lu, partagé dans la BDD
      const newStatus = await db.query(
        `UPDATE utilisateur_interagit_livre
        SET est_lu = $1, est_partage = $2
        WHERE id_utilisateur = $3 AND id_livre = $4
        RETURNING est_lu, est_partage`,
        [isReaded, isShared, id_utilisateur, id_livre]
      );

      const readedSharedStatus = newStatus.rows;

      console.log(readedSharedStatus)

      res.status(200).json({ readedSharedStatus });

    } catch (error) {
      res.status(500).json({ error: 'Erreur enregistrement' });
    }
  },

  //lecture du statut lu, partagé dans la BDD
  readShare: async (req, res) => {
    const id_utilisateur = (req.params.id_utilisateur);
    try {
      const result = await db.query(
        `SELECT est_lu, est_partage
      FROM utilisateur_interagit_livre 
      JOIN  
      ON utilisateur.id_utilisateur = utilisateur_interagit_livre.id_utilisateur 
      WHERE id_utilisateur = $1`,
        [id_utilisateur]
      );

      if (result.rows.length === 0) {
        return res.json({ isReaded: false, isShared: false });
      }
      res.json({ isReaded: result.rows[0].isReaded, isShared: result.rows[0].isShared });
    } catch (err) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },
}
export default bddController;
