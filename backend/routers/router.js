import express from 'express';
import authController from '../controllers/auth.js';
import bddController from '../controllers/bdd.js';
import checkJWT from '../middelware/checkJWT.js';


const router = express.Router()

router.get('/books', bddController.fetchBooks); // Récupérer la liste des livres
router.get('/book/:bookID', bddController.fetchBookID); // Récupérer les infos d'un seul livre

// auth est une convention d'URL 
router.post('/auth/register', authController.register); // inscription

router.post('/login', authController.login); // connexion

router.delete('/delete-account', checkJWT, authController.deleteUser); // Suppression du compte

router.get('/personalLibrary', checkJWT, bddController.fetchPersonalLibrary); // Récupérer la bibliothèque d'un utilisateur

router.post('/personalLibrary', checkJWT, bddController.addBookToPersonalLibrary); // Ajoute un livre à la bibliothèque de l'utilisateur connecté

router.delete('/personalLibrary/:id_livre', checkJWT, bddController.removeBookFromPersonalLibrary)
export default router;
