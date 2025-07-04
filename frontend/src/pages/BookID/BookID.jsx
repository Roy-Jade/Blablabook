import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import './BookID.scss';
import { Helmet } from 'react-helmet';
// Import du carrousel 
import Carousel from '../../components/Carousel/Carousel';
import api from '../../../api';

export default function BookID() {


    let params = useParams();
    useEffect(() => {
        function changeParams() {
            params = useParams();
        }
        changeParams()
        console.log(params)
    }, [params])

    const [bookInfos, setBookInfos] = useState("");
    const [bookCommentaries, setBookCommentaries] = useState("");

    useEffect(() => {
        async function startFetchingBookInfos() {
            setBookInfos(null);
            setBookCommentaries(null);
            const response = await api.get(`/book/${params.bookID}`);
            setBookInfos(response.data.bookInfos);
            console.log(bookInfos)
            setBookCommentaries(response.data.bookCommentaries)
            console.log(bookCommentaries)
        }
        if(!bookInfos) {
            startFetchingBookInfos();
        }
    }, [])

    return (
        <>
          <Helmet>
                <title>BookID - BlablaBook</title>
                <meta name='description' content='Le détail de votre livre'></meta>
            </Helmet>
            <h1>Détail du livre</h1>

            <section>
                {/* Connexion à l'api cover de open library afin de récupérer la couverture du livre*/}

                {/* <img className='bookID__img' src={"https://covers.openlibrary.org/b/isbn/"+bookInfos.isbn+"-M.jpg"} alt={"Book's cover : "+bookInfos.titre} />
                <p>{bookInfos.ISBN}</p>
                <p>{bookInfos.titre}</p>
                <p>{bookInfos.auteur}</p>
                <p>{bookInfos.date_publication}</p>
                <p>{bookInfos.nombre_page}</p>
                <p>{bookInfos.summary}</p> */}



            </section>
            <section>
                <h2>Notre suggestion de livres</h2>

                <Carousel />

            </section>

            <section>
                {/* notes correspondant à 4.5/5 dont une étoile diamant pleine gauche (a faire en SCSS)*/}
                <p>Moyenne des notes <span className='bookID__note'>&#9733; &#9733; &#9733; &#9733; &#9734;</span></p>

                <button className='button button_small'><Link to="/personnalLibrary">Ajouter à mes livres</Link></button>
            </section>

            <article>
                <h2>Commentaires</h2>

                {/* {bookCommentaries.map((bookCommentary, index) => (
                    <div key={index}>
                        <div className='bookID__commentaires' >
                            <p>{bookCommentary.pseudonyme}</p>
                            <p>{bookCommentary.date}</p>
                            <p>{bookCommentary.note}</p>
                            <p>{bookCommentary.commentaire}</p>
                        </div>
                    </div>
                ))
                } */}
            </article>
        </>
    );
}

