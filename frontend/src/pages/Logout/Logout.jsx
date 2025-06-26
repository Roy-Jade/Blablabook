import { Link } from "react-router";
// Import du [Composant].scss
import './Logout.scss';


export default function Logout(){
    return(
        <>
            <p>Vous avez été déconnecté avec succès</p>


            <div>
            <Link to="/login" >
              Se reconnecter
            </Link> 
        
            </div>
        </>
    );

};