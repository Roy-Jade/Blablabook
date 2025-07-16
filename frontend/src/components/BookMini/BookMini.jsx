import './BookMini.scss';
import { Link } from 'react-router';
import Rating from '../Rating/Rating';
import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../Contexts';
import api from "../../../api.js";

// Composant contenant une miniature de livre, avec sa cover, son titre, son auteur et sa note. Des boutons y sont joints.
export default function BookMini({ book }) {

  const currentUser = useContext(CurrentUserContext).currentUser;
  // La constante added prend une valeur différente si l'utilisateur connecté a le livre ou non ; s'il n'y a pas d'utilisateur, elle vaut "false"
  const [added, setAdded] = useState(() =>
    (currentUser && currentUser[1].find(element => element.id_livre === book.id_livre)) ? true : false
  );
  const [isReaded, setIsReaded] = useState(false);
  const [isShared, setIsShared] = useState(false);

  // Fonction d'ajout d'un livre à la bibliothèque personnelle d'un utilisateur
  const handleAddBook = async () => {

    try {
      const response = await api.post('/personalLibrary', { id_livre: book.id_livre });
      alert("Livre ajouté à votre bibliothèque !");
      setAdded(true)
      // TO DO : ajouter le livre à la constante currentUser (envoi des données du livre en back, et push dans la variable en front)
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  // useEffect(() => {
  //   fetch('http://localhost:3000//personalLibrary/readShare')
  //     .then(res => res.json())
  //     .then(data => setIsReaded(data.isReaded))
  //     .then(data => setIsShared(data.isShared));
  // }, []);

  const sendNewStatus = async () => {
    try {
      await api.patch('/personalLibrary', { id_livre : book.id_livre, isReaded, isShared });
      // setIsReaded(response.data.est_lu);
      // setIsShared(response.data.est_partagé);
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  const handleChange = (e) => {
    console.log("Modification")
    const checked = e.target.checked;

    const checkedValue = e.target.value;

    const checkedName = e.target.name;

    if(checked) {
      checkedName === 'isReaded' ? setIsReaded(true) : setIsShared(true)
    } else {
      checkedName === 'isReaded' ? setIsReaded(false) : setIsShared(false)
    }

    sendNewStatus()
  }

  // const changeReadStatus = () => {
  //   console.log(`Changement du statut de lecture en ${!isReaded}`)
  //   if (isReaded === false) {
  //     setIsReaded(true)
  //   } else {
  //     setIsReaded(false)
  //   }
  //   sendNewStatus()
  // }

  // const changeSharedStatus = () => {
  //   console.log(`Changement du statut de partage en ${!isShared}`)
  //   if (isShared === false) {
  //     setIsShared(true)
  //   } else {
  //     setIsShared(false)
  //   }
  //   sendNewStatus()
  // }


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
        <Link to={`/book/${book.isbn}`} book={book} className='button button_small'>Voir le détail</Link>
        {(currentUser && added === true) &&
          <div className='bookmini__booleans'>
            <div>
              <input
                type="checkbox"
                value='isReaded'
                name='isReaded'
                // checked={isReaded}
                onChange={(e) => this.handleChange(e)}
              />
              <label htmlFor="isRead">Lu</label>
            </div>
            <div>
              <input
                type="checkbox"
                value='isShared'
                name='isShared'
                // checked={isShared}
                onChange={(e) => this.handleChange(e)}
              />
              <label htmlFor="isShared">Partagé</label>
            </div>
          </div>}
        {currentUser && (
          added == false ?
            <button className='button button_small' onClick={handleAddBook}>Ajouter</button> :
            <button className='button button_small'>Supprimer</button>
        )}
      </div>
    </article>
  )
}
