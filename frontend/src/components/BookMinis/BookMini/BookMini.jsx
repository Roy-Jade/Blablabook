// On importe notre [Composant].scss
import './BookMini.scss';
import { useState } from 'react';
import { Link } from 'react-router';

// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function BookMini({ book }) {
const [isReaded, setIsReaded] = useState(false);
  const [isShared, setIsShared] = useState(false);

const ReadShare = async () => {
    try {
      const response = await api.patch('ReadShare', { isReaded, isShared});
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error("Erreur de login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    login()
  }

  }
  return (
    <article className={`bookmini`}>
      <img className='bookmini__img' src={"https://covers.openlibrary.org/b/isbn/" + book.isbn + "-M.jpg"} alt="Couverture" />
      <div>
        <div className='bookmini__infos'>
          <cite className='bookmini__title'>{book.titre}</cite>
          <address className='bookmini__author'>{book.auteur}</address>
        </div>
        <div className='bookmini__note'>&#9733; &#9733; &#9733; &#9733; &#9734;</div>
        <Link to={`/library/${book.isbn}`} book={book} className='button button_small'>Voir le détail</Link>
        <div className='bookmini__booleans connected owned'>
          <div>
            <input
              type="checkbox"
              id='isRead'
              name='isRead'
              checked={isReaded}
              onChange={(e) => setIsReaded(e.target.checked)}/>
            <label htmlFor="isRead">Lu</label>
          </div>
          <div>
            <input
              type="checkbox"
              id='isShared'
              name='isShared'
              checked={isShared}
              onChange={(e) => setIsShared(e.target.checked)}/>
            <label htmlFor="isShared">Partagé</label>
          </div>
        </div>
        <button className='button button_small connected not_owned'>Ajouter</button>
      </div>
    </article>
  )
}