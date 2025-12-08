import express from 'express';
import checkJWT from '../middelware/checkJWT.js';
import { register, login, deleteUser, tokenJWTCreation } from '../controllers/auth.js';
import { fetchBooks, fetchBookID } from '../controllers/library.js';
import { fetchPersonalLibrary, fetchBookOwnership, fetchBookUserData } from '../controllers/personalLibrary.js';
import { addBookToPersonalLibrary, removeBookFromPersonalLibrary } from '../controllers/bookMovements.js';
import { loginMiddleware, registerMiddleware } from '../middelware/authMiddleware.js';

const router = express.Router()

// Récupérer la liste des livres
router.get('/books', fetchBooks); 
// Récupérer les infos d'un seul livre
router.get('/book/:bookID', fetchBookID); 


// inscription
router.post('/auth/register', registerMiddleware, tokenJWTCreation); 
// connexion
router.post('/auth/login', loginMiddleware, tokenJWTCreation); 
// Suppression du compte
router.delete('/auth/delete', checkJWT, deleteUser); 

// Récupérer la bibliothèque d'un utilisateur
router.get('/personalLibrary', checkJWT, fetchPersonalLibrary); 
// Récupérer la possession d'un livre d'un utilisateur
router.get('/personalLibrary/:id_book/ownership', checkJWT, fetchBookOwnership); 
// Récupérer les paramètres d'un livre possédé d'un utilisateur
router.get('/personalLibrary/:id_book/data', checkJWT, fetchBookUserData); 

// Ajoute un livre à la bibliothèque de l'utilisateur connecté
router.post('/personalLibrary/:id_book', checkJWT, addBookToPersonalLibrary); 
// Supprimer le livre de la bibliothèque de l'utilisateur connecté
router.delete('/personalLibrary/:id_book', checkJWT, removeBookFromPersonalLibrary); 

export default router;
