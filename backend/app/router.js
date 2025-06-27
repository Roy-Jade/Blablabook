
// router.js (le routeur principal) qui regroupe plusieurs routes

// === IMPORTS ===
import express from 'express';
import authRouter from './router/authRouter.js'; // routes d'authentification

// === ROUTEUR PRINCIPAL ===
const router = express.Router();

// On branche d'abord les routes liées à l'authentification
router.use('/', authRouter);

// On déclare la route privée /profil (visible uniquement si connecté)
router.get('/profil', (req, res) => {
  console.log('contenu de la session:', req.session);
  
  // Vérifie si l'utilisateur est connecté (via la session)
  if (!req.session.isLogged) {
    return res.redirect('/login'); // Redirige vers la page de connexion si non connecté
  }

  // Si connecté, affiche la vue profil.ejs avec les données de session
  res.render('profil', {
    pseudonyme: req.session.pseudonyme,
    email: req.session.email
  });
});

// On exporte le routeur principal pour l'utiliser dans index.js
export default router;
