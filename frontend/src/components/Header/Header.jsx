import {Link} from 'react-router';
import './Header.scss';

export default function Header() {
    return(
        <>
            <Link to="/"><img src="/img/logo_blablabook_clair.png" alt="logo Blablabook - retour à l'accueil"/>BlaBlaBook</Link>
                <nav>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/about">A propos</Link></li>
                        <li><Link to="/questions">Foire aux questions</Link></li>
                        <li><Link to="/library">Rechercher un livre</Link></li>
                        <li><Link to="/personnalLibrary">Ma bibliothèque</Link></li>
                        <li><Link to="/login">Connexion</Link></li>
                        <li><Link to="/dashboard">Mon compte</Link></li>
                        <li><Link to="/logout">Déconnexion</Link></li>
                    </ul>
                </nav>
        </>
    )
}