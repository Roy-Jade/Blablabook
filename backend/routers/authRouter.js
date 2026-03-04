import express from 'express';
import checkJWT from '../middleware/checkJWT.js';
import { getUser, register, login, logout, editUser, deleteUser } from '../controllers/auth.js';

const router = express.Router()

// vérification de l'existence d'une session
router.get('/user', checkJWT, getUser);
// inscription
router.post('/register', register); 
// connexion
router.post('/login', login); 
// déconnexion
router.post('/logout', checkJWT, logout) ;
// Modification des informations du compte
router.patch('/edit/user', checkJWT, editUser);
// Suppression du compte
router.delete('/delete', checkJWT, deleteUser); 



export default router;
