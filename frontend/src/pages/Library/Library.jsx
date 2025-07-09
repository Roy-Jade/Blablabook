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
        async function startFetchingPersonalLibrary() {
            setBooks(null);
            setError(null);
            try {
                const response = await api.get(`/${target}`);
                setBooks(response.data.books);
            } catch (error) {
                setError(error.response.data.message)
                console.log(error)
            }
        }
        startFetchingPersonalLibrary();
    }, [target])

    return(
        <>  
            <Helmet>
                <title>Bibliothèque - BlablaBook</title>
                <meta name='description' content='Découvrez tous les livres disponibles sur BlablaBook.'></meta>
            </Helmet>
            {(userName && params !== undefined) ? <h1>Bibliothèque de {userName}</h1> : <h1>Rechercher un livre</h1>}
            <div className='library'>
                <Sort/>
                <div className='library__book-list'>
                    {books ? 
                    (books.map((book, index) => <BookMini key={book.isbn} book={book}/>))
                    :
                    <p>Vous n'avez encore aucun livre dans votre bibliothèque. <Link to={"/library"} className='text_link'>Rechercher un livre à ajouter</Link></p>
                    }
                </div>
            </div>
        </>
    )
}