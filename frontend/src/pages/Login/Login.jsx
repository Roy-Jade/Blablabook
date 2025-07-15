import { useContext, useState } from "react";
import api from "../../../api";
import "./Login.scss";
import { Link } from "react-router";
import { Helmet } from 'react-helmet';
import { CurrentUserContext } from "../../Contexts";

export default function Login() {

  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    
  // Fonction gérant l'appel au back pour le login, et qui enregistre en cas de succès les infos de connexion
  const login = async () => {
    setError("")
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
    } catch (error) {
      setError(error.response.data.message)
    }
  };

  // Fonction s'activant lors de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    login()
  }

  return (
    <>
      <Helmet>
        <title>Connexion - BlablaBook</title>
        <meta name="description" content="Connectez-vous à votre compte BlablaBook pour accéder à vos livres, vos préférences de lecture et votre tableau de bord personnalisé."/>
      </Helmet>
      <h1>Connexion</h1>

      {currentUser && (<>
      <p>Vous êtes connecté en tant que {currentUser[0]}.</p>
      <Link className="text_link" to="/logout">Se déconnecter</Link>
      </>)}

      {error && <p className="text_error">{error}</p>}

      {!currentUser && (<>

        <form className="login__form" method="post" onSubmit={(e) => handleSubmit(e)}>

        <fieldset>
          <label className='text_bold' htmlFor="email">Adresse e-mail</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemple: Marizia99@gmail.com" required/>
        </fieldset>

        <fieldset>
          <label className='text_bold' htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="nouha@2021" required/>
        </fieldset>

        <fieldset>
          <a className="text_link"
          href="#"
          onClick={(e) =>{
              e.preventDefault();
              window.alert("Lien de réinitialisation du mot de passe envoyé à votre adresse e-mail.");
          }}
          >
          Mot de passe oublié ?
          </a>
        </fieldset>

        <fieldset>
          <label htmlFor="terms">
            <input type="checkbox" id="terms" name="terms" />
            Se souvenir de moi
          </label>
        </fieldset>

        <button className="button button_big" type="submit">Se connecter</button>

      </form>
      <Link className="text_link" to="/register">Pas encore inscrit ?</Link>
      </>)}
    </>
  );
}
