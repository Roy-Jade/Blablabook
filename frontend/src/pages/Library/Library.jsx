import BookMini from '../../components/BookMini/BookMini.jsx';
import Sort from '../../components/Sort/Sort';
import './Library.scss';
import api from "../../../api.js";
import { Helmet } from 'react-helmet';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { CurrentUserContext } from '../../Contexts.js';
import { Link } from 'react-router';


export default function Library() {

    const user = useContext(CurrentUserContext);
    const [books, setBooks] = useState("");
    const [error, setError] = useState("");
    const [search, setSearch] = useState([]);

    let params = useParams().user;
    let target = 'books'
    if (params) {
        target = 'personalLibrary'
    }

    let userName = ''
    if(user.currentUser !== null) {
        if (user.currentUser[0] !== null) {
            userName = user.currentUser[0];
        }
    }

    useEffect(() => {
        async function startFetchingLibrary() {
            setBooks(null);
            setError(null);
            try {
                const response = await api.get(`/${target}`);
                setBooks(response.data.books);
            } catch (error) {
                setError(error.response.data.message)
            }
        }
        startFetchingLibrary();
    }, [target])

    const newResearch = async (event) => {
        setBooks(null);
        setError(null);
        event.preventDefault();
        try {
            const response = await api.get(`/${target}?${search[1]}=${search[0]}`);
            setBooks(response.data.books);
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return(
        <>  
            <Helmet>
                <title>Bibliothèque - BlablaBook</title>
                <meta name='description' content='Découvrez tous les livres disponibles sur BlablaBook.'></meta>
            </Helmet>
            {(userName && params !== undefined) ? <h1>Bibliothèque de {userName}</h1> : <h1>Rechercher un livre</h1>}
            <div className='library'>
                <Sort search={search} setSearch={setSearch} newResearch={newResearch}/>
                <div className='library__book-list'>
                    {books ? 
                    (books == "" ? 
                        <p>Aucun livre ne correspond à votre recherche.</p>
                        :
                        books.map((book) => <BookMini key={book.isbn} book={book}/>)
                    )
                    :
                    <p>Vous n'avez encore aucun livre dans votre bibliothèque. <Link to={"/library"} className='text_link'>Rechercher un livre à ajouter</Link></p>
                    }
                </div>
            </div>
        </>
    )
}