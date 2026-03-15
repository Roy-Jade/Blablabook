// Controler pour les états de livre des biblitohèques personnelles
import db from "../config/db.js";


// Récupération de la librairie d'un utilisateur
export const fetchPersonalLibrary = async (req, res) => {

  let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification
  // On définit les champs de recherche autorisé pour bloquer les injections SQL
  const allowedSearchItems = ["title", "author"];
  // On récupère l'objet de la recherche, en le limitant aux valeurs autorisées ; on le remplace par "title" si sa valeur est différente
  const searchItem = allowedSearchItems.includes(Object.keys(req.query)[0]) ? Object.keys(req.query)[0] : "title";
  // On récupère le champ de recherche, en lui donnant une valeur nulle s'il n'existe pas
  let searchQuery = req.query[Object.keys(req.query)[0]] ||"";

  try {
    
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

  } catch (error) {
    res.status(500).json({message:"Erreur lors de la récupération des données"})
  }
};



// Récupère l'information de la possession d'un livre par un utilisateur
export const fetchBookOwnership = async (req, res) => {

  const id_book = req.params.id_book;
  if(!id_book) {
    // Si rien n'a été envoyé, on envoie une erreur
    return res.status(400).json({message: "ID du livre requis."})
  }

  let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

  try {
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

    } catch (error) {
      res.status(500).json({message:"Erreur lors de la récupération des données"})
    }
};



// Récupère l'information de partage et de lecture d'un livre par un utilisateur
export const fetchBookUserData = async (req, res) => {

  const id_book = req.params.id_book;
  if(!id_book) {
    // Si rien n'a été envoyé, on envoie une erreur
    return res.status(400).json({message: "ID du livre requis."})
  }

  let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

  try {
    const result = await db.query(
      `SELECT is_read, is_shared FROM reader_has_book
      JOIN reader
      ON reader.id_reader = reader_has_book.id_reader
      WHERE email = $1 AND id_book = $2`,
      [userEmail, id_book]
    );

    const data = result.rows[0];

    if (data===undefined) {
      return res.status(404).json({message:"Aucun livre correpondant"})
    }

    return res.status(200).json({data})

  } catch (error) {
    res.status(500).json({message:"Erreur lors de la récupération des données"})
  }
};



// Récupère la note de l'utilisateur pour un livre 
export const fetchBookUserNote = async (req, res) => {
  const id_book = req.params.bookID; // l'id est envoyé en paramètre de l'URL (/:id_book), on le récupère ici

  if(!id_book) {
    // Si rien n'a été envoyé, on envoie une erreur
    return res.status(400).json({message: "ID du livre requis."})
  }

  let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

  try {
    const result = await db.query(
      `SELECT rate FROM reader_has_book
      JOIN reader
      ON reader.id_reader = reader_has_book.id_reader
      WHERE email = $1 AND id_book = $2`,
      [userEmail, id_book]
    )

    const userRate = result.rows[0]?.rate ?? null;

    if (userRate===undefined) {
      return res.status(404).json({message:"Aucun livre correpondant"})
    }

    return res.status(200).json({message : `Note récupérée : ${userRate}`, userRate})

  } catch(error) {
    res.status(500).json({message:"Erreur lors de la récupération des données"})
  }
}



// Modifie la note ou le commentaire de l'utilisateur pour un livre 
export const updateBookUserData = async (req, res) => {
  const id_book = req.params.bookID; // l'id est envoyé en paramètre de l'URL (/:id_book), on le récupère ici
  const {field, newData} = req.body // le champ changé et sa valeur sont récupérés dans le body

  if(!id_book) {
    // Si rien n'a été envoyé, on envoie une erreur
    return res.status(400).json({message: "ID du livre requis."})
  }
  
  const allowedField = ["rate", "commentary", "reset_rate", "reset_commentary"]
  if(!allowedField.includes(field)){
    return res.status(401).json({message: "Erreur : champ invalide"})
  }

  let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

  try {
    if (field ==="reset_rate") {
      await db.query(
        `UPDATE reader_has_book SET rate = NULL, commentary = NULL, commentary_creation_date = NULL
        FROM reader
        WHERE reader.id_reader = reader_has_book.id_reader AND email = $1 AND id_book = $2`,
        [userEmail, id_book]
      )

      return res.status(200).json({message : `Votre note et votre commentaire ont été supprimés`})
    }

    if (field === "reset_commentary") {
      await db.query(
        `UPDATE reader_has_book SET commentary = NULL, commentary_creation_date = NULL
        FROM reader
        WHERE reader.id_reader = reader_has_book.id_reader AND email = $1 AND id_book = $2`,
        [userEmail, id_book]
      )

      return res.status(200).json({message : `Votre commentaire a été supprimé`})
    }

    if (field === "commentary") {
      await db.query(
        `UPDATE reader_has_book SET commentary = $1, commentary_creation_date = NOW()
        FROM reader
        WHERE reader.id_reader = reader_has_book.id_reader AND email = $2 AND id_book = $3`,
        [newData, userEmail, id_book]
      )

      return res.status(200).json({message : `Votre commentaire a été enregistré`})
    }

    await db.query(
      `UPDATE reader_has_book SET ${field} = $1
      FROM reader
      WHERE reader.id_reader = reader_has_book.id_reader AND email = $2 AND id_book = $3`,
      [newData, userEmail, id_book]
    )

    return res.status(200).json({message : `${field} mis à jour : ${newData}`})

  } catch(error) {
    res.status(500).json({message:"Erreur lors de la récupération des données"})
  }
}
