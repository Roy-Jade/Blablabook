import { Link, useParams, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import './BookID.scss';
import { Helmet } from 'react-helmet';
// Import du carrousel 
import Carousel from '../../components/Carousel/Carousel';
import api from '../../../api';

export default function BookID() {

    const [bookInfos, setBookInfos] = useState("");
    const [bookCommentaries, setBookCommentaries] = useState("");

    let params = useParams();

    useEffect(() => {
        async function startFetchingBookInfos() {
            setBookInfos(null);
            setBookCommentaries(null);
            const response = await api.get(`/book/${params.bookID}`);
            
            setBookInfos(response.data.bookInfos);
            setBookCommentaries(response.data.bookCommentaries);
        }
        if(!bookInfos || bookInfos != params.bookID) {
            startFetchingBookInfos();
        }
    }, [params])

    return (
        <>
            <Helmet>
                <title>BookID - BlablaBook</title>
                <meta name='description' content='Le détail de votre livre'></meta>
            </Helmet>
            <h1>Détail du livre</h1>

            <div className='bookInfo'>
                <section className='bookInfo__data_primary'>
                    {/* Connexion à l'api cover de open library afin de récupérer la couverture du livre*/}
                    {bookInfos && <>
                        <img className='bookInfo__data_primary__img' src={"https://covers.openlibrary.org/b/isbn/"+bookInfos.isbn+"-M.jpg"} alt={"Book's cover : "+bookInfos.titre} />
                        <dl className='bookInfo__data_primary__desc'>
                            <div>
                                <dt className='bookInfo__data_primary__nameplate'>ISBN</dt>
                                <dd>{bookInfos.isbn}</dd>
                            </div>
                            <div>
                                <dt className='text_semi-bold bookInfo__data_primary__nameplate'>Titre</dt>
                                <dd>{bookInfos.titre}</dd>
                            </div>
                            <div>
                                <dt className='text_semi-bold bookInfo__data_primary__nameplate'>Auteur</dt>
                                <dd>{bookInfos.auteur}</dd>
                            </div>
                            <div>
                                <dt className='bookInfo__data_primary__nameplate'>Publication</dt>
                                <dd>{bookInfos.date_publication}</dd>
                            </div>
                            <div>
                                <dt className='bookInfo__data_primary__nameplate'>Nombre de pages</dt>
                                <dd>{bookInfos.nombre_page} pages</dd>
                            </div>
                
                        </dl>
                        <div className='bookInfo__data_primary__summary'>
                            <dt className='text_semi-bold'>Résumé</dt>
                            <dd>{bookInfos.summary}</dd>
                        </div>
                    </>}
                </section>

                <section className='bookInfo__data_secondary'>
                    {/* notes correspondant à 4.5/5 dont une étoile diamant pleine gauche (a faire en SCSS)*/}
                    <p>Moyenne des notes <span className='bookID__note'>&#9733; &#9733; &#9733; &#9733; &#9734;</span></p>
                    <button className='button button_small'>Ajouter à mes livres</button>
                </section>

                <article className='bookInfo__commentaries'>
                    <h2>Commentaires</h2>
                    {bookCommentaries && bookCommentaries.map((bookCommentary, index) => (
                        <div key={index} className='bookID__commentaires' >
                            <p className='text_semi-bold'>{bookCommentary.pseudonyme}</p>
                            <p className='text_semi-bold'>{bookCommentary.date_creation_commentaire.slice(0, 10)}</p>
                            <p>{bookCommentary.note}</p>
                            <p>{bookCommentary.commentaire}</p>
                        </div>
                    ))
                    }
                </article>
                
                <section className='bookInfo__carousel'>
                    <h2>Notre suggestion de livres</h2>
                    <Carousel />
                </section>
            </div>
        </>
    );
}

