import { Helmet } from 'react-helmet';
import { Link } from "react-router";
import "./NotFound.scss";

export default function NotFound(){
    return(
        <>
            <Helmet>
                <title>Page non trouvée - BlablaBook</title>
                <meta name="description" content="La page que vous recherchez est introuvable." />
            </Helmet>
            <div className="not-found">
                <h1> Erreur 404</h1>
                <p>Oups, cette page n'existe pas.</p>
                <Link to="/">Retour à l’accueil</Link>
            </div>
        </>
    );
}