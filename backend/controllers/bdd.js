// Fichier du  controller
import db from "../config/db.js";

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
}

export default bddController;