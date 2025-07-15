// On importe notre [Composant].scss
import './BookMini.scss';
import { Link } from 'react-router';
import Rating from '../Rating/Rating';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../Contexts';
import api from "../../../api.js";

// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function BookMini({ book }) {

  const currentUser = useContext(CurrentUserContext);
  const [added, setAdded] = useState(false);
  const [isReaded, setIsReaded] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleAddBook = async () => {
    //console.log("Bouton Ajouter cliqué");
    try {
      const response = await api.post('/personalLibrary', { id_livre: book.id_livre });
      console.log(response);
      alert("Livre ajouté à votre bibliothèque !");
    } catch (error) {
      console.error("Erreur:", error);
    }
  }
  const ReadedShared = async () => {
    try {
      const response = await api.patch('ReadShare', {isReaded, isShared});
      setIsReaded(response.data.isReaded);
      setIsShared(response.data.isShared);
    } catch (error) {
      console.error("pas de réponse");
    }
  }
  const handlechange = (e) => {
    e.preventDefault()
    ReadedShared()
  }
  return (
    <article className={`bookmini`}>
      <img className='bookmini__img' src={"https://covers.openlibrary.org/b/isbn/" + book.isbn + "-M.jpg"} alt="Couverture" />
      <div>
        <div className='bookmini__infos'>
          <cite className='bookmini__title'>{book.titre}</cite>
          <address className='bookmini__author'>{book.auteur}</address>
        </div>
        <div className='bookmini__note'>
          <Rating rate={book.rate} />
        </div>
        <Link to={`/${book.isbn}`} book={book} className='button button_small'>Voir le détail</Link>
        {currentUser.currentUser &&
          <div className='bookmini__booleans connected owned'>
            <div>
              <input
                type="checkbox"
                id='isRead'
                name='isRead'
                checked={isReaded}
                onChange={(e) => setIsReaded(e.target.checked)} />
              <label htmlFor="isRead">Lu</label>
            </div>
            <div>
              <input
                type="checkbox"
                id='isShared'
                name='isShared'
                checked={isShared}
                onChange={(e) => setIsShared(e.target.checked)} />
              <label htmlFor="isShared">Partagé</label>
            </div>
          </div>}
        {currentUser.currentUser && <button className='button button_small connected not_owned' onClick={handleAddBook}>Ajouter</button>}
      </div>
    </article>
  )
}

