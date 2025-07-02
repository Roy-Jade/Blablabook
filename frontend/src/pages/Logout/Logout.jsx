import { Link } from "react-router";
import { Helmet } from 'react-helmet';

export default function Logout(){
    return(
        <>
            <Helmet>
                <title>Déconnexion - BlablaBook</title>
                <meta name='description' content="Vous avez été déconnecté de votre compte BlablaBook. Reconnectez-vous à tout moment pour accéder à votre tableau de bord et vos livres."></meta>
            </Helmet>
            <p>Vous avez été déconnecté avec succès</p>
            <div>
            <Link to="/login" >
              Se reconnecter
            </Link> 
        
            </div>
        </>
    );

};