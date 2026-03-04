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

// Récupétration des informations de l'utilisateur connecté
export const getUser = async (req, res) => {
  const email = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification
  
  try {
    // On récupère le pseudo de l'utilisateur dans la BDD
    const result = await db.query(
      `SELECT pseudonyme FROM reader WHERE email = $1`,
      [email]
    );
    const user = {pseudonyme:result.rows[0].pseudonyme, email:email};
    res.status(200).json({user});
  } catch(error) {
    res.status(500).json({message : "Erreur lors de la récupération des informations"})
  }
}



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

    // On renvoie le token en cookie et le tableau d'informations utilisateurs en json
    res.status(201).cookie(
      'token', token, {
        httpOnly:true, // rend le cookie illisible par du JS
        // secure: true, // oblige l'utilisation d'un HTTP Secure
        sameSite: 'strict', 
        maxAge: 3600000 // fixe sa durée de vie à 3 600 000 millisecondes, soit une heure
      }
    ).json({
      // token,
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
  try {
    await checkPassword(email, password)
  } catch (error) {
    if (error.code ==="Invalid_credentials") {
      return res.status(401).json({message: error.message})
    }
    return res.status(500).json({message: "Erreur serveur lors de la requête"})
  }

  try {
    // On récupère le pseudonyme de l'utilisateur
    const result = await db.query(
      `SELECT id_reader, pseudonyme FROM reader WHERE email = $1`,
      [email]
    );

    // On place le pseudo utilisateur dans un objet
    const user = {pseudonyme:result.rows[0].pseudonyme, email:email};

    // On génère le token
    const token = generateToken(email, result.rows[0].id_reader)

    // On renvoie le token en cookie et le tableau d'informations utilisateurs en json
    res.status(200).cookie(
      'token', token, {
        httpOnly:true, // rend le cookie illisible par du JS
        // secure: true, // oblige l'utilisation d'un HTTP Secure
        sameSite: 'strict', 
        maxAge: 3600000 // fixe sa durée de vie à 3 600 000 millisecondes, soit une heure
      }
    ).json({
      // token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la connexion" });
  }
};



// Déconnexion 
export const logout = (req, res) => {
  res.clearCookie('token').status(200).json({message : "Vous avez été déconnecté avec succès"})
}



// Changement informations du compte
export const editUser = async (req, res) => {
  const email = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification
  const { field, newInfo, password } = req.body; // Récupération des informations envoyées en corps de requête

  // On vérifie que le mot de passe correspond
  try {
    await checkPassword(email, password)
  } catch (error) {
    if (error.code ==="Invalid_credentials") {
      return res.status(401).json({message: error.message})
    }
    return res.status(500).json({message: "Erreur serveur lors de la requête"})
  }

  const allowedField = ["pseudonyme", "email", "password"]
  if(!allowedField.includes(field)){
    return res.status(401).json({message: "Erreur : champ invalide"})
  }

  try {

    // Pour le changement de mot de passe, on hashe, on met à jour et on envoie juste un code 200
    if (field === "password") {
      const hashedPassword = await bcrypt.hash(newInfo, 10);
      await db.query(
        `UPDATE reader SET reader_password = $1 WHERE email = $2`,
        [hashedPassword, email]
      );
      return res.status(200).json({message: "le mot de passe a été changé avec succès"});
    }

    // Sinon, on met à jour et on recrée un objet user et un token
    const result = await db.query(
      `UPDATE reader SET ${field} = $1 
      WHERE email = $2
      RETURNING id_reader, email, pseudonyme`,
      [newInfo, email]
    );
    const user = {pseudonyme:result.rows[0].pseudonyme, email:result.rows[0].email};
    const token = generateToken(email, result.rows[0].id_reader)

    // On renvoie le token en cookie et le tableau d'informations utilisateurs en json
    res.status(200).cookie(
      'token', token, {
        httpOnly:true, // rend le cookie illisible par du JS
        // secure: true, // oblige l'utilisation d'un HTTP Secure
        sameSite: 'strict', 
        maxAge: 3600000 // fixe sa durée de vie à 3 600 000 millisecondes, soit une heure
      }
    ).json({
      // token,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la modification des informations du compte" });
  }
}



// Suppression d'un compte utilisateur
export const deleteUser= async (req, res) => {
  const email = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification
  const {password} = req.body; // Récupération des informations envoyées en corps de requête

  // On vérifie que le mot de passe correspond
  try {
    await checkPassword(email, password)
  } catch (error) {
    if (error.code ==="Invalid_credentials") {
      return res.status(401).json({message: error.message})
    }
    return res.status(500).json({message: "Erreur serveur lors de la requête"})
  }

  // On supprime les informations du compte
  try {
    await db.query(`DELETE FROM reader WHERE email = $1`, [email]);
    res.status(200).json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la suppression du compte" });
  }
}
