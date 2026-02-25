// Controler pour l'ajout et la suppression des livres de la bibliothèque d'un utilisateur
import db from "../config/db.js";


// Ajout d'un livre
export const addBookToPersonalLibrary = async(req, res) => {
  // On récupère l'iD du livre, envoyé en corps de requête
  const id_book = req.params.id_book;

  if(!id_book) {
    // Si rien n'a été envoyé, on envoie une erreur
    return res.status(400).json({message: "ID du livre requis."})
  }

  let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

  try {
    // On vérifie si le livre existe déja dans la bibliothèque personnelle de l'utilisateur
    const existingBook = await db.query(
      `SELECT EXISTS
      (SELECT * FROM reader_has_book
      JOIN reader
      ON reader.id_reader = reader_has_book.id_reader
      WHERE email = $1 AND id_book = $2)`,
      [userEmail, id_book]
    );

    if (existingBook.rows[0].exists){
      // Si le livre existe, on renvoie une erreur 409 (a requête entre en conflit avec l'état actuel du serveur)
      return res.status(409).json({ message: "Ce livre est déjà dans votre bibliothèque." });
    }
    //Sinon on insere le livre dans la base de données
    await db.query(
      `INSERT INTO reader_has_book (id_book, id_reader)
      VALUES ($1,( 
      SELECT id_reader FROM reader
      WHERE email = $2))`, 
      [id_book, userEmail]
    );

    // On envoie un message de validation
    res.status(201).json({ message: "Livre ajouté avec succès." });

  } catch (error) {
    res.status(500).json({message:"Erreur lors de la récupération des données"})
  }
};


// Suppression d'un livre
export const removeBookFromPersonalLibrary = async(req, res) => { 
  const id_book = req.params.id_book;

  let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

  try {
    // Supprimer a partir de la table utilisateur_has_livre
    const result = await db.query(
    `DELETE FROM reader_has_book 
    WHERE id_book = $1 AND id_reader = 
    (SELECT id_reader FROM reader
    WHERE email = $2)`,
    [id_book, userEmail]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Ce livre n'existe pas dans votre bibliothèque." });
    }

    res.status(200).json({ message: "Livre supprimé avec succès." });

  } catch (error) {
    res.status(500).json({message:"Erreur lors de la récupération des données"})
  }
}
