import BookMini from '../../components/BookMinis/BookMini/BookMini';
import Sort from '../../components/Sort/Sort';
import './Library.scss';
import api from "../../../api.js";
import { Helmet } from 'react-helmet';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../Contexts.js';
import { Link } from 'react-router';


export default function Library() {

    const user = useContext(CurrentUserContext);
    const [books, setBooks] = useState("");

    useEffect(() => {
        async function startFetchingPersonalLibrary() {
            setBooks(null);
            const response = await api.get('/personalLibrary');
            setBooks(response.data.userBooks);
        }
        if(!books) {
            startFetchingPersonalLibrary();
        }
    }, [])

    return(
        <>  
            <Helmet>
                <title>Bibliothèque - BlablaBook</title>
                <meta name='description' content='Découvrez tous les livres disponibles sur BlablaBook.'></meta>
            </Helmet>
            {user ? <h1>Bibliothèque de {user.currentUser.pseudonyme}</h1> : <h1>Rechercher un livre</h1>}
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