// Controler gérant les informations publiques des livres
import db from "../config/db.js";


// Récupère tout les livres de la BDD
export const fetchBooks = async (req, res) => {
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
};



// Récupère les informations d'un livre dans la BDD
export const fetchBookID = async (req, res) => { 
    const ISBN = req.params.bookID; // l'ISBN est envoyé en paramètre de l'URL (/:ISBN), on le récupère ici

    // On récupère les infos du livre qui correspond à l'ISBN, ainsi que la moyenne de ses notes
    const resultInfos = await db.query(
        `SELECT book.*, AVG(reader_has_book.rate) AS avg_rate
        FROM book
        JOIN reader_has_book
        ON book.id_book = reader_has_book.id_book
        WHERE book.ISBN = $1
        GROUP BY book.id_book`, 
        [ISBN]
    );

    const bookInfos = resultInfos.rows[0]; // On met le tableau de résultat dans une constante

    // Si le tableau de résultat est vide, on renvoie une erreur
    if (!bookInfos) {
        return res.status(400).json({
            message: "Erreur 400 : aucun livre trouvé",
        });
    }

    // On récupère tout les commentaires et leurs infos associés au livre trouvé
    const resultCommentaries = await db.query(
        `SELECT 
        reader.pseudonyme, 
        reader_has_book.rate, 
        reader_has_book.commentary, reader_has_book.commentary_creation_date 
        FROM reader_has_book
        JOIN reader ON reader_has_book.id_reader = reader.id_reader
        WHERE reader_has_book.id_book = $1`,
        [bookInfos.id_book]
    );

    const bookCommentaries = resultCommentaries.rows; // On met le nouveau tableau de résultat dans une autre constante

    // On envoie en résultat les deux tableaux de valeurs
    res.status(200).json({bookInfos, bookCommentaries});
}
