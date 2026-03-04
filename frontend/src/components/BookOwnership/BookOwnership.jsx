import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import api from '../../api/api.js';

export default function BookOwnership(bookID) {

  const id_book = bookID.bookID;
  
  const {currentUser} = useContext(CurrentUserContext);
  const [error, setError] = useState(""); // Message d'erreur
  const [isBookOwned, setIsBookOwned] = useState(false);
  const [bookData, setBookData] = useState({is_read : false, is_shared : false})

  const getBookOwnership = async () => {
    try{
      const response = await api.get(`/personal-library/${id_book}/ownership`)
      setIsBookOwned(response.data.ownership.exists)
    } catch(error) {
      setError(error?.response?.data?.message)
    }
  }

  const getBookData = async () => {
    try{
      const response = await api.get(`/personal-library/${id_book}/data`);
      setBookData(response.data.data);
    } catch(error) {
      setError(error?.response?.data?.message)
    }
  };

  useEffect(()=> {
      if (currentUser != null) {
        getBookOwnership()
        getBookData()
      }
  }, [id_book, currentUser]);

  const handleAddBook = async () => {
    try {
      const response = await api.post(`/personal-library/${id_book}`)
      setIsBookOwned(true)
    } catch(error) {
      setError(error?.response?.data?.message)
    }
  };

  const handleRemoveBook = async () => {
    try {
      const response = await api.delete(`/personal-library/${id_book}`)
      setIsBookOwned(false)
    } catch(error) {
      setError(error?.response?.data?.message)
    }
  };

  return (<>
    {(currentUser && isBookOwned === true) && 
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
      isBookOwned ?
      <button className='button button_small' 
        onClick={handleRemoveBook}
      >Supprimer</button> 
      :
      <button className='button button_small' 
      onClick={handleAddBook}
      >Ajouter</button>
    )}
  </>)

} 