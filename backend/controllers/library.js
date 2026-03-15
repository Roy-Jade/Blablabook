// Controler gérant les informations publiques des livres
import db from "../config/db.js";


// Récupère tout les livres de la BDD
export const fetchBooks = async (req, res) => {

    // On définit les champs de recherche autorisé pour bloquer les injections SQL
    const allowedSearchItems = ["title", "author"];
    // On récupère l'objet de la recherche, en le limitant aux valeurs autorisées ; on le remplace par "title" si sa valeur est différente
    const searchItem = allowedSearchItems.includes(Object.keys(req.query)[0]) ? Object.keys(req.query)[0] : "title";
    // On récupère le champ de recherche, en lui donnant une valeur nulle s'il n'existe pas
    let searchQuery = req.query[Object.keys(req.query)[0]] ||"";

    try {
        let results = await db.query(`
        SELECT book.*, AVG(reader_has_book.rate) AS avg_rate
        FROM book
        JOIN reader_has_book 
        ON book.id_book = reader_has_book.id_book
        WHERE ${searchItem} iLIKE $1
        GROUP BY book.id_book`, [`%${searchQuery}%`]);

        const books = results.rows; // On met le tableau de résultat dans une constante

        // Si le tableau de résultat est vide, on renvoie une erreur
        if (books.length === 0) {
            return res.status(400).json({
            message: "Erreur 400 : aucun livre trouvé",
            });
        }

        // Sinon, on envoie le tableau
        res.status(200).json({books});

    } catch (error) {
    res.status(500).json({message:"Erreur lors de la récupération des données"})
  }
};



// Récupère les informations d'un livre dans la BDD
export const fetchBookID = async (req, res) => { 
    const id_book = req.params.bookID; // l'id est envoyé en paramètre de l'URL (/:id_book), on le récupère ici

    try {
        // On récupère les infos du livre qui correspond à l'ISBN, ainsi que la moyenne de ses notes
        const resultInfos = await db.query(
            `SELECT book.*, AVG(reader_has_book.rate) AS avg_rate
            FROM book
            JOIN reader_has_book
            ON book.id_book = reader_has_book.id_book
            WHERE book.id_book = $1
            GROUP BY book.id_book`, 
            [id_book]
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
            WHERE reader_has_book.id_book = $1 AND reader_has_book.commentary IS NOT NULL`,
            [bookInfos.id_book]
        );

        const bookCommentaries = resultCommentaries.rows; // On met le nouveau tableau de résultat dans une autre constante

        // On envoie en résultat les deux tableaux de valeurs
        res.status(200).json({bookInfos, bookCommentaries});

    } catch (error) {
        res.status(500).json({message:"Erreur lors de la récupération des données"})
    }
}
