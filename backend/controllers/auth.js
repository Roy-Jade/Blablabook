// Fichier du  controller
import db from "../config/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charge les variables d'environnement depuis le .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const authController = {
  // register : async (req, res) => {
  //   console.log("Création du compte...")
  //   const { email, password } = req.body;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = await User.create({ email, password: hashedPassword });
  
  //   res.status(201).json({
  //     user,
  //   });
  // },

  login : async (req, res) => {
    const { email, password } = req.body;
    const userData = await db.query(
      'SELECT * FROM utilisateur WHERE email = $1',
      [email]);

    const userBooks = await db.query(
        'SELECT id_livre, est_lu, est_partage, note FROM utilisateur_interagit_livre WHERE id_utilisateur = $1',
        [userData.rows[0].id_utilisateur]);
    
    const user = [userData.rows[0].pseudonyme, userBooks.rows];
  
    if (!user) {
      return res.status(401).json({
        message: "Erreur 401 : l'utilisateur et le mot de passe ne correspondent pas",
      });
    }
    
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