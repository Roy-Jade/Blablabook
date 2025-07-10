// Fichier du  controller
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
  fetchBooks : async (req, res) => {
    const result = await db.query('SELECT * FROM livre');
    
    const books = result.rows;
  
    if (!books) {
      return res.status(401).json({
        message: "Erreur : aucun livre trouvé",
      });
    }
    
    res.status(200).json({books});
  },

  // fontion pemettant la récupération d'un livre et de son détail
  fetchBookID : async (req, res) => {
    const ISBN = req.params.bookID;
    const resultInfos = await db.query(
      `SELECT * FROM livre
      WHERE ISBN = $1`, [ISBN]);

    // Récupération de l'enregistrement d'un livre depuis result.rows 
    const bookInfos = resultInfos.rows[0];

    if (!bookInfos) {
      return res.status(401).json({
        message: "Erreur : aucun livre trouvé",
      });
    }

    const resultCommentaries = await db.query(`SELECT 
      utilisateur.pseudonyme, 
      utilisateur_interagit_livre.note, 
      utilisateur_interagit_livre.commentaire, utilisateur_interagit_livre.date_creation_commentaire 
      FROM utilisateur_interagit_livre
      JOIN utilisateur ON utilisateur_interagit_livre.id_utilisateur = utilisateur.id_utilisateur
      WHERE utilisateur_interagit_livre.id_livre = $1`, 
      [bookInfos.id_livre]);

    const bookCommentaries = resultCommentaries.rows;

    bookInfos
    res.status(200).json({bookInfos, bookCommentaries});
  },

  fetchPersonalLibrary : async (req, res) => {
    let authorization = req.headers.authorization.split(" ")[1], decoded;
    decoded = jwt.verify(authorization, process.env.SECRET);
    let userEmail = decoded.email
    const results =  await db.query(
      `SELECT 
      utilisateur.email, 
      livre.ISBN, 
      livre.titre, 
      livre.auteur 
      FROM utilisateur 
      JOIN utilisateur_interagit_livre 
      ON utilisateur.id_utilisateur = utilisateur_interagit_livre.id_utilisateur 
      JOIN livre 
      ON utilisateur_interagit_livre.id_livre = livre.id_livre 
      WHERE email = $1`,
      [userEmail]
    );
    const books = results.rows;

    res.status(200).json({books});
  },
  addBookToPersonalLibrary: async (req, res) => {
    try {
      const { id_livre } = req.body;
  
      if (!id_livre) {
        return res.status(400).json({ message: "ID du livre requis." });
      }
  
      const authorization = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(authorization, process.env.SECRET);
      const userEmail = decoded.email;
  
      const result = await db.query(
        `SELECT id_utilisateur FROM utilisateur WHERE email = $1`,
        [userEmail]
      );
  
      const id_utilisateur = result.rows[0]?.id_utilisateur;
      if (!id_utilisateur) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      // Vérifier si le livre existe déja 
      const existingBook = await db.query(
        `SELECT 1 FROM utilisateur_interagit_livre
        WHERE id_utilisateur = $1 AND id_livre = $2`,
        [id_utilisateur, id_livre]
      );
      if (existingBook.rows.length > 0){
        // La requette entre en conflit avec l'état actuel du serveur 
        return res.status(409).json({ message: "Ce livre est déjà dans votre bibliothèque." });
      }
      //Sinon on insere le livre dans la base de données
      await db.query(
        `INSERT INTO utilisateur_interagit_livre (id_utilisateur, id_livre)
         VALUES ($1, $2)`, 
        [id_utilisateur, id_livre]
      );
  
      res.status(201).json({ message: "Livre ajouté avec succès." });
  
    } catch (error) {
      console.error("Erreur dans addBookToLibrary:", error);
      res.status(500).json({ message: "Livre ajouté avec succès.",
      livre: { id_livre, id_utilisateur } });
    }
  }
}

export default bddController;