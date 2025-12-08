import './BookMini.scss';
import { Link } from 'react-router';
import Rating from '../Rating/Rating';
import BookOwnership from '../BookOwnership/BookOwnership';

// Composant contenant une miniature de livre, avec sa cover, son titre, son auteur et sa note. Des boutons y sont joints.
export default function BookMini({ book, onBookDeleted }) {
  
  return(
    <article className={`bookmini`}>
      <img className='bookmini__img' src={"https://covers.openlibrary.org/b/isbn/"+book.isbn+"-M.jpg"} alt="Couverture" />
      <div>
        <div className='bookmini__infos'>
          <cite className='bookmini__title'>{book.title}</cite>
          <address className='bookmini__author'>{book.author}</address>
        </div>
        <div className='bookmini__note'>
          <Rating rate={book.avg_rate} />
        </div>
        <Link to={`/book/${book.isbn}`} book={book} className='button button_small'>Voir le détail</Link>
        <BookOwnership bookID={book.id_book}/>
      </div>
    </article>
  )
}