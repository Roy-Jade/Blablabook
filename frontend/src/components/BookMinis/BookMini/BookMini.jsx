// On importe notre [Composant].scss
import './BookMini.scss';
import { Link } from 'react-router';
import { useState } from 'react';
import api from '../../../../api';
// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function BookMini({book}) {
  
  const [added, setAdded] = useState(false);
  const handleAddBook = async () => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      alert("Vous devez être connecté pour ajouter un livre.");
      return; // Stoppe la fonction ici si pas de token
    }
   
  
    try {
      //Ajouter le livre à la bibliothèque personnelle de l'utilisateur
      const response = await api.post('/personalLibrary', { id_livre: book.id_livre }); // renvoie l'object contient identifiant du livre que l'utilisateur veut ajouter
      //console.log(response);
      alert("Livre ajouté à votre bibliothèque !");
      setAdded(true);
    } catch (error) {
      console.error("Erreur:", error);
      //const message = error.response?.data?.message || "Erreur lors de l'ajout.";
      //alert(message);
    }
    
  
    //console.log(book);  

    
   
  };
  

  return(
    <article className={`bookmini`}>
      <img className='bookmini__img' src={"https://covers.openlibrary.org/b/isbn/"+book.isbn+"-M.jpg"} alt="Couverture" />
      <div>
        <div className='bookmini__infos'>
          <cite className='bookmini__title'>{book.titre}</cite>
          <address className='bookmini__author'>{book.auteur}</address>
        </div>
        <div className='bookmini__note'>&#9733; &#9733; &#9733; &#9733; &#9734;</div>
        <Link to={`/${book.isbn}`} book={book} className='button button_small'>Voir le détail</Link>
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
        <button className='button button_small connected not_owned' onClick={handleAddBook} disabled={added}>
        {added ? "Ajouté" : "Ajouter"}</button>
      </div>
    </article>
  )
}