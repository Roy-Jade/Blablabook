
import db from "../config/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const authController = {

// INSCRIPTION D'UN UTILISATEUR
  register: async (req, res) => {
    console.log("Tentative de création du compte...");
    const { email, password, pseudonyme } = req.body;


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
      console.error("Erreur lors de l'inscription :", error);

      // Gestion du doublon pseudonyme ou email
      if (error.code === '23505') {
        return res.status(400).json({
          error: "Email ou pseudonyme déjà utilisé. Veuillez en choisir un autre."
        });
      }

      // Autres erreurs serveur
      res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
    }
  },


// CONNEXION UTILISATEUR
  login : async (req, res) => {
    const { email, password } = req.body;
    const result = await db.query(
      'SELECT * FROM utilisateur WHERE email = $1',
      [email]);

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        message: "Erreur : l'utilisateur et le mot de passe ne correspondent pas",
      });
    }

   // Console.log à supprimer après avoir fait les tests

  console.log("🔐 Connexion reçue");
  console.log("📧 Email reçu :", email);
  console.log("🔑 Mot de passe reçu :", password);

  if (!user) {
  console.log("❌ Utilisateur introuvable.");
  } else {
  console.log("✅ Utilisateur trouvé :", user.email);
  console.log("🔒 Mot de passe hashé stocké :", user.mot_de_passe);
  const isPasswordValid = await bcrypt.compare(password, user.mot_de_passe);
  console.log("🧪 Résultat de bcrypt.compare :", isPasswordValid);

  if (!isPasswordValid) {
    console.log("❌ Mot de passe invalide");
  } else {
    console.log("🎉 Connexion réussie !");
  }
}

  const isPasswordValid = await bcrypt.compare(password, user.mot_de_passe);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Erreur : l'utilisateur et le mot de passe ne correspondent pas",
      });
    }

console.log("SECRET utilisé :", process.env.JWT_SECRET);

const token = jwt.sign({ email: user.email, id: user.id_utilisateur }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log("🔐 Token généré :", token);


    res.status(200).json({
      token,
      user,
    });
  },
}

export default authController;
