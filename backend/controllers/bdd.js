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
        message: "Erreur 401 : aucun livre trouvé",
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
        message: "Erreur 401 : aucun livre trouvé",
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
    decoded = jwt.verify(authorization, process.env.JWT_SECRET);
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
  }
}

export default bddController;