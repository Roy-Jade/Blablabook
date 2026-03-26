import './BookMini.scss';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import Rating from '../Rating/Rating';
import BookOwnership from '../BookOwnership/BookOwnership';

// Composant contenant une miniature de livre, avec sa cover, son titre, son auteur et sa note. Des boutons y sont joints.
export default function BookMini({ book, removeBook=()=>{} }) {

  const [isBookOwned, setIsBookOwned] = useState(false); // note si le livre est possédé, commun avec BookID
  
  return(
    <article className={`bookmini`}>
      <img className='bookmini__img' 
        src={"https://covers.openlibrary.org/b/isbn/"+book.isbn+"-M.jpg"} 
        alt={`Couverture du livre ${book.title}`}
        onError={(e) => e.target.src = '/img/logo_blablabook_clair.png'}/>
      <div>
        <div className='bookmini__infos'>
          <cite className='bookmini__title'>{book.title}</cite>
          <address className='bookmini__author'>{book.author}</address>
        </div>
        <Rating rate={book.avg_rate} />
        <Link to={`/book/${book.id_book}`} book={book} className='button button_small'>Voir le détail</Link>
        <BookOwnership isbn={book.isbn} removeBook={removeBook} isBookOwned={isBookOwned} setIsBookOwned={setIsBookOwned} />
      </div>
    </article>
  )
}