import './BookMini.scss';
import { Link } from 'react-router';
import Rating from '../Rating/Rating';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../Contexts';
import api from "../../../api.js";

// Composant contenant une miniature de livre, avec sa cover, son titre, son auteur et sa note. Des boutons y sont joints.
export default function BookMini({book}) {
  
  const currentUser = useContext(CurrentUserContext).currentUser;
  
  // La constante added prend une valeur différente si l'utilisateur connecté a le livre ou non ; s'il n'y a pas d'utilisateur, elle vaut "false"
  const [added, setAdded] = useState(() => 
      (currentUser && currentUser[1].find(element => element.id_livre === book.id_livre)) ? true : false
    );
  
  // Fonction d'ajout d'un livre à la bibliothèque personnelle d'un utilisateur
  const handleAddBook = async() => {
    
    try{
      const response = await api.post('/personalLibrary', { id_livre: book.id_livre });
      alert("Livre ajouté à votre bibliothèque !");
      setAdded(true)
      // TO DO : ajouter le livre à la constante currentUser (envoi des données du livre en back, et push dans la variable en front)
    } catch(error) {
        console.error("Erreur:", error);
    }
  }

  // Fonction pour supprimer le livre de la bibliothèque personnelle d'un utilisateur
  const  handleRemoveBook = async() => {
    try {
      await api.delete(`/personalLibrary/${book.id_livre}`);
      alert("Livre supprimé de votre bibliothèque !");
      setAdded(false);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };
  return(
    <article className={`bookmini`}>
      <img className='bookmini__img' src={"https://covers.openlibrary.org/b/isbn/"+book.isbn+"-M.jpg"} alt="Couverture" />
      <div>
        <div className='bookmini__infos'>
          <cite className='bookmini__title'>{book.titre}</cite>
          <address className='bookmini__author'>{book.auteur}</address>
        </div>
        <div className='bookmini__note'>
          <Rating rate={book.rate} />
        </div>
        <Link to={`/book/${book.isbn}`} book={book} className='button button_small'>Voir le détail</Link>
        {(currentUser && added === true) && 
        <div className='bookmini__booleans'>
          <div>
            <input type="checkbox" id='isRead' name='isRead'/>
            <label htmlFor="isRead">Lu</label>
          </div>
          <div>
            <input type="checkbox" id='isShared' name='isShared'/>
            <label htmlFor="isShared">Partagé</label>
          </div>
        </div>}
        {currentUser && (
          added == false ?
          <button className='button button_small' onClick={handleAddBook}>Ajouter</button> :
          <button className='button button_small' onClick={handleRemoveBook}>Supprimer</button>
          )}
      </div>
    </article>
  )
}