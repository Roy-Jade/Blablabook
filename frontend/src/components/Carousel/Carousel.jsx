import BookMini from '../BookMinis/BookMini/BookMini';
import api from '../../../api';
import { useState, useEffect, useCallback } from 'react';
import './Carousel.scss';
import {shuffle} from './scriptCarousel';

export default function Carousel() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [books, setBooks] = useState("");
    const [error, setError] = useState("");

    
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const handleWindowResize = useCallback(event => {
        setWindowSize(window.innerWidth);
    }, []);
    
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);

    useEffect(() => {
        async function startFetchingBooks() {
            setError("")
            try {
                setBooks(null);
                const response = await api.get('/books');
                const randomizedBooks = shuffle(response.data.books) 
                setBooks(randomizedBooks);
            }
            catch (error) {
                setError(error.response.data.message)
                console.log(error)
            }
        }
        if(!books) {
            startFetchingBooks();
        }
    }, [])

    function previousSlide() {
        if(currentSlide >0) {
            setCurrentSlide(currentSlide-1)
        } else {
            setCurrentSlide(2)
        }
    }
    
    function nextSlide() {
        if(currentSlide <2) {
            setCurrentSlide(currentSlide+1)
        } else {
            setCurrentSlide(0)
        }
    }
    
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);


    // useEffect(() => {
    //     async function startFetchingBooks() {
    //         setBooks(null);
    //         const response = await api.get('/books');
    //         const randomizedBooks = shuffle(response.data.books) 
    //         setBooks(randomizedBooks);
    //     }
    //     if(!books) {
    //         startFetchingBooks();
    //     }
    // }, [])

    if (books) {
        return(
            <section className='carousel'>
                {windowSize<992 ? 
                    (<>
                        <BookMini key={books[currentSlide].isbn} book={books[currentSlide]}/>
                        <div className='carousel__controller'>
                            <button onClick={previousSlide} className='button button_small  button_scroll'>Précédent</button>
                            <button onClick={nextSlide} className='button button_small button_scroll'>Suivant</button>
                        </div>
                    </>)
                : 
                    (books.map((book, index) => <BookMini key={book.isbn} book={book}/>).slice(0, 3))
                }
            </section>
        )
    }
}