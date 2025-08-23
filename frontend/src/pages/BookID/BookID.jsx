import { Link, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import "./BookID.scss";
import { Helmet } from "react-helmet";
// Import du carrousel
import Carousel from "../../components/Carousel/Carousel";
import Rating from "../../components/Rating/Rating";
import api from "../../../api";
import { CurrentUserContext } from "../../Contexts";

export default function BookID() {
  const [bookInfos, setBookInfos] = useState(""); // Contient les infos du livre
  const [bookCommentaries, setBookCommentaries] = useState(""); // contient les commentaires du livre
  const [error, setError] = useState(""); // contient l'éventuel message d'erreur envoyé du back
  const { currentUser } = useContext(CurrentUserContext);
  const [editCommentary, setEditCommentary] = useState(false);
  const [stars, setStars] = useState();
  const [commentary, setCommentary] = useState("");

  let params = useParams(); // récupère la partie paramétrable (/:bookId) de l'URL

  // On définit la fonction pour aller chercher les livres
  async function fetchBookInfos() {
    try {
      // On envoie une requête pour récupérer les infos du livre
      const response = await api.get(`/book/${params.bookID}`);
      // On enregistre les infos dans nos variables
      setBookInfos(response.data.bookInfos);
      setBookCommentaries(response.data.bookCommentaries);

      const currentUserBookCommentary =
        response.data.bookCommentaries &&
        response.data.bookCommentaries.find(
          (bookCommentary) =>
            bookCommentary.pseudonyme === currentUser?.[0].pseudonyme
        );

      setCommentary(currentUserBookCommentary?.commentaire ?? "");
      setStars(currentUserBookCommentary?.note ?? 0);
    } catch (error) {
      // En cas d'erreur, on enregistre le message d'erreur
      setError(error.response.data.message);
    }
  }

  const saveCommentary = async () => {
    await api.put(`/book/${bookInfos.id_livre}/commentary`, {
      commentary,
      note: stars,
    });
    await fetchBookInfos();

    setEditCommentary(false);
  };

  const removeCurrentUserCommentary = async () => {
    await api.delete(`/book/${bookInfos.id_livre}/commentary`);

    await fetchBookInfos();
  };

  useEffect(() => {
    // le useEffect se lance dès l'affichage du composant
    // Si on a aucune information de livre d'enregistré ou que le livre enregistré a un ISBN différent de celui affiché en paramètre d'URL, on lance la fonction de récupération des infos
    if (!bookInfos || bookInfos?.isbn != params.bookID) {
      // Les variables sont remises à zéro
      setError(null);
      setBookInfos(null);
      setBookCommentaries(null);
      fetchBookInfos();
    }
  }, [params, error]); // on indique au UseEffect qu'il dépend de params et du message d'erreur

  const currentUserBookCommentary =
    bookCommentaries &&
    bookCommentaries.find(
      (bookCommentary) =>
        bookCommentary.pseudonyme === currentUser?.[0].pseudonyme
    );

  const currentUserHasCommentary =
    currentUserBookCommentary &&
    (currentUserBookCommentary.note || currentUserBookCommentary.commentaire);

  return (
    <>
      <Helmet>
        <title>BookID - BlablaBook</title>
        <meta name="description" content="Le détail de votre livre"></meta>
      </Helmet>
      <h1>Détail du livre</h1>

      <div className="bookInfo">
        {/* S'il y a un message d'erreur, on l'affiche ; sinon, on affiche les infos du livre */}
        {error ? (
          <p className="text_error">{error}</p>
        ) : (
          <>
            <section className="bookInfo__data_primary">
              {bookInfos && (
                <>
                  {/* Récupération de la couverture sur l'API cover */}
                  <img
                    className="bookInfo__data_primary__img"
                    src={
                      "https://covers.openlibrary.org/b/isbn/" +
                      bookInfos.isbn +
                      "-M.jpg"
                    }
                    alt={"Book's cover : " + bookInfos.titre}
                  />

                  <dl className="bookInfo__data_primary__desc">
                    <div>
                      <dt className="bookInfo__data_primary__nameplate">
                        ISBN
                      </dt>
                      <dd>{bookInfos.isbn}</dd>
                    </div>
                    <div>
                      <dt className="text_semi-bold bookInfo__data_primary__nameplate">
                        Titre
                      </dt>
                      <dd>{bookInfos.titre}</dd>
                    </div>
                    <div>
                      <dt className="text_semi-bold bookInfo__data_primary__nameplate">
                        Auteur
                      </dt>
                      <dd>{bookInfos.auteur}</dd>
                    </div>
                    <div>
                      <dt className="bookInfo__data_primary__nameplate">
                        Publication
                      </dt>
                      <dd>{bookInfos.date_publication}</dd>
                    </div>
                    <div>
                      <dt className="bookInfo__data_primary__nameplate">
                        Nombre de pages
                      </dt>
                      <dd>{bookInfos.nombre_page} pages</dd>
                    </div>
                  </dl>
                  <div className="bookInfo__data_primary__summary">
                    <dt className="text_semi-bold">Résumé</dt>
                    <dd>{bookInfos.summary}</dd>
                  </div>
                </>
              )}
            </section>

            <section className="bookInfo__data_secondary">
              <div>
                Moyenne des notes&ensp;
                {bookInfos && <Rating rate={bookInfos.rate} />}
              </div>
              <button className="button button_small">
                Ajouter à mes livres
              </button>
            </section>

            <article className="bookInfo__commentaries">
              <h2>Commentaires</h2>
              {bookCommentaries &&
                bookCommentaries
                  .filter(
                    (bookCommentary) =>
                      bookCommentary.pseudonyme !== currentUser?.[0].pseudonyme
                  )
                  .map((bookCommentary, index) => (
                    <div key={index} className="bookID__commentaires">
                      <p className="text_semi-bold">
                        {bookCommentary.pseudonyme}
                      </p>
                      <p className="text_semi-bold">
                        {bookCommentary.date_creation_commentaire.slice(0, 10)}
                      </p>
                      <Rating rate={bookCommentary.note} />
                      <p>{bookCommentary.commentaire}</p>
                    </div>
                  ))}
            </article>

            {currentUserBookCommentary && (
              <>
                <article className="bookInfo__commentaries">
                  <h2>Mon commentaire</h2>
                  {!currentUserHasCommentary && !editCommentary ? (
                    <div>Vous n'avez pas ajouté de commentaires</div>
                  ) : null}

                  {(currentUserHasCommentary || editCommentary) && (
                    <div className="bookID__commentaires">
                      <p className="text_semi-bold">
                        {currentUserBookCommentary.pseudonyme}
                      </p>
                      <p className="text_semi-bold">
                        {currentUserBookCommentary.date_creation_commentaire.slice(
                          0,
                          10
                        )}
                      </p>

                      <Rating
                        onClick={(value) => {
                          setStars(value);
                        }}
                        rate={stars}
                        editable={editCommentary}
                      />

                      {editCommentary ? (
                        <textarea
                          value={commentary}
                          onChange={(e) => {
                            setCommentary(e.target.value);
                          }}
                        />
                      ) : (
                        <p>{currentUserBookCommentary.commentaire}</p>
                      )}
                    </div>
                  )}
                </article>
                <div className="center">
                  {editCommentary && (
                    <>
                      <button
                        onClick={() => {
                          saveCommentary();
                        }}
                        className="button button_small"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => {
                          setEditCommentary(false);
                        }}
                        className="button button_small"
                      >
                        Annuler
                      </button>
                    </>
                  )}

                  {!editCommentary &&
                    (currentUserHasCommentary ? (
                      <>
                        <button
                          onClick={() => {
                            setEditCommentary(true);
                          }}
                          className="button button_small"
                        >
                          Modifier mon commentaire
                        </button>
                        <button
                          onClick={() => {
                            removeCurrentUserCommentary();
                          }}
                          className="button button_small"
                        >
                          Supprimer mon commentaire
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setEditCommentary(true);
                        }}
                        className="button button_small"
                      >
                        Ajouter un commentaire
                      </button>
                    ))}
                </div>
              </>
            )}
          </>
        )}

        <section className="bookInfo__carousel">
          <h2>Notre suggestion de livres</h2>
          <Carousel />
        </section>
      </div>
    </>
  );
}
