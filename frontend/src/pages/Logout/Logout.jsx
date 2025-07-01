import { Link } from "react-router";
import { useContext } from "react";
import { CurrentUserContext } from "../../Contexts";

export default function Logout(){

  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  // setCurrentUser('')

  const logout = async () => {
    setCurrentUser('')
  }

  return(
    <>
      <h1>Déconnexion</h1>
      {currentUser && <button className="button button_big" onClick={logout}>Se déconnecter</button>}
      {!currentUser && <>
      <p>Vous avez été déconnecté avec succès</p>
      <Link className="text_link" to="/login" >Se reconnecter</Link>
      </>}
      
    </>
  );

};