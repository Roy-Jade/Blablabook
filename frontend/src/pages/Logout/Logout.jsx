import { Link } from "react-router";
import { Helmet } from 'react-helmet';
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import api from "../../api/api.js";
import { useNavigate } from "react-router";

export default function Logout(){

  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fonction s'activant au clic sur le bouton de déconnexion
  const logout = async () => {
    try {
      await api.post(('/auth/logout'))
      setCurrentUser(null)
      localStorage.removeItem("currentUser"); // Destruction des infos contenues dans le stockage locak (notamment le token)
      navigate('/');
    } catch(error) {
      setMessage(error?.response?.data?.message || "Une erreur est survenue")
    }
  };

  return(
    <>
      <Helmet>
        <title>Déconnexion - BlablaBook</title>
        <meta name='description' content="Vous avez été déconnecté de votre compte BlablaBook. Reconnectez-vous à tout moment pour accéder à votre tableau de bord et vos livres."></meta>
      </Helmet>
      <h1>Déconnexion</h1>

      {message && <p>message</p>}

      {currentUser && 
        <>
          <button className="button button_big" onClick={logout}>
            Se déconnecter
          </button>
        </>
      }

      {!currentUser && <>
        <p>Vous avez été déconnecté avec succès.</p>
        <Link className="text_link" to="/login" >Se reconnecter</Link>
      </>}

    </>
  )

};
