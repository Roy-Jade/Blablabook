// Controler gérant la recherche des livres dans les bibliothèques API
import db from "../config/db.js";
import { searchOLBooks } from "../services/OpenLibrary.js";
import cache from "../config/cache.js";

export const searchBooks = async (req, res) => {

    // On définit les champs de recherche autorisé pour bloquer les injections SQL
    const allowedSearchItems = ["title", "author"];
    // On récupère l'objet de la recherche, en le limitant aux valeurs autorisées ; on le remplace par "title" si sa valeur est différente
    const searchItem = allowedSearchItems.includes(Object.keys(req.query)[0]) ? Object.keys(req.query)[0] : "title";
    // On récupère le champ de recherche, en lui donnant une valeur nulle s'il n'existe pas
    let searchQuery = req.query[Object.keys(req.query)[0]] ||"";

    // On créée la clé de cache à base des informations de recherche
    const cacheKey = `${searchItem}:${searchQuery}`;
    // On vérifie la présence de la clé dans le cache
    const cached = cache.get(cacheKey);
    // Si la clé est présente, on renvoie directement le tableau stocké en cache
    if (cached) {
        return res.status(200).json({ books: cached })
    };

    try {
        const OLBooks = await searchOLBooks(searchItem, searchQuery)
        const isbnArray = OLBooks.map(book => book.isbn);

        let results = await db.query(`
        SELECT isbn, AVG(reader_has_book.rate) AS avg_rate
        FROM book
        JOIN reader_has_book 
        ON book.id_book = reader_has_book.id_book
        WHERE isbn = ANY($1)
        GROUP BY isbn`, [isbnArray]);

        // Créer un objet associant les ISBN à leurs notes moyennes
        const rateByIsbn = {};
        results.rows.forEach(row => rateByIsbn[row.isbn] = row.avg_rate);

        // Enrichir les résultats OpenLibrary
        const books = OLBooks.map(book => ({
            ...book,
            avg_rate: rateByIsbn[book.isbn] ?? null 
        }));        

        // Si le tableau de résultat est vide, on renvoie une erreur
        if (books.length === 0) {
            return res.status(400).json({
            message: "Erreur 400 : aucun livre trouvé",
            });
        }

        // Sinon, on envoie le tableau, après l'avoir mis en cache
        cache.set(cacheKey, books);
        books.forEach(book => cache.set(`book:${book.isbn}`, book));
        res.status(200).json({books});

    } catch (error) {
    res.status(500).json({message:"Erreur lors de la recherche du livre"})
  }
};