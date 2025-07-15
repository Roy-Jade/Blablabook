// Toute les routes concernant l'authentification des utilisateurs passent par là
import db from "../config/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import validator from 'validator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const authController = {

  register: async (req, res) => { // Inscription utilisateur
    console.log("Tentative de création du compte...");
    const { email, password, pseudonyme } = req.body; // Récupération des informations envoyées en corps de requête

    // Vérification de la longueur du pseudo (3 à 15 caractères)
    if(pseudonyme.length <3 || pseudonyme.length>15) {
      return res.status(401).json({
        message: "Erreur 401 : le nom d'utilisateur doit comprendre de 3 à 15 caractères",
      });
    }
    
    // Vérification que le mot de passe soit suffisamment sécurisé
    if (!validator.isStrongPassword(password, {
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols:1
    })) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 12 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial"
      });
    }

    try {
      // On hashe le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // On insère les informations du nouvel utilisateur dans la BDD
      const result = await db.query(
        `INSERT INTO utilisateur (email, pseudonyme, mot_de_passe)
        VALUES ($1, $2, $3)
        RETURNING id_utilisateur, email, pseudonyme`,
        [email, pseudonyme, hashedPassword]
      );

      // On enregistre les infos de l'utilisateur dans un tableau. Le second élément est un tableau vide, correspondant aux livres possédés par le nouvel utilisateur
      const user = [result.rows[0].pseudonyme, []];

      // On récupère l'id du nouvel utilisateur pour générer le token
      const newUserId = await db.query(
        `SELECT id_utilisateur FROM utilisateur WHERE email = $1`,
        [email]
      );

      // On créée un token JWT à partir des infos utilisateurs, d'un secret (qui n'est pas 123), et on lui met une validité en back
      const token = jwt.sign({ email: result.rows[0].email, id: newUserId }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // On renvoie le token et le tableau d'informations utilisateurs
      res.status(201).json({
        token,
        user,
      });

    } catch (error) {

      // Gestion du doublon pseudonyme ou email
      if (error.code === '23505') {
        return res.status(400).json({
          message: "Email ou pseudonyme déjà utilisé. Veuillez en choisir un autre."
        });
      }

      // Autres erreurs serveur
      res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
    }
  },

  login : async (req, res) => {  // Connexion d'un utilisateur
    const { email, password } = req.body; // Récupération des informations envoyées en corps de requête

    // On récupère les informations de l'utilisateur
    const userData = await db.query(
      'SELECT * FROM utilisateur WHERE email = $1',
      [email]);

      // Si l'utilisateur n'est pas trouvé, on renvoie une erreur
    if(!userData.rows[0]) {
      return res.status(401).json({
        message: "Erreur 401 : l'utilisateur et le mot de passe ne correspondent pas",
      });
    }

    // On vérifie que le mot de passe correspond bien à celui enregistré en base de donnée
    const isPasswordValid = await bcrypt.compare(password, userData.rows[0].mot_de_passe);

    // Si ce n'est pas le cas, on renvoie une erreur
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Erreur 401 : l'utilisateur et le mot de passe ne correspondent pas", // Le message est le même pour un problème d'utilisateur ou de MDP, pour ne pas laisser d'information à un hacker
      });
    }

    // On récupère tout les livres de la bibliothèque perso de l'utilisateur (but : faciliter les affichages des livres possédés/lus/partagés en front)
    const userBooks = await db.query(
        'SELECT id_livre, est_lu, est_partage, note FROM utilisateur_interagit_livre WHERE id_utilisateur = $1',
        [userData.rows[0].id_utilisateur]);

    // On place le pseudo utilisateur et le tableau des livres possédés dans un tableau
    const user = [userData.rows[0].pseudonyme, userBooks.rows];

    // On créée le token JWT à partir des infos utilisateurs, d'un secret (qui n'est pas 123), et on lui met une validité en back
    const token = jwt.sign({ email: userData.rows[0].email, id: userData.rows[0]._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // On renvoie le token et le tableau d'informations utilisateurs
    res.status(200).json({
      token,
      user,
    });
  },
}

export default authController;
