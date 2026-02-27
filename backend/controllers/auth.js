// Toute les routes concernant l'authentification des utilisateurs passent par là
import db from "../config/db.js";
import bcrypt from 'bcrypt';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import validator from 'validator';
import { generateToken } from "../utils/jwt.js";
import { checkPassword } from "../utils/checkPassword.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Inscription utilisateur
export const register= async (req, res) => {
  const { email, password, pseudonyme } = req.body; // Récupération des informations envoyées en corps de requête

  // Vérification de la longueur du pseudo (3 à 15 caractères)
  if (pseudonyme.length < 3 || pseudonyme.length > 15) {
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
    minSymbols: 1
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
      `INSERT INTO reader (email, pseudonyme, reader_password)
      VALUES ($1, $2, $3)
      RETURNING id_reader, email, pseudonyme`,
      [email, pseudonyme, hashedPassword]
    );

    // On enregistre les infos de l'utilisateur dans un objet.
    const user = {pseudonyme:result.rows[0].pseudonyme, email:result.rows[0].email};

    // On génère le token
    const token = generateToken(user.email, result.rows[0].id_reader)

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
};



// Connexion d'un utilisateur
export const login= async (req, res) => {  
  const { email, password } = req.body; // Récupération des informations envoyées en corps de requête

  // On vérifie que le mot de passe correspond
  checkPassword(email, password)

  // On place le pseudo utilisateur dans un objet
  const user = {pseudonyme:result.rows[0].pseudonyme, email:result.rows[0].email};

  // On génère le token
  const token = generateToken(user.email, result.rows[0].id_reader)

  // On renvoie le token et le tableau d'informations utilisateurs
  res.status(200).json({
    token,
    user,
  });
};



// Suppression d'un compte utilisateur
export const deleteUser= async (req, res) => {
  const email = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

  // On vérifie que le mot de passe correspond
  checkPassword(email, req.body.password)

  // On supprime les informations du compte
  try {
    await db.query(`DELETE FROM reader WHERE email = $1`, [email]);
    res.status(200).json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression du compte" });
  }
}
