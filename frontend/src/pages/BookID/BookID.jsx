import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import './BookID.scss';
import { Helmet } from 'react-helmet';
// Import du carrousel 
import Carousel from '../../components/Carousel/Carousel';
import Rating from '../../components/Rating/Rating';
import api from '../../api/api.js';

export default function BookID() {

	const [bookInfos, setBookInfos] = useState(""); // Contient les infos du livre
	const [bookCommentaries, setBookCommentaries] = useState(""); // contient les commentaires du livre
	const [error, setError] = useState("");  // contient l'éventuel message d'erreur envoyé du back

	let params = useParams(); // récupère la partie paramétrable (/:bookId) de l'URL

	useEffect(() => {
		// On définit la fonction pour aller chercher les livres
		async function startFetchingBookInfos() {
			// Les variables sont remises à zéro
			setError(null)
			setBookInfos(null);
			setBookCommentaries(null);
			try {
				// On envoie une requête pour récupérer les infos du livre
				const response = await api.get(`/book/${params.bookID}`);
				// On enregistre les infos dans nos variables
				setBookInfos(response.data.bookInfos);
				setBookCommentaries(response.data.bookCommentaries);
			} catch (error) {
				// En cas d'erreur, on enregistre le message d'erreur
				setError(error?.response?.data?.message)
			}
		}

		// Si on a aucune information de livre d'enregistré ou que le livre enregistré a un ISBN différent de celui affiché en paramètre d'URL, on lance la fonction de récupération des infos
		if(!bookInfos || bookInfos?.isbn != params.bookID) {
			startFetchingBookInfos();
		}
	}, [params, error]) // on indique au UseEffect qu'il dépend de params et du message d'erreur

	return (
		<>
			<Helmet>
				<title>BookID - BlablaBook</title>
				<meta name='description' content='Le détail de votre livre'></meta>
			</Helmet>
			<h1>Détail du livre</h1>

			<div className='bookInfo'>

				{/* S'il y a un message d'erreur, on l'affiche ; sinon, on affiche les infos du livre */}
				{error ? <p className='text_error'>{error}</p> :
					<><section className='bookInfo__data_primary'>

					{bookInfos && <>

						{/* Récupération de la couverture sur l'API cover */}
						<img className='bookInfo__data_primary__img' src={"https://covers.openlibrary.org/b/isbn/"+bookInfos.isbn+"-M.jpg"} alt={"Book's cover : "+bookInfos.title} />

						<dl className='bookInfo__data_primary__desc'>
							<div>
								<dt className='bookInfo__data_primary__nameplate'>ISBN</dt>
								<dd>{bookInfos.isbn}</dd>
							</div>
							<div>
								<dt className='text_semi-bold bookInfo__data_primary__nameplate'>Titre</dt>
								<dd>{bookInfos.title}</dd>
							</div>
							<div>
								<dt className='text_semi-bold bookInfo__data_primary__nameplate'>Auteur</dt>
								<dd>{bookInfos.author}</dd>
							</div>
							<div>
								<dt className='bookInfo__data_primary__nameplate'>Publication</dt>
								<dd>{bookInfos.publish_date}</dd>
							</div>
							<div>
								<dt className='bookInfo__data_primary__nameplate'>Nombre de pages</dt>
								<dd>{bookInfos.page_number} pages</dd>
							</div>
			
						</dl>
						<div className='bookInfo__data_primary__summary'>
							<dt className='text_semi-bold'>Résumé</dt>
							<dd>{bookInfos.summary}</dd>
						</div>
					</>}
				</section>

				<section className='bookInfo__data_secondary'>
					<p>Moyenne des notes&ensp;
							{bookInfos && <Rating rate={bookInfos.avg_rate}/>}
					</p>
					<button className='button button_small'>Ajouter à mes livres</button>
				</section>

				<article className='bookInfo__commentaries'>
					<h2>Commentaires</h2>
					{bookCommentaries && bookCommentaries.map((bookCommentary, index) => (
						<div key={index} className='bookID__commentaires' >
							<p className='text_semi-bold'>{bookCommentary.pseudonyme}</p>
							<p className='text_semi-bold'>{bookCommentary.commentary_creation_date.slice(0, 10)}</p>
							<p>
								<Rating rate={bookCommentary.rate}/>
							</p>
							<p>{bookCommentary.commentary}</p>
						</div>
					))}
				</article></>}
				
				<section className='bookInfo__carousel'>
					<h2>Notre suggestion de livres</h2>
					<Carousel />
				</section>
			</div>
		</>
	);
}

