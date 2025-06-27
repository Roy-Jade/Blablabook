
// Ce fichier sert à regrouper toutes les routes liées à la connexion / déconnexion.


import express from 'express'; //on importe Express, le framework qui permet de créer un serveur web avec Node.js.
import authController from '../controllers/authController.js'; //fichier qui contient les fonctions liées à la connexion, déco

const router = express.Router(); //

// Affiche le formulaire de connexion (loginPage)
router.get('/login', authController.loginPage);

// Traite la soumission du formulaire de connexion
router.post('/login', authController.login);

// Gère la déconnexion
router.get('/logout', authController.logout);

export default router;
