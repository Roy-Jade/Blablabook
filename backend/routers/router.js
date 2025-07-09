import express from 'express';
import authController from '../controllers/auth.js';
import bddController from '../controllers/bdd.js';
import checkJWT from '../middelware/checkJWT.js';


const router = express.Router()

router.get('/books', bddController.fetchBooks);

// auth est une convention d'URL 
router.post('/auth/register', authController.register);

router.post('/login', authController.login);

router.get('/personalLibrary', checkJWT, bddController.fetchPersonalLibrary);

export default router;
