import BookMini from '../BookMini/BookMini';
import api from '../../api/api.js';
import { useState, useEffect, useCallback } from 'react';
import './Carousel.scss';
import {shuffle} from './scriptCarousel';

export default function Carousel() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [books, setBooks] = useState("");
    const [error, setError] = useState("");

    // Début du bloc de lecture de la taille de l'écran 
    const [windowSize, setWindowSize] = useState(window.innerWidth); // Variable stockant la valeur de la taille de l'écran

    // Fonction qui inscrit la taille de l'écran quand on l'appelle
    const handleWindowResize = useCallback(event => {
        setWindowSize(window.innerWidth);
    }, []);
    
    // Effet qui permet d'écouter le changement de taille de l'écran
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);
    // Fin du bloc d'écoute de la taille de l'écran

    // Fonction appellant la liste des livres de l'API, puis les retrie aléatoirement
    useEffect(() => {
        async function startFetchingBooks() {
            setError("")
            try {
                setBooks(null);
                const response = await api.get('/books');
                const randomizedBooks = shuffle(response.data.books) // La fonction shuffle, qui mélange le tableau de résultat, est définie dans un script js
                setBooks(randomizedBooks);
            }
            catch (error) {
                setError(error?.response?.data?.message)
            }
        }
        if(!books) {
            startFetchingBooks();
        }
    }, [])

    // Fonction passant à la slide précédente
    function previousSlide() {
        if(currentSlide >0) {
            setCurrentSlide(currentSlide-1)
        } else {
            setCurrentSlide(2)
        }
    }
    
    // Fonction passant à la slide suivante
    function nextSlide() {
        if(currentSlide <2) {
            setCurrentSlide(currentSlide+1)
        } else {
            setCurrentSlide(0)
        }
    }

    // Le return est contenu dans un if pour ne s'afficher qu'à partir du moment où il a reçu les infos de l'API
    if (books) {
        return(
            <section className='carousel'>
                {/* Affichage conditionnel du carousel suivant la taille de l'écran */}
                {windowSize<992 ? 
                    (<>
                        <BookMini key={books[currentSlide].isbn} book={books[currentSlide]}/>
                        <div className='carousel__controller'>
                            <button onClick={previousSlide} className='button button_small  button_scroll'>Précédent</button>
                            <button onClick={nextSlide} className='button button_small button_scroll'>Suivant</button>
                        </div>
                    </>)
                : 
                    // Le slice permet de ne garder que les trois premiers résultats
                    (books.map((book, index) => <BookMini key={book.isbn} book={book}/>).slice(0, 3))
                }
            </section>
        )
    }
}