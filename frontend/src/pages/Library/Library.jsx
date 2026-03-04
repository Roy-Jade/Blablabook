import BookMini from '../../components/BookMini/BookMini.jsx';
import Sort from '../../components/Sort/Sort';
import './Library.scss';
import api from "../../api/api.js";
import { Helmet } from 'react-helmet';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { Link } from 'react-router';

// Note : ce composant est utilisé pour la librairie publique et les librairies privées
export default function Library() {

    const {currentUser} = useContext(CurrentUserContext) //Infos utilisateur

    const [books, setBooks] = useState(""); // Liste des livres
    const [error, setError] = useState(""); // Message d'erreur
    const [search, setSearch] = useState([]); // Informations recherchées

    let params = useParams().user; // Récupère le paramètre /:user de l'URL

    // Définit l'URL à cibler (target) pour la requête back
    let target = 'books'
    if (params) {
        target = 'personal-library'
    }

    async function fetchBooks() {
        setError(null);
        try {
            const response = await api.get(`/${target}`);
            setBooks(response.data.books);
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }

    // Hook qui va chercher à la génération du composant tout les livres à afficher
    useEffect(() => {
        setBooks(null);
        fetchBooks();
    }, [target])

    // Fonction qui va envoyer la recherche à l'API
    const newResearch = async (event) => {
        setBooks(null);
        setError(null);
        event.preventDefault();
        try {
            const response = await api.get(`/${target}?${search[1]}=${search[0]}`);
            setBooks(response.data.books);
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }

    return(
        <>  
            <Helmet>
                <title>Bibliothèque - BlablaBook</title>
                <meta name='description' content='Découvrez tous les livres disponibles sur BlablaBook.'></meta>
            </Helmet>
            {(currentUser && params !== undefined) ? <h1>Bibliothèque de {currentUser.pseudonyme}</h1> : <h1>Rechercher un livre</h1>}
            <div className='library'>
                <Sort search={search} setSearch={setSearch} newResearch={newResearch}/>
                <div className='library__book-list'>
                    {books ? 
                    (books == "" ? 
                        <p>Aucun livre ne correspond à votre recherche.</p>
                        :
                        books.map((book) => <BookMini key={book.isbn} book={book} onBookDeleted={fetchBooks} />)
                    )
                    :
                    <p>Vous n'avez encore aucun livre dans votre bibliothèque. <Link to={"/library"} className='text_link'>Rechercher un livre à ajouter</Link></p>
                    }
                </div>
            </div>
        </>
    )
}