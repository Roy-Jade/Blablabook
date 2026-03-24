// Controler pour l'ajout et la suppression des livres de la bibliothèque d'un utilisateur
import db from "../config/db.js";
import cache from "../config/cache.js";
import { getOLBookData } from "../services/OpenLibrary.js";

// Ajout d'un livre
export const addBookToPersonalLibrary = async(req, res) => {
  // On récupère l'iD du livre, envoyé en corps de requête
  const isbn = req.params.isbn;
  const userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

  if(!isbn) {
    // Si rien n'a été envoyé, on envoie une erreur
    return res.status(400).json({message: "ISBN du livre requis."})
  }

  try {

    // On vérifie que le livre existe dans la BDD
    const existingISBN = await db.query(
      `SELECT id_book FROM book
      WHERE isbn = $1`,
      [isbn]
    )

    // S'il n'existe pas, on l'ajoute à partir de l'API Open Library
    if (!existingISBN.rows[0]?.id_book) {
      // On regarde si le livre est en cache
      const cached = cache.get(`book:${isbn}`);
      // On demande une requête sur le service OpenLibrary en ajoutant l'auteur depuis le cache s'il y est
      const newBook = await getOLBookData(isbn, cached?.author ?? null);
      // Si le livre manque d'une information critique (titre ou ISBN), on bloque son ajout
      if (!newBook.isbn || !newBook.title) {
        return res.status(400).json({ message: "Données du livre insuffisantes pour l'ajout." });
      }
      // On insère ensuite le livre
      await db.query(`
        INSERT INTO book (isbn, title, author, publish_date, page_number, summary)
        VALUES ($1, $2, $3, $4, $5, $6)`,
      [newBook.isbn, newBook.title, newBook.author, newBook.publish_date, newBook.page_number, newBook.summary])
    } 

    //S'il existe en BDD, on vérifie s'il n'est pas déjà dans la bibliothèque de l'utilisateur
    else {
      const existingBook = await db.query(
        `SELECT EXISTS
        (SELECT * FROM reader_has_book
        JOIN reader
        ON reader.id_reader = reader_has_book.id_reader
        JOIN book
        ON book.id_book = reader_has_book.id_book
        WHERE email = $1 AND isbn = $2)`,
        [userEmail, isbn]
      );

      if (existingBook.rows[0].exists){
        // Si le livre existe, on renvoie une erreur 409 (a requête entre en conflit avec l'état actuel du serveur)
        return res.status(409).json({ message: "Ce livre est déjà dans votre bibliothèque." });
      }
    }

    //Sinon on insère le livre dans la base de données
    await db.query(
      `INSERT INTO reader_has_book (id_book, id_reader)
      VALUES ((
      SELECT id_book FROM book
      WHERE isbn = $1),( 
      SELECT id_reader FROM reader
      WHERE email = $2))`, 
      [isbn, userEmail]
    );

    // On envoie un message de validation
    res.status(201).json({ message: "Livre ajouté avec succès." });

  } catch (error) {
    res.status(500).json({message:"Erreur lors de l'ajout du livre dans la bibliothèque"})
  }
};


// Suppression d'un livre
export const removeBookFromPersonalLibrary = async(req, res) => { 
  const isbn = req.params.isbn;

  let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

  try {
    // Supprimer a partir de la table utilisateur_has_livre
    const result = await db.query(
    `DELETE FROM reader_has_book 
    WHERE id_book = (
    SELECT id_book FROM book 
    WHERE isbn = $1) 
    AND id_reader = 
    (SELECT id_reader FROM reader
    WHERE email = $2)`,
    [isbn, userEmail]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Ce livre n'existe pas dans votre bibliothèque." });
    }

    res.status(200).json({ message: "Livre supprimé avec succès." });

  } catch (error) {
    res.status(500).json({message:"Erreur lors de la suppression du livre"})
  }
}
