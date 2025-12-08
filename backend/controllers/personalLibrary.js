// Controler pour les états de livre des biblitohèques personnelles
import db from "../config/db.js";


// Récupération de la librairie d'un utilisateur
export const fetchPersonalLibrary = async (req, res) => {

  let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

  // On récupère l'objet et la valeur de la recherche, avec des valeurs par défaut s'il n'y en a pas
  let searchItem = Object.keys(req.query)[0] || "title";
  let searchQuery = req.query[Object.keys(req.query)[0]] ||"";
  
  let results =  await db.query(
    `SELECT 
    book.id_book, 
    book.ISBN, 
    book.title, 
    book.author 
    FROM reader 
    JOIN reader_has_book 
    ON reader.id_reader = reader_has_book.id_reader 
    JOIN book 
    ON reader_has_book.id_book = book.id_book 
    WHERE (email = $1 AND ${searchItem} iLIKE $2)`,
    [userEmail, `%${searchQuery}%`], 
  );
  const books = results.rows; // On met le tableau de résultat dans une constante

  // On envoie en résultat le tableau de valeur 
  res.status(200).json({books});
};



// Récupère l'information de la possession d'un livre par un utilisateur
export const fetchBookOwnership = async (req, res) => {
  const id_book = req.params.id_book;
  if(!id_book) {
    // Si rien n'a été envoyé, on envoie une erreur
    return res.status(400).json({message: "ID du livre requis."})
  }

  let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

  const result = await db.query(
    `SELECT EXISTS(
    SELECT email FROM reader
    JOIN reader_has_book
    ON reader.id_reader = reader_has_book.id_reader 
    WHERE email = $1 AND id_book = $2)`,
    [userEmail, id_book]
  );

  const ownership = result.rows[0];
  return res.status(200).json({ownership})
};



// Récupère l'information de partage et de lecture d'un livre par un utilisateur
export const fetchBookUserData = async (req, res) => {
  const id_book = req.params.id_book;
  if(!id_book) {
    // Si rien n'a été envoyé, on envoie une erreur
    return res.status(400).json({message: "ID du livre requis."})
  }

  let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

  const result = await db.query(
    `SELECT is_read, is_shared FROM reader_has_book
    JOIN reader
    ON reader.id_reader = reader_has_book.id_reader
    WHERE email = $1 AND id_book = $2`,
    [userEmail, id_book]
  );

  const data = result.rows[0];
  return res.status(200).json({data})
};



