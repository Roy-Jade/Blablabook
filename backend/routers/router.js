import express from 'express';
import checkJWT from '../middleware/checkJWT.js';
import { fetchBooks, fetchBookID } from '../controllers/library.js';
import { fetchPersonalLibrary, fetchBookOwnership, fetchBookUserData } from '../controllers/personalLibrary.js';
import { addBookToPersonalLibrary, removeBookFromPersonalLibrary } from '../controllers/bookMovements.js';

const router = express.Router()

// Récupérer la liste des livres
router.get('/books', fetchBooks); 
// Récupérer les infos d'un seul livre
router.get('/book/:bookID', fetchBookID); 

// Récupérer la bibliothèque d'un utilisateur
router.get('/personal-library', checkJWT, fetchPersonalLibrary); 
// Récupérer la possession d'un livre d'un utilisateur
router.get('/personal-library/:id_book/ownership', checkJWT, fetchBookOwnership); 
// Récupérer les paramètres d'un livre possédé d'un utilisateur
router.get('/personal-library/:id_book/data', checkJWT, fetchBookUserData); 

// Ajoute un livre à la bibliothèque de l'utilisateur connecté
router.post('/personal-library/:id_book', checkJWT, addBookToPersonalLibrary); 
// Supprimer le livre de la bibliothèque de l'utilisateur connecté
router.delete('/personal-library/:id_book', checkJWT, removeBookFromPersonalLibrary); 

export default router;
