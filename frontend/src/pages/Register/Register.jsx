import { Link } from "react-router-dom";
import "./Register.scss";
import { Helmet } from 'react-helmet';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

export default function Register() {

  // Hooks d'état pr gérer les états de navigtion
  const [pseudonyme, setPseudonyme] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (motDePasse !== confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await api.post('/auth/register', {
        pseudonyme,
        email,
        password: motDePasse,
      });

      navigate('/login'); // Redirection après succès
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  // Affichage JSX
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
            placeholder="Minimum : 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
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

        {error && <p className="error-message">{error}</p>}

        <button className="button button_big" type="submit">S'inscrire</button>

        <Link className="text_link" to="/login">
          Déjà un compte ?
        </Link>
      </form>
    </>
  );
}
