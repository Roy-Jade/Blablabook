
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

// INSCRIPTION D'UN UTILISATEUR
  register: async (req, res) => {
    console.log("Tentative de création du compte...");
    const { email, password, pseudonyme } = req.body;

    if(pseudonyme.length <3 || pseudonyme.length>15) {
      return res.status(401).json({
        message: "Erreur 401 : le nom d'utilisateur doit comprendre de 3 à 15 caractères",
      });
    }

    // TO DO : avec validator, vérifier que le MDP fasse 8 caractères min, avec une majuscule, une minuscule, un chiffre et un caractère spécial
    
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

      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertion dans la bdd
      const result = await db.query(
        `INSERT INTO utilisateur (email, pseudonyme, mot_de_passe)
        VALUES ($1, $2, $3)
        RETURNING id_utilisateur, email, pseudonyme`,
        [email, pseudonyme, hashedPassword]
      );

      const user = result.rows[0];

      // Succès de l'inscription
      res.status(201).json({ user });

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


// CONNEXION UTILISATEUR
  login : async (req, res) => {
    const { email, password } = req.body;
    const userData = await db.query(
      'SELECT * FROM utilisateur WHERE email = $1',
      [email]);

    if(!userData.rows[0]) {
      return res.status(401).json({
        message: "Erreur 401 : l'utilisateur et le mot de passe ne correspondent pas",
      });
    }

    const userBooks = await db.query(
        'SELECT id_livre, est_lu, est_partage, note FROM utilisateur_interagit_livre WHERE id_utilisateur = $1',
        [userData.rows[0].id_utilisateur]);

    const user = [userData.rows[0].pseudonyme, userBooks.rows];

    const isPasswordValid = await bcrypt.compare(password, userData.rows[0].mot_de_passe);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Erreur 401 : l'utilisateur et le mot de passe ne correspondent pas",
      });
    }

    const token = jwt.sign({ email: userData.rows[0].email, id: userData.rows[0]._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user,
    });
  },
}

export default authController;
