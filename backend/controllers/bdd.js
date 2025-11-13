// Toute les routes récupérant des informations liées aux livres dans la base de donnée passent par là
import db from "../config/db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charge les variables d'environnement depuis le .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const bddController = {
  fetchBooks : async (req, res) => { // Récupère tout les livres de la BDD
    // On récupère l'objet et la valeur de la recherche, avec des valeurs par défaut s'il n'y en a pas
    let searchItem = Object.keys(req.query)[0] || "title";
    let searchQuery = req.query[Object.keys(req.query)[0]] ||"";

    let results = await db.query(`
    SELECT book.*, AVG(reader_has_book.rate) AS avg_rate
    FROM book
    JOIN reader_has_book 
    ON book.id_book = reader_has_book.id_book
    WHERE ${searchItem} iLIKE $1
    GROUP BY book.id_book`, [`%${searchQuery}%`]);
    
    const books = results.rows; // On met le tableau de résultat dans une constante
  
    // Si le tableau de résultat est vide, on renvoie une erreur
    if (!books) {
      return res.status(400).json({
        message: "Erreur 400 : aucun livre trouvé",
      });
    }
    
    // Sinon, on envoie le tableau
    res.status(200).json({books});
  },
  
  fetchBookID : async (req, res) => { // Récupère les informations d'un livre dans la BDD
    const ISBN = req.params.bookID; // l'ISBN est envoyé en paramètre de l'URL (/:ISBN), on le récupère ici

    // On récupère les infos du livre qui correspond à l'ISBN, ainsi que la moyenne de ses notes
    const resultInfos = await db.query(
      `SELECT book.*, AVG(reader_has_book.rate) AS avg_rate
      FROM book
      JOIN reader_has_book
      ON book.id_book = reader_has_book.id_book
      WHERE book.ISBN = $1
      GROUP BY book.id_book`, [ISBN]);

    const bookInfos = resultInfos.rows[0]; // On met le tableau de résultat dans une constante

    // Si le tableau de résultat est vide, on renvoie une erreur
    if (!bookInfos) {
      return res.status(400).json({
        message: "Erreur 400 : aucun livre trouvé",
      });
    }

    // On récupère tout les commentaires et leurs infos associés au livre trouvé
    const resultCommentaries = await db.query(`SELECT 
      reader.pseudonyme, 
      reader_has_book.rate, 
      reader_has_book.commentary, reader_has_book.commentary_creation_date 
      FROM reader_has_book
      JOIN reader ON reader_has_book.id_reader = reader.id_reader
      WHERE reader_has_book.id_book = $1`,
      [bookInfos.id_book]);

    const bookCommentaries = resultCommentaries.rows; // On met le nouveau tableau de résultat dans une autre constante

    // On envoie en résultat les deux tableaux de valeurs
    res.status(200).json({bookInfos, bookCommentaries});
  },

  fetchPersonalLibrary : async (req, res) => { // Récupération de la librairie d'un utilisateur

    let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

    // On récupère l'objet et la valeur de la recherche, avec des valeurs par défaut s'il n'y en a pas
    let searchItem = Object.keys(req.query)[0] || "title";
    let searchQuery = req.query[Object.keys(req.query)[0]] ||"";
    
    // if (!Object.keys(search)[0]) { // S'il n'y a pas de query, on prend tout les livres de la bibliothèque utilisateur
    //   results =  await db.query(
    //   `SELECT 
    //   book.id_book, 
    //   book.ISBN, 
    //   book.title, 
    //   book.author 
    //   FROM reader 
    //   JOIN reader_has_book 
    //   ON reader.id_reader = reader_has_book.id_reader 
    //   JOIN book 
    //   ON reader_has_book.id_book = book.id_book 
    //   WHERE email = $1`,
    //   [userEmail], 
    // );} else { // S'il y a une query, on prend les livres qui correspondent à la query dans la bibliothèque utilisateur
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
  // }
    const books = results.rows; // On met le tableau de résultat dans une constante

    // On envoie en résultat le tableau de valeur 
    res.status(200).json({books});
  },

  addBookToPersonalLibrary : async(req, res) => { // fonction pour ajouter un livre à la bibliothèque utilisateur
    try{
      // On récupère l'iD du livre, envoyé en corps de requête
      const { id_book } = req.body;
      if(!id_book) {
        // Si rien n'a été envoyé, on envoie une erreur
        return res.status(400).json({message: "ID du livre requis."})
      }

      let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

      // à partir du mail, on récupère l'identifiant de l'utilisateur dans la Base de données
      const result = await db.query(
        `SELECT id_reader FROM reader WHERE email = $1`,
        [userEmail]
      );

      const id_reader = result.rows[0]?.id_reader;
      // On vérifie si le livre existe déja dans la bibliothèque personnelle de l'utilisateur
      const existingBook = await db.query(
        `SELECT 1 FROM reader_has_book
        WHERE id_reader = $1 AND id_book = $2`,
        [id_reader, id_book]
      );

      if (existingBook.rows.length > 0){
        // Si le livre existe, on renvoie une erreur 409 (a requête entre en conflit avec l'état actuel du serveur)
        return res.status(409).json({ message: "Ce livre est déjà dans votre bibliothèque." });
      }
      //Sinon on insere le livre dans la base de données
      await db.query(
        `INSERT INTO reader_has_book (id_reader, id_book)
         VALUES ($1, $2)`, 
        [id_reader, id_book]
      );
  
      // On envoie un message de validation
      res.status(201).json({ message: "Livre ajouté avec succès." });
  
    } catch (error) {
      console.error(error);
    }
  },
  removeBookFromPersonalLibrary: async(req, res) => { 
      try {
        const id_livre = req.params.id_livre;

        let userEmail = res.locals.user // Récupération du mail de l'utilisateur décodé par le middleware d'authentification

        // à partir du mail, on récupère l'identifiant de l'utilisateur dans la Base de données
        const result = await db.query(
        `SELECT id_reader FROM reader WHERE email = $1`,
        [userEmail]
        );

        const id_reader = result.rows[0]?.id_reader;

        // Supprimer a partir de la table utilisateur_has_livre
        await db.query(
        `DELETE FROM reader_has_book 
        WHERE id_reader = $1 AND id_book = $2`,
        [id_reader, id_livre]
        );

        res.status(200).json({ message: "Livre supprimé avec succès." });

        } catch (error) {
        console.error(error);
      }
        
      }
  }

export default bddController;
