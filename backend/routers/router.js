import express from 'express';

import authController from '../controllers/auth.js';
import bddController from '../controllers/bdd.js';


const router = express.Router()

router.get('/books', bddController.fetchBooks);

// router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;