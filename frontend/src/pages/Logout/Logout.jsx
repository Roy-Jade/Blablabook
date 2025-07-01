import { Link } from "react-router";
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