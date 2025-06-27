// J'ai pris comme réf. atelier de Marion S05E15 La Guilde

// J'importe le module de connexion à ma base de données PostgreSQL (via pg)
import db from "../../config/db.js";

// J'importe bcrypt pour pouvoir comparer un mot de passe saisi avec un mot de passe haché
import bcrypt from 'bcrypt';

// J'importe validator pour vérifier si une chaîne est un email valide
import validator from 'validator';

// Je déclare mon contrôleur d'authentification, qui regroupe toutes les méthodes liées à l'authentification (loginPage, login, logout)
const authController = {

  // Méthode GET pour afficher la page de connexion (utile si on utilise des vues serveur avec EJS)
  loginPage(req, res) {
    res.render('login'); // J'affiche la vue login.ejs
  },

  // Méthode POST pour traiter le formulaire de connexion
  async login(req, res) {

    // POUR DEBUGGER - affiche dans la console ce que l'utilisateur a saisi (email, mdp)
    console.log('Tentative de connexion reçue avec :', req.body);

    const { email, mot_de_passe } = req.body; // Récupère les données envoyées depuis le formulaire
    try {
      // Étape 1 : Vérification des champs requis
      if (!email || !mot_de_passe) {
        return res.render('login', { message: 'Tous les champs sont requis.' });
      }

      // Étape 2 : Vérification du format de l’email
      if (!validator.isEmail(email)) {
        return res.render('login', { message: 'Email invalide.' });
      }

      // Étape 3 : Récupération de l'utilisateur correspondant à cet email
      const result = await db.query(
        'SELECT * FROM utilisateur WHERE email = $1',
        [email]
      );

      const user = result.rows[0]; // Peut être undefined

      // Étape 4 : Vérification que l’utilisateur existe
      if (!user) {
        return res.render('login', { message: 'Email ou mot de passe incorrect.' });
      }

      // Étape 5 : Comparaison du mot de passe saisi avec le mot de passe haché en base
      const isValidPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

      if (!isValidPassword) {
        return res.render('login', { message: 'Email ou mot de passe incorrect.' });
      }

      // Étape 6 : Connexion réussie → on stocke les infos utiles en session
      req.session.isLogged = true;
      req.session.userId = user.id_utilisateur;
      req.session.email = user.email;
      req.session.pseudonyme = user.pseudonyme;

      // Étape 7 : Redirection vers une zone privée (ex: page de profil)
      res.redirect('/profil');

    } catch (err) {
      console.error('Erreur lors de la connexion :', err);
      res.status(500).render('login', { message: 'Erreur serveur. Veuillez réessayer.' });
    }
  },

  // Méthode GET /logout : utilisée pour se déconnecter proprement, je sup completement  la session de l'utilisateur, il es déco
  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }

};

// Export du contrôleur
export default authController;
