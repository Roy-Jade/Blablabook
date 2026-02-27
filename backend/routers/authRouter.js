import express from 'express';
import checkJWT from '../middleware/checkJWT.js';
import { register, login, editUser, editPassword, deleteUser } from '../controllers/auth.js';

const router = express.Router()

// inscription
router.post('/register', register); 
// connexion
router.post('/login', login); 
// Modification des informations du compte
router.patch('/edit/user', checkJWT, editUser)
// Modification du mot de passe du compte
router.patch('/edit/password', checkJWT, editPassword)
// Suppression du compte
router.delete('/delete', checkJWT, deleteUser); 



export default router;
