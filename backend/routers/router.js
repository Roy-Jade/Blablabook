import express from 'express';
import authController from '../controllers/auth.js';
import bddController from '../controllers/bdd.js';
import checkJWT from '../middelware/checkJWT.js';


const router = express.Router()

router.get('/books', bddController.fetchBooks);
router.get('/book/:bookID', bddController.fetchBookID);

// auth est une convention d'URL
router.post('/auth/register', authController.register);

router.post('/login', authController.login);

// Route protégée par le middleware JWT
router.post('/auth/logout', checkJWT, authController.logout);


router.get('/personalLibrary', checkJWT, bddController.fetchPersonalLibrary);

// Route est protégée par checkJWT, donc seul un utilisateur connecté peut supprimer son propre compte
router.delete('/delete-account', checkJWT, authController.deleteUser);

// route pour ajouter un livre a la bibliothèque personnelle
router.post('/personalLibrary', checkJWT, bddController.addBookToPersonalLibrary);

export default router;
