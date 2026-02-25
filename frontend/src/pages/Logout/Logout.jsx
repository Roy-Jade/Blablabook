import { Link } from "react-router";
import { Helmet } from 'react-helmet';
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Logout(){

  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);

  // Fonction s'activant au clic sur le bouton de déconnexion
  const logout = async () => {
    setCurrentUser(null) 
    localStorage.clear() // Destruction des infos contenues dans le stockage locak (notamment le token)
  };

  return(
    <>
      <Helmet>
        <title>Déconnexion - BlablaBook</title>
        <meta name='description' content="Vous avez été déconnecté de votre compte BlablaBook. Reconnectez-vous à tout moment pour accéder à votre tableau de bord et vos livres."></meta>
      </Helmet>
      <h1>Déconnexion</h1>
      {currentUser && (
  <>
    <button className="button button_big" onClick={logout}>
      Se déconnecter
    </button>
  </>
)}

      {!currentUser && <>
      <p>Vous avez été déconnecté avec succès.</p>
      <Link className="text_link" to="/login" >Se reconnecter</Link>
      </>}

    </>
  )

};
