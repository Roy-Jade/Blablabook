import { Link } from "react-router";
import "./Register.scss";
import { Helmet } from 'react-helmet';
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import api from "../../../api";
import { CurrentUserContext } from "../../Contexts";

export default function Register() {

  // Hooks d'état pour gérer les états de navigation
  const [pseudonyme, setPseudonyme] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState(null);
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const navigate = useNavigate();

  // Fonction s'activant à la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)

    if (motDePasse !== confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        pseudonyme,
        email,
        password: motDePasse,
      });

      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);

      console.log("✅ Utilisateur inscrit avec succès !");
      navigate('/login');

    } catch (error) {
    setError(error.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.");
  }
};

  return (
    <>
      <Helmet>
        <title>Inscription - BlablaBook</title>
        <meta
          name="description"
          content="Créez votre compte sur BlablaBook pour découvrir, partager et enregistrer vos livres préférés."
        />
      </Helmet>

      <h1>Créer un compte</h1>

      {error && <p className="text_error">{error}</p>}

      {currentUser && (<>
      <p>Vous êtes connecté en tant que {currentUser[0].pseudonyme}.</p>
      <Link className="text_link" to="/logout">Se déconnecter</Link>
      </>)}

      {!currentUser && 
      <form className="register__form" onSubmit={handleSubmit}>
        <fieldset>
          <label className='label_title' htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            placeholder="exemple: MariziaBook"
            required
            value={pseudonyme}
            onChange={(e) => setPseudonyme(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label className='label_title' htmlFor="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="exemple: marizia99@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label className='label_title' htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Minimum : 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
            required
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label className='label_title' htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="terms">
            <input type="checkbox" id="terms" name="terms" required />
            J'accepte les termes et les conditions
          </label>
        </fieldset>

        <button className="button button_big" type="submit">S'inscrire</button>

        <Link className="text_link" to="/login">
          Déjà un compte ?
        </Link>
      </form>}
    </>
  );
}
