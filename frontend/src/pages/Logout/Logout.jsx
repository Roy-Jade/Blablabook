import { Link } from "react-router";
import { Helmet } from 'react-helmet';
import { useContext } from "react";
import { CurrentUserContext } from "../../Contexts";

export default function Logout(){

  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);

  const logout = async () => {
    setCurrentUser('')
    localStorage.clear()
  }

  return(
    <>
      <Helmet>
        <title>Déconnexion - BlablaBook</title>
        <meta name='description' content="Vous avez été déconnecté de votre compte BlablaBook. Reconnectez-vous à tout moment pour accéder à votre tableau de bord et vos livres."></meta>
      </Helmet>
      <h1>Déconnexion</h1>
      {currentUser && <button className="button button_big" onClick={logout}>Se déconnecter</button>}
      {!currentUser && <>
      <p>Vous avez été déconnecté avec succès</p>
      <Link className="text_link" to="/login" >Se reconnecter</Link>
      </>}
      
    </>
  );

};