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

  fetchPersonalLibrary : async (req, res) => {
    console.log("Récupération de la bibliothèque personnelle...")
    let authorization = req.headers.authorization.split(" ")[1], decoded;
    decoded = jwt.verify(authorization, process.env.SECRET);
    let userEmail = decoded.email
    console.log((userEmail))
    const results =  await db.query(
      'SELECT utilisateur.email, livre.ISBN, livre.titre, livre.auteur FROM utilisateur JOIN utilisateur_interagit_livre ON utilisateur.id_utilisateur = utilisateur_interagit_livre.id_utilisateur JOIN livre ON utilisateur_interagit_livre.ISBN = livre.ISBN WHERE email = $1',
      [userEmail]
    );
    const userBooks = results.rows;
    console.log(userBooks)

    res.status(200).json({userBooks});
  }
}

export default bddController;