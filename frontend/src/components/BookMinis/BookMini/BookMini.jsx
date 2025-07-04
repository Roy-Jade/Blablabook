// On importe notre [Composant].scss
import './BookMini.scss';
import { CurrentUserContext } from '../../../Contexts';
import { useContext } from 'react';

// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function BookMini({book, newClass}) {

  const currentUser = useContext(CurrentUserContext);

  return(
    <article className={`bookmini ${newClass}`}>
      <img className='bookmini__img' src={"https://covers.openlibrary.org/b/isbn/"+book.isbn+"-M.jpg"} alt="Couverture" />
      <div>
        <div className='bookmini__infos'>
          <cite className='bookmini__title'>{book.titre}</cite>
          <address className='bookmini__author'>{book.auteur}</address>
        </div>
        <div className='bookmini__note'>&#9733; &#9733; &#9733; &#9733; &#9734;</div>
        <button className='button button_small'>Voir le détail</button>
        
        {currentUser.currentUser && (<>
          <div className='bookmini__booleans connected owned'>
            <div>
              <input type="checkbox" id='isRead' name='isRead'/>
              <label htmlFor="isRead">Lu</label>
            </div>
            <div>
              <input type="checkbox" id='isShared' name='isShared'/>
              <label htmlFor="isShared">Partagé</label>
            </div>
          </div>
          <button className='button button_small connected not_owned'>Ajouter</button>
        </>)}
      </div>
    </article>
  )
}