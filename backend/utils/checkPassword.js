// Middleware qui vérifie le mot de passe de l'utilisateur pour les requêtes qui le nécessite
import db from "../config/db.js";
import bcrypt from 'bcrypt';

export const checkPassword = async (email, password) => { 
  // On récupère les informations de l'utilisateur
    const result = await db.query(
      'SELECT * FROM reader WHERE email = $1',
      [email]);
  
    // Si l'utilisateur n'est pas trouvé, on renvoie une erreur
    if (!result.rows[0]) {
      const error = new Error("L'utilisateur et le mot de passe ne correspondent pas")
      error.code = "Invalid_credentials"
      throw error
    };
  
    // On vérifie que le mot de passe correspond bien à celui enregistré en base de donnée
    const isPasswordValid = await bcrypt.compare(password, result.rows[0].reader_password);
  
    // Si ce n'est pas le cas, on renvoie une erreur
    if (!isPasswordValid) {
      const error = new Error("L'utilisateur et le mot de passe ne correspondent pas")
      error.code = "Invalid_credentials"
      throw error
    }
}