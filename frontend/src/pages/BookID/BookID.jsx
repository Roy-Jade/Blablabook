import { useParams } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import './BookID.scss';
import { Helmet } from 'react-helmet';
import Carousel from '../../components/Carousel/Carousel.jsx';
import Rating from '../../components/Rating/Rating.jsx';
import BookOwnership from '../../components/BookOwnership/BookOwnership.jsx';
import RatingInput from '../../components/RatingInput/RatingInput.jsx';
import Commentary from '../../components/Commentary/Commentary.jsx';
import api from '../../api/api.js';

export default function BookID() {

	const {currentUser} = useContext(CurrentUserContext)
	const [bookInfos, setBookInfos] = useState(""); // Contient les infos du livre
	const [bookCommentaries, setBookCommentaries] = useState([]); // contient les commentaires du livre
    const [userRate, setUserRate] = useState(null); // contient la note de l'utilisateur connecté
    const [userCommentary, setUserCommentary] = useState("") // contient le commentaire de l'utilisateur connecté
	const [isBookOwned, setIsBookOwned] = useState(false); // note si le livre est possédé, commun avec BookMini
	const [error, setError] = useState("");  // contient l'éventuel message d'erreur envoyé du back

	let params = useParams(); // récupère la partie paramétrable (/:bookId) de l'URL
	

	useEffect(() => {
		// On définit la fonction pour aller chercher les livres
		async function startFetchingBookInfos() {
			// Les variables sont remises à zéro
			setError(null)
			setBookInfos(null);
			setBookCommentaries([]);
			try {
				// On envoie une requête pour récupérer les infos du livre
				const response = await api.get(`/book/${params.bookID}`);
				// On enregistre les infos dans nos variables
				setBookInfos(response.data.bookInfos);
				setBookCommentaries(response.data.bookCommentaries);
				currentUser && setUserCommentary(response.data.bookCommentaries.find((bookCommentary) => bookCommentary.pseudonyme === currentUser.pseudonyme).commentary || "")
			} catch (error) {
				// En cas d'erreur, on enregistre le message d'erreur
				setError(error?.response?.data?.message)
			}
		}

		// Si on a aucune information de livre d'enregistré ou que le livre enregistré a un ISBN différent de celui affiché en paramètre d'URL, on lance la fonction de récupération des infos
		// if(!bookInfos || bookInfos?.isbn != params.bookID) {
			startFetchingBookInfos();
		// }
	}, [params.bookID, currentUser]) // on indique au UseEffect qu'il dépend de params et du message d'erreur

	const handleCommentarySubmission= (method) => {
		if (method === "create") {
			const newCommentary = {pseudonyme: currentUser.pseudonyme, commentary_creation_date: new Date().toISOString(), rate: userRate, commentary: userCommentary}
			setBookCommentaries([newCommentary, ...bookCommentaries.filter((bookCommentary) => bookCommentary.pseudonyme !== currentUser.pseudonyme)]);
			return
		}
		setBookCommentaries([...bookCommentaries.filter((bookCommentary) => bookCommentary.pseudonyme !== currentUser.pseudonyme)])
	}

	return (
		<>
			<Helmet>
				<title>BookID - BlablaBook</title>
				<meta name='description' content='Le détail de votre livre'></meta>
			</Helmet>
			<h1>Détail du livre</h1>

			{error && <p className='text_error'>{error}</p>}

			{bookInfos && <>
			<section className='bookInfo__data_primary'>

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

			</section>

			<section className='bookInfo__data_secondary'>
				<p>Moyenne des notes&ensp;</p>
				<Rating rate={bookInfos.avg_rate}/>
				<BookOwnership bookID={bookInfos.id_book} isBookOwned={isBookOwned} setIsBookOwned={setIsBookOwned} />
				{currentUser && isBookOwned && <RatingInput bookID={bookInfos.id_book} userRate={userRate} setUserRate={setUserRate} />}
				{userRate && <Commentary bookID={bookInfos.id_book} userCommentary={userCommentary} setUserCommentary={setUserCommentary} handleCommentarySubmission={handleCommentarySubmission} />}
			</section>

			<article className='bookInfo__commentaries'>
				<h2>Commentaires</h2>
				{bookCommentaries.map((bookCommentary, index) => (
					<div key={index} className='bookID__commentaires' >
						<p className='text_semi-bold'>{bookCommentary.pseudonyme}</p>
						<p className='text_semi-bold'>{bookCommentary.commentary_creation_date?.slice(0, 10)}</p>
						<Rating rate={bookCommentary.rate}/>
						<p>{bookCommentary.commentary}</p>
					</div>
				))}
			</article>
			</>}
			
			<section className='bookInfo__carousel'>
				<h2>Notre suggestion de livres</h2>
				<Carousel />
			</section>
		</>
	)
}

