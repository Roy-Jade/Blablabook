// Middleware qui vérifie le mot de passe de l'utilisateur pour les requêtes qui le nécessite
import db from "../config/db.js";
import bcrypt from 'bcrypt';

export const checkPassword = async (email, password) => {

    try {
        // On récupère les informations de l'utilisateur
          const result = await db.query(
            'SELECT * FROM reader WHERE email = $1',
            [email]);
        
          // Si l'utilisateur n'est pas trouvé, on renvoie une erreur
          if (!result.rows[0]) {
            return res.status(401).json({
              message: "Erreur 401 : l'utilisateur et le mot de passe ne correspondent pas",
            });
          }
        
          // On vérifie que le mot de passe correspond bien à celui enregistré en base de donnée
          const isPasswordValid = await bcrypt.compare(password, result.rows[0].reader_password);
        
          // Si ce n'est pas le cas, on renvoie une erreur
          if (!isPasswordValid) {
            return res.status(401).json({
              message: "Erreur 401 : l'utilisateur et le mot de passe ne correspondent pas", // Le message est le même pour un problème d'utilisateur ou de MDP, pour ne pas laisser d'information à un hacker
            });
          }

    } catch (e) {
        // S'il est non valide, on renvoie une erreur
        return res.status(401).send("Erreur 401 : accès non autorisé");
    }
}